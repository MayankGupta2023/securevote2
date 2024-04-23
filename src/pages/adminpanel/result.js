import React, { useEffect, useState } from 'react';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import app from '../../firebaseConfig';
import Loading from '../../components/loading';

const Result = () => {
    const [candidateList, setCandidateList] = useState([]);
    const [votersVoted, setVotersVoted] = useState(0);
    const [totalVoters, setTotalVoters] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const firestore = getFirestore(app);

        const fetchData = async () => {
            try {
                const candidateRef = collection(firestore, 'candidates');
                const querySnapshot = await getDocs(candidateRef);
                const candidates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), totalVotes: 0 }));
                setCandidateList(candidates);

                const votedQuery = query(collection(firestore, 'voters'), where('status', '==', true));
                const votedResult = await getDocs(votedQuery);
                const votedCount = votedResult.size;
                setVotersVoted(votedCount);

                const totalQuery = collection(firestore, 'voters');
                const totalResult = await getDocs(totalQuery);
                const totalCount = totalResult.size;
                setTotalVoters(totalCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-blue-50'>
            {loading ? (
                <div className='w-full'><Loading /></div>
            ) : (
                <div className="w-full max-w-screen-lg mx-auto p-6">
                    <div className='text-center text-3xl mb-8'>Results</div>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-4 py-2">S. No</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Party</th>
                                <th className="px-4 py-2">Total Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidateList.map((candidate, index) => (
                                <tr key={candidate.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{candidate.Name}</td>
                                    <td className="border px-4 py-2">{candidate.Party}</td>
                                    <td className="border px-4 py-2 text-center">{candidate.votes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-center mt-8">
                        <div className="text-xl font-bold mb-4">Total Vote Count: {votersVoted}</div>
                        <div className="text-xl font-bold">Total Voters Eligible: {totalVoters}</div>
                    </div>


                </div>
            )}
        </div>
    );
};

export default Result;
