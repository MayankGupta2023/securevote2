import React, { use } from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, Firestore, getDoc, updateDoc, documentRef } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import app from '../../firebaseConfig'
import Loading from '../../components/loading'
import Router from 'next/router'

const Feedback = () => {
    const auth = getAuth(app);

    const [ratings, setRatings] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: ''
    });

    const handleRatingChange = (question, value) => {
        setRatings(prevState => ({
            ...prevState,
            [question]: value
        }));
    };

    const handlesubmit = (e) => {

        e.preventDefault();

        const auth = getAuth(app);
        signOut(auth).then(() => {
            console.log("User signed out successfully.");
        }).catch((error) => {
            console.error("Error signing out:", error);
        });

        Router.push('/voters');



    }

    return (
        <div className="p-4 flex flex-col justify-center items-center h-screen">
            <h2 className="text-2xl font-bold  mt-8">Feedback Form</h2>
            <form className='w-3/5 px-20 py-8'>
                <div className="pb-4 bg-blue-200 pl-4">
                    <label htmlFor="q1" className="block font-bold mb-2 pt-2">Question 1: How would you rate the facilities provided at the center?</label>
                    <div className="flex items-center">
                        <input type="radio" id="q1worse" name="q1" value="worse" onChange={() => handleRatingChange('q1', 'worse')} className="mr-2" />
                        <label htmlFor="q1worse" className="mr-4">Worse</label>
                        <input type="radio" id="q1satisfactory" name="q1" value="satisfactory" onChange={() => handleRatingChange('q1', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q1satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q1good" name="q1" value="good" onChange={() => handleRatingChange('q1', 'good')} className="mr-2" />
                        <label htmlFor="q1good" className="mr-4">Good</label>
                        <input type="radio" id="q1excellent" name="q1" value="excellent" onChange={() => handleRatingChange('q1', 'excellent')} className="mr-2" />
                        <label htmlFor="q1excellent">Excellent</label>
                    </div>
                </div>

                <div className="pb-4 bg-blue-100 pl-4">
                    <label htmlFor="q2" className="block font-bold mb-2">Question 2: How would you rate the accessibility of the exam center?</label>
                    <div className="flex items-center">
                        <input type="radio" id="q2worse" name="q2" value="worse" onChange={() => handleRatingChange('q2', 'worse')} className="mr-2" />
                        <label htmlFor="q2worse" className="mr-4">Worse</label>
                        <input type="radio" id="q2satisfactory" name="q2" value="satisfactory" onChange={() => handleRatingChange('q2', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q2satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q2good" name="q2" value="good" onChange={() => handleRatingChange('q2', 'good')} className="mr-2" />
                        <label htmlFor="q2good" className="mr-4">Good</label>
                        <input type="radio" id="q2excellent" name="q2" value="excellent" onChange={() => handleRatingChange('q2', 'excellent')} className="mr-2" />
                        <label htmlFor="q2excellent">Excellent</label>
                    </div>
                </div>

                <div className="pb-4 bg-blue-200 pl-4">
                    <label htmlFor="q3" className="block font-bold mb-2">Question 3: Was center biased or forcing to vote particular candidate?</label>
                    <div className="flex items-center">
                        <input type="radio" id="q3worse" name="q3" value="worse" onChange={() => handleRatingChange('q3', 'worse')} className="mr-2" />
                        <label htmlFor="q3worse" className="mr-4">Worse</label>
                        <input type="radio" id="q3satisfactory" name="q3" value="satisfactory" onChange={() => handleRatingChange('q3', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q3satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q3good" name="q3" value="good" onChange={() => handleRatingChange('q3', 'good')} className="mr-2" />
                        <label htmlFor="q3good" className="mr-4">Good</label>
                        <input type="radio" id="q3excellent" name="q3" value="excellent" onChange={() => handleRatingChange('q3', 'excellent')} className="mr-2" />
                        <label htmlFor="q3excellent">Excellent</label>
                    </div>
                </div>

                <div className="pb-4 bg-blue-100 pl-4">
                    <label htmlFor="q4" className="block font-bold mb-2">Question 4: How would you rate the overall organization of the voting process? </label>
                    <div className="flex items-center">
                        <input type="radio" id="q4worse" name="q4" value="worse" onChange={() => handleRatingChange('q4', 'worse')} className="mr-2" />
                        <label htmlFor="q4worse" className="mr-4">Worse</label>
                        <input type="radio" id="q4satisfactory" name="q4" value="satisfactory" onChange={() => handleRatingChange('q4', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q4satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q4good" name="q4" value="good" onChange={() => handleRatingChange('q4', 'good')} className="mr-2" />
                        <label htmlFor="q4good" className="mr-4">Good</label>
                        <input type="radio" id="q4excellent" name="q4" value="excellent" onChange={() => handleRatingChange('q4', 'excellent')} className="mr-2" />
                        <label htmlFor="q4excellent">Excellent</label>
                    </div>
                </div>

                <div className="pb-4 bg-blue-200 pl-4">
                    <label htmlFor="q5" className="block font-bold mb-2">Question 5: How would you rate the technical support provided on center?</label>
                    <div className="flex items-center">
                        <input type="radio" id="q5worse" name="q5" value="worse" onChange={() => handleRatingChange('q5', 'worse')} className="mr-2" />
                        <label htmlFor="q5worse" className="mr-4">Worse</label>
                        <input type="radio" id="q5satisfactory" name="q5" value="satisfactory" onChange={() => handleRatingChange('q5', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q5satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q5good" name="q5" value="good" onChange={() => handleRatingChange('q5', 'good')} className="mr-2" />
                        <label htmlFor="q5good" className="mr-4">Good</label>
                        <input type="radio" id="q5excellent" name="q5" value="excellent" onChange={() => handleRatingChange('q5', 'excellent')} className="mr-2" />
                        <label htmlFor="q5excellent">Excellent</label>
                    </div>
                </div>

                <div className="pb-4 bg-blue-100 pl-4">
                    <label htmlFor="q6" className="block font-bold mb-2">Question 6: How would you rate the cleanliness of the exam center facilities, including restrooms and waiting areas?</label>
                    <div className="flex items-center">
                        <input type="radio" id="q6worse" name="q6" value="worse" onChange={() => handleRatingChange('q6', 'worse')} className="mr-2" />
                        <label htmlFor="q6worse" className="mr-4">Worse</label>
                        <input type="radio" id="q6satisfactory" name="q6" value="satisfactory" onChange={() => handleRatingChange('q6', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q6satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q6good" name="q6" value="good" onChange={() => handleRatingChange('q6', 'good')} className="mr-2" />
                        <label htmlFor="q6good" className="mr-4">Good</label>
                        <input type="radio" id="q6excellent" name="q6" value="excellent" onChange={() => handleRatingChange('q6', 'excellent')} className="mr-2" />
                        <label htmlFor="q6excellent">Excellent</label>
                    </div>
                </div>

                <div className="pb-4 bg-blue-200 pl-4">
                    <label htmlFor="q7" className="block font-bold mb-2">Question 7: Overall, how satisfied are you with your experience at this center?</label>
                    <div className="flex items-center">
                        <input type="radio" id="q7worse" name="q7" value="worse" onChange={() => handleRatingChange('q7', 'worse')} className="mr-2" />
                        <label htmlFor="q7worse" className="mr-4">Worse</label>
                        <input type="radio" id="q7satisfactory" name="q7" value="satisfactory" onChange={() => handleRatingChange('q7', 'satisfactory')} className="mr-2" />
                        <label htmlFor="q7satisfactory" className="mr-4">Satisfactory</label>
                        <input type="radio" id="q7good" name="q7" value="good" onChange={() => handleRatingChange('q7', 'good')} className="mr-2" />
                        <label htmlFor="q7good" className="mr-4">Good</label>
                        <input type="radio" id="q7excellent" name="q7" value="excellent" onChange={() => handleRatingChange('q7', 'excellent')} className="mr-2" />
                        <label htmlFor="q7excellent">Excellent</label>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md mt-4' onClick={handlesubmit}>Submit</button>

                </div>
            </form>
        </div>
    );
};

export default Feedback;
