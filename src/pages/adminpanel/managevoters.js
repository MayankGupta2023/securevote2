import React from 'react';
import Adminnavbar from '../../components/adminnavbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import firebase from 'firebase/app';
import 'firebase/auth';
import Global from '@/global'
import Accessdenied from '@/components/accessdenied'
import Router from 'next/router'


import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import app from '../../firebaseConfig';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    getDoc,
} from 'firebase/firestore';




const auth = getAuth(app);

const managevoters = () => {
    // State variables to store voter information
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [voterId, setVoterId] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [confirmationResult, setConfirmationResult] = useState(null);

    const [usedAdded, setUserAdded] = useState(false);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can add code to send the voter data to your backend server and update the database
        // For now, let's just log the voter information
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Mobile Number:', mobileNumber);
        console.log('Voter ID:', voterId);
        console.log('Current Address:', currentAddress);

        // Reset the form fields
        setFirstName('');
        setLastName('');
        setMobileNumber('');
        setVoterId('');
        setCurrentAddress('');
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {



            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
            console.log("jere");
            const totphoneNumber = countryCode + mobileNumber;
            console.log(totphoneNumber)
            const confirmation = await signInWithPhoneNumber(auth, totphoneNumber, recaptcha);
            console.log(confirmation)
            setConfirmationResult(confirmation);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            await confirmationResult.confirm(verificationCode);
            setVerificationCode('');

            // Check if the user exists in the database
            const db = getFirestore(app);
            const user = auth.currentUser;

            if (user) {
                // Get the entered phone number
                const enteredPhoneNumber = mobileNumber;

                // Check if a user document with the entered phone number exists
                const querySnapshot = await getDocs(
                    query(collection(db, 'voters'), where('MobileNumber', '==', enteredPhoneNumber))
                );

                if (querySnapshot.size > 0) {
                    // User exists in the database
                    console.log('User exists in the database.');
                    // Show error that voter already exists
                } else {
                    // User does not exist in the database, add the user
                    console.log('User does not exist in the database.');
                    // Add the user details to the database
                    const voterRef = doc(db, 'voters', user.uid);
                    await setDoc(voterRef, {
                        FirstName: firstName,
                        LastName: lastName,
                        MobileNumber: enteredPhoneNumber,
                        VoterID: voterId,
                        CurrentAddress: currentAddress,
                        voted: false,
                        status: false,
                        field: 'SNU'
                    });
                    console.log('User added to the database.');
                    setUserAdded(true);

                }
            } else {
                console.error('No user is currently signed in.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    if (usedAdded) {
        return (
            <div>
                <div className='h-20 bg-blue-50'>
                    <Adminnavbar />
                </div>
                <div className='flex justify-center h-screen bg-white'>
                    <div className="container mx-8 mr-12 mt-8 pb-12 w-2/3">

                        <h1 className="text-3xl font-bold">Voter Added Successfully!</h1>
                    </div>
                </div>
            </div>
        );
    }

    if (Global.electionstatus) {
        return (
            <div className='h-screen'>
                <div className='h-20 bg-blue-50'>
                    <Adminnavbar />
                </div>
                <Accessdenied />
            </div>
        )
    }


    return (
        <div>
            <div className='h-20 bg-blue-50'>
                <Adminnavbar />
            </div>

            <div className='flex justify-center'>
                <div className="container mx-8 mr-12 mt-8 pb-12 w-2/3">
                    <h1 className="text-3xl font-bold">Add Voter</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number:</label>
                            <input
                                type="text"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="voterId" className="block text-gray-700 text-sm font-bold mb-2">Field Center:</label>
                            <input
                                type="text"
                                id="voterId"
                                value={voterId}
                                onChange={(e) => setVoterId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="currentAddress" className="block text-gray-700 text-sm font-bold mb-2">Current Address:</label>
                            <input
                                type="text"
                                id="currentAddress"
                                value={currentAddress}
                                onChange={(e) => setCurrentAddress(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        {
                            (!otpSent ? <div id='recaptcha'>

                            </div> : null)
                        }
                        {/* Button to Get OTP or Verify OTP based on the OTP status */}
                        {otpSent ? <div className="mb-4">
                            <label htmlFor="verificationCode" className="block text-gray-700 text-sm font-bold mb-2">Verification Code</label>
                            <input
                                type="text"
                                id="verificationCode"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div> : null}
                        {otpSent ? <button type="submit" onClick={handleVerifyOtp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Verify OTP</button> : <button type="submit" onClick={handleSendOtp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send OTP</button>}
                        <button onClick={() => Router.push('/adminpanel/listofvoters')} className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">List Of Voters</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default managevoters;