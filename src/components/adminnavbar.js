import React from 'react'
import securevote from '../assets/securevote.jpeg'
import Router from 'next/router'
import Global from '../global'
import { useState } from 'react'

const adminnavbar = () => {

    const [electionStatus, setElectionStatus] = useState(Global.electionstatus);

    const handleToggleElectionStatus = () => {
        const newStatus = !electionStatus;
        setElectionStatus(newStatus);
        Global.electionstatus = newStatus; // Update the global variable
        console.log(Global.electionstatus)
        if (electionStatus == true) {

            Router.push('/adminpanel/result')

        }
    };

    return (
        <div className='h-full flex justify-between'>
            <div className='flex items-center '>
                <img src={securevote.src} alt='SecureVote' className='h-16 ml-4' />
            </div>
            <div className='flex items-center justify-between w-1/3 mr-12'>

                <button onClick={() => Router.push("/adminpanel")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Manage Canddiates
                </button>

                <button onClick={() => Router.push("/adminpanel/managevoters")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Manage Voters
                </button>

                <button onClick={handleToggleElectionStatus} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    {electionStatus ? "End Elections" : "Start Elections"}
                </button>

            </div>


        </div>
    )
}

export default adminnavbar
