import React from 'react';
import Adminnavbar from '../../components/adminnavbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import app from '../../firebaseConfig';
import Router from 'next/router'

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    getDoc,
    addDoc,
    addDocs
} from 'firebase/firestore';
import Global from '@/global'
import Accessdenied from '@/components/accessdenied'

const auth = getAuth(app);


const Index = () => {
    // State variables to store candidate information
    const [name, setName] = useState('');
    const [party, setParty] = useState('');
    const [error, setError] = useState(false);


    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can add code to send the candidate data to your backend server and update the database
        // For now, let's just log the candidate information
        console.log('Name:', name);
        console.log('Party:', party);

        try {
            const firestore = getFirestore(app);

            // Add the candidate to the 'candidates' collection
            await addDoc(collection(firestore, 'candidates'), {
                Name: name,
                Party: party,
                vote: 0
            });

            console.log('Candidate added successfully!');
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError(true);
        }


        // Reset the form fields
        setName('');
        setParty('');
    };

    if (error) {
        return <div className='h-screen flex justify-center items-center text-7xl'>Error adding candidate....</div>
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

            <div className='flex justify-center '>
                <div className="container mx-8 mr-12 mt-8 pb-12 w-2/3 ">
                    <h1 className="text-3xl font-bold">Add Candidate</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="party" className="block text-gray-700 text-sm font-bold mb-2">Party:</label>
                            <input
                                type="text"
                                id="party"
                                value={party}
                                onChange={(e) => setParty(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Candidate</button>
                        <button onClick={() => Router.push('/adminpanel/listofcandidates')} className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">List Of Candidates</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Index;
