import React, { use } from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, Firestore, getDoc, updateDoc, documentRef } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import app from '../../firebaseConfig'
import Loading from '../../components/loading'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { contractAddress, contractABI } from '../../../contract/ContractDetails'
import Router from 'next/router'

const voteCandidate = () => {
    const auth = getAuth(app);
    const [candidateList, setCandidateList] = useState([]);
    const [chooseLanguage, setChooseLanguage] = useState(false)
    const [english, setEnglish] = useState(false)

    const [voterhasvoted, setvotervoted] = useState(false);

    const [showStatus, setShowStatus] = useState(false);
    const [connected, setConnected] = useState(false);
    const { enableWeb3, account, isWeb3Enabled, deactivateWeb3 } = useMoralis();

    useEffect(() => {
        console.log("Checking for existing connection...");
        console.log("isWeb3Enabled: ", isWeb3Enabled);
        console.log("showStatus: ", showStatus);

        checkvoted()



    }, []);


    const checkvoted = async () => {

        console.log("kd ")
        const db = getFirestore(app);
        const currentvoterUid = auth.currentUser?.uid;
        console.log("uid" + currentvoterUid)
        const voterRef = doc(db, 'voters', currentvoterUid);


        const docSnapshot = await getDoc(voterRef);
        console.log("voated" + docSnapshot)
        if (docSnapshot.exists()) {
            const voted = docSnapshot.data()['voted'];
            console.log("vit" + voted)
            setvotervoted(voted);
        } else {
            setvotervoted(false);
        }

    }

    useEffect(() => {
        if (isWeb3Enabled) {
            console.log("Web3 connection enabled.");
            setConnected(true);
            setShowStatus(true);
            setTimeout(() => {
                setShowStatus(false);
            }, 5000);
        }
        else {
            console.log("Web3 connection disabled.");
            setConnected(false);
            setShowStatus(true);
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        const handleAccountChange = (newAccount) => {
            console.log("Account change detected:", newAccount);
            if (newAccount == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
                setConnected(false);
            }
        };

        handleAccountChange(account);

        return () => {
            window.removeEventListener("accountChange", handleAccountChange);
        };
    }, [account, deactivateWeb3]);


    const firestore = getFirestore(app);

    const { runContractFunction: vote } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contractAddress,
        functionName: "vote",
        params: { "_candidateIndex": 1 }
    })


    const getCandiateList = async () => {
        const candidateRef = collection(firestore, 'candidates');
        const querySnapshot = await getDocs(candidateRef);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data());
        });

        const candidates = [];
        querySnapshot.forEach((doc) => {
            candidates.push({ id: doc.id, ...doc.data() });
        });
        setCandidateList(candidates);
        console.log(candidateList);
    }

    const handelsignout = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            console.log("User signed out successfully.");
        }).catch((error) => {
            console.error("Error signing out:", error);
        });

        Router.push('/voters');


    };



    useEffect(() => {
        getCandiateList();
        // console.log(account)

    }, [])

    const handleenglish = async () => {

        setChooseLanguage(true);
        setEnglish(true);
        await enableWeb3()

    }

    const handlehindi = async () => {
        setChooseLanguage(true)
        setEnglish(false)
        await enableWeb3()
    }

    const handlevote = async (id) => {
        console.log("hiii");
        console.log(id);
        await vote();

        try {
            const db = getFirestore(app);
            const candidateRef = doc(db, 'candidates', id);

            const docSnapshot = await getDoc(candidateRef);
            if (docSnapshot.exists()) {
                let votes = docSnapshot.data()['votes'] || 0;
                votes++;
                console.log("New vote count:", votes);

                await updateDoc(candidateRef, {
                    votes: votes
                });
                console.log("Vote successfully updated!");
            } else {
                console.log("Document does not exist!");
            }



            const currentvoterUid = auth.currentUser.uid;
            const voterRef = doc(db, 'voters', currentvoterUid);
            await updateDoc(voterRef, {
                voted: true
            });

        } catch (error) {
            console.error("Error handling vote:", error);
        }

        Router.push('/voters/feedback')
    };




    if (candidateList.length === 0) {
        return <Loading />; // Show loading spinner or message
    }

    if (chooseLanguage === false) {
        return (
            <div className='h-screen flex justify-center items-center bg-blue-50 '>

                <div className='h-1/4 w-1/3 bg-blue-100 border-b-2 border-black '>

                    <div className='p-4 text-center text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '> Language (भाषा)</div>

                    <div className='flex flex-col justify-center items-center bg-blue-100'>

                        <div className='p-4 flex justify-around w-full '>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleenglish}>English</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handlehindi}>हिंदी</button>
                        </div>

                        <div className='p-4 flex justify-around w-full'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>மராத்தி</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>మరాఠీ</button>
                        </div>

                    </div>




                </div>

            </div>
        )
    }

    if (voterhasvoted) {
        return <div className='h-screen flex justify-center items-center'>

            <button onClick={() => { handelsignout() }} className='text-4xl'>Thankyou for Your Vote</button>

        </div>
    }

    if (english) {


        return (

            <div className='min-h-screen h-fit'>
                < div className='h-24 bg-blue-950 text-white  flex justify-center items-center text-4xl mb-8' >

                    Make a difference.Vote for the candidate who represents your values and beliefs.

                </ div >

                <div className='h-fit'>

                    <div className='flex h-fit w-full justify-center items-center'>
                        {/* <button onClick={async () => { await enableWeb3() }}>Connect</button> */}
                        {candidateList ?
                            <table className='table-auto w-3/4 '>
                                <thead>
                                    <tr>
                                        <th className='px-4 py-2'>S No</th>
                                        <th className='px-4 py-2'>Name</th>
                                        <th className='px-4 py-2'>Party</th>
                                        <th className='px-4 py-2'>Choose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidateList.map((candidate, index) => (
                                        <tr key={candidate.id} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                                            <td className='border px-4 py-2 text-center'>{index + 1}</td>
                                            <td className='border px-4 py-2 text-center'>{candidate.Name}</td>
                                            <td className='border px-4 py-2 text-center'>{candidate.Party}</td>
                                            <td className='border px-4 py-2 text-center'>
                                                <button className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600' onClick={() => { handlevote(candidate.id) }}>Vote</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <div>Loading</div>}
                    </div>





                </div>


            </div >

        )
    }

    if (!english) {
        return (
            <div className='min-h-screen h-fit'>
                < div className='h-24 bg-blue-950 text-white  flex justify-center items-center text-4xl mb-8' >

                    बदलाव लाएँ। उस उम्मीदवार को वोट दें जो आपके मूल्यों और विश्वासों का प्रतिनिधित्व करता हो।

                </ div >

                <div className='h-fit'>

                    <div className='flex h-fit w-full justify-center items-center'>
                        {candidateList ?
                            <table className='table-auto w-3/4 '>
                                <thead>
                                    <tr>
                                        <th className='px-4 py-2'>क्रम संख्या</th>
                                        <th className='px-4 py-2'>नाम</th>
                                        <th className='px-4 py-2'>दल</th>
                                        <th className='px-4 py-2'>चुना</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidateList.map((candidate, index) => (
                                        <tr key={candidate.id} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                                            <td className='border px-4 py-2 text-center'>{index + 1}</td>
                                            <td className='border px-4 py-2 text-center'>{candidate.Name2}</td>
                                            <td className='border px-4 py-2 text-center'>{candidate.Party2}</td>
                                            <td className='border px-4 py-2 text-center'>
                                                <button className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600' onClick={() => { handlevote(candidate.id) }}>दबाय</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <div>Loading</div>}
                    </div>





                </div>


            </div >
        )
    }



}




export default voteCandidate
