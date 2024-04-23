import React, { useEffect, useState } from 'react';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import app from '../../firebaseConfig';
import Loading from '../../components/loading';
import Global from '@/global'
import Accessdenied from '@/components/accessdenied'

const Status = () => {
    const [candidateList, setCandidateList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [votersVoted, setVotersVoted] = useState([]);
    const [totalVoters, setTotalVoters] = useState([]);

    useEffect(() => {
        const firestore = getFirestore(app);
        const getCandidateList = async () => {
            try {
                const candidateRef = query(collection(firestore, 'voters'), where('field', '==', 'SNU'));
                const querySnapshot = await getDocs(candidateRef);
                const candidates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCandidateList(candidates);
                console.log(candidates)

                const votedQuery = query(collection(firestore, 'voters'), where('status', '==', true), where('field', '==', 'SNU'));
                const votedResult = await getDocs(votedQuery);
                const votedCount = votedResult.size;
                setVotersVoted(votedCount);

                const totalQuery = query(collection(firestore, 'voters'), where('field', '==', 'SNU'));
                const totalResult = await getDocs(totalQuery);
                const totalCount = totalResult.size;
                setTotalVoters(totalCount);

            } catch (error) {
                console.error('Error fetching candidates:', error);
            } finally {
                setLoading(false);
            }
        };

        getCandidateList();
        console.log(Global.electionstatus)
    }, []);

    const changeStatus = async (id) => {
        try {
            const firestore = getFirestore(app);
            const candidateRef = doc(firestore, 'voters', id);
            await updateDoc(candidateRef, { status: true });
            // Update the local state to reflect the change
            setCandidateList(prevCandidates =>
                prevCandidates.map(candidate =>
                    candidate.id === id ? { ...candidate, status: true } : candidate
                )
            );
        } catch (error) {
            console.error('Error updating candidate status:', error);
        }
    };

    if (loading) {
        return <Loading />; // Show loading spinner or message
    }



    return (
        <div className='flex justify-start items-center pt-20 h-screen flex-col'>
            <table className='table-auto w-3/4'>
                <thead>
                    <tr className='bg-blue-500 text-white'>
                        <th className='px-4 py-2'>S. No</th>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Mobile Number</th>
                        <th className='px-4 py-2'>Vote Status</th>
                    </tr>
                </thead>
                <tbody>
                    {candidateList.map((candidate, index) => (
                        <tr key={candidate.id} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                            <td className='border px-4 py-2 text-center'>{index + 1}</td>
                            <td className='border px-4 py-2 text-center'>{candidate.FirstName}</td>
                            <td className='border px-4 py-2 text-center'>{candidate.MobileNumber}</td>
                            <td className='border px-4 py-2 text-center'>{candidate.status ? <button className='bg-green-500 text-white px-4 py-2 rounded-md '>True</button> : <button onClick={() => changeStatus(candidate.id)} className='bg-red-500 text-white px-4 py-2 rounded-md '>False</button>}</td>
                        </tr>
                    ))}
                </tbody>


            </table>

            <div className='mt-24 p-2 text-center w-4/5 bg-blue-500 text-white '>
                Total Number of Voters Voted  : {votersVoted}
            </div>
            <div className='p-2 text-center w-4/5 bg-blue-800 text-white '>
                Total Number of Voters : {totalVoters}
            </div>
        </div>
    );
};

export default Status;
