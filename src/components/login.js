import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import firebase from 'firebase/app';
import 'firebase/auth';
import securevote from '../assets/securevote.jpeg'
import Router from 'next/router'


import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import app from '../firebaseConfig';
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


const AuthPage = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false); // New state to track OTP status

    const handleSendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
            console.log("jere");
            const totphoneNumber = countryCode + phoneNumber;
            console.log(totphoneNumber)
            const confirmation = await signInWithPhoneNumber(auth, totphoneNumber, recaptcha);
            console.log(confirmation)
            setConfirmationResult(confirmation);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };






    const handleVerifyOtp = async () => {
        try {
            await confirmationResult.confirm(verificationCode);
            //  setVerificationCode('');

            // Check if the user exists in the database
            const db = getFirestore(app);
            const user = auth.currentUser;

            if (user) {
                // Get the entered phone number
                const enteredPhoneNumber = phoneNumber;

                console.log("login kar sakte ho")
                // Check if a user document with the entered phone number exists
                const querySnapshot = await getDocs(
                    query(collection(db, 'voters'), where('MobileNumber', '==', enteredPhoneNumber))
                );
                // const userRef = doc(db, 'users', user.uid);
                //  await setDoc(userRef, { phoneNumber }, { merge: true });
                if (querySnapshot.size > 0) {
                    // localStorage.setItem('isLoggedIn', true);
                    // // User with the entered phone number exists in the database
                    router.push('/voters/voteCandidate');
                    console.log("ja bhai dal le vote")
                    Router.push('/voters/voteCandidate')
                } else {
                    // User with the entered phone number does not exist in the database

                    // router.push({
                    //     pathname: '/signup',
                    //     query: { phoneNumber: enteredPhoneNumber },
                    // });

                    console.log("na bhai tujhe allowd nahi hai vote dalna")
                }
            } else {
                console.error('No user is currently signed in.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };



    return (
        <div className="flex flex-col justify-center  bg-blue-50 h-screen">

            < div className='h-24 bg-blue-950 text-white  flex justify-center items-center text-4xl ' >

                Make a difference.Vote for the candidate who represents your values and beliefs.

            </ div >


            <div className=" mt-20 border-2 border-black  py-10 px-8 bg-white  rounded-md min-w-96 shadow-md shadow-black w-1/3 m-auto h-fit items-center">
                {/* Country Code Selection */}
                <div className="mb-6">
                    <label htmlFor="countryCode" className="block text-gray-600 mb-2">
                        Country Code
                    </label>
                    <select
                        id="countryCode"
                        name="countryCode"
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md "
                    >
                        <option value="91">+91 (India)</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                {/* Phone Number Input */}
                <div className="mb-6">
                    <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md "
                        placeholder="Enter your phone number"
                    />
                </div>

                {
                    (!otpSent ? <div id='recaptcha'>

                    </div> : null)
                }
                {/* Button to Get OTP or Verify OTP based on the OTP status */}
                {otpSent ? (
                    // OTP Sent, show OTP input field and Verify OTP button
                    <div className="mb-6">
                        <label htmlFor="verificationCode" className="block text-gray-600 mb-2">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="verificationCode"
                            name="verificationCode"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the verification code"
                        />
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                        >
                            Verify OTP
                        </button>
                    </div>
                ) : (
                    // OTP Not Sent, show Get OTP button
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        className="mt-4 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Get OTP
                    </button>
                )}
            </div>

        </div>
    );
};

export default AuthPage;
