import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../firebaseConfig';
import Loading from '../../components/loading';

const ListOfVoters = () => {
    const [voterList, setVoterList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const firestore = getFirestore(app);
        const getVoterList = async () => {
            try {
                const voterRef = collection(firestore, 'voters');
                const querySnapshot = await getDocs(voterRef);
                const voters = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVoterList(voters);
            } catch (error) {
                console.error('Error fetching voter list:', error);
            } finally {
                setLoading(false);
            }
        };

        getVoterList();
    }, []);

    if (loading) {
        return <Loading />; // Show loading spinner or message
    }

    return (
        <div className="p-4 h-screen">
            <h2 className="text-2xl font-bold mb-4 text-center border-b-2 m-auto border-black w-1/2">List of Voters</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S. No</th>
                        <th className="px-4 py-2">Voter ID</th>
                        <th className="px-4 py-2">First Name</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">Center</th>
                        <th className="px-4 py-2">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {voterList.map((voter, index) => (
                        <tr key={voter.id} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                            <td className="border px-4 py-2 text-center">{voter.id}</td>
                            <td className="border px-4 py-2 text-center">{voter.FirstName}</td>
                            <td className="border px-4 py-2 text-center">{voter.LastName}</td>
                            <td className="border px-4 py-2 text-center">{voter.field}</td>
                            <td className="border px-4 py-2 text-center">{voter.CurrentAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfVoters;
