import React from 'react'
import securevote from '../assets/securevote.jpeg'

const forbidden = (props) => {
    console.log(securevote)
    return (
        <div className='h-screen flex  items-center flex-col pt-16 gap-8  '>
            <img src={securevote.src} alt="securevote" className='h-80  border-2 border-black' />
            <div className='text-5xl'>Access Denied</div>
            <div className='text-xl'>Organisation: {props.ORG}</div>
            <div className=' border-b-2 border-black w-4/5 text-center pb-8'>IP: {props.IP}</div>

        </div>
    )
}

export default forbidden
