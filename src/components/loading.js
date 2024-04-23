import React from 'react'
import securevote from '../assets/securevote.jpeg'

const loading = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-4 bg-blue-50'>
            <img src={securevote.src} alt="securevote" className='h-80  border-2 border-black' />
            <div className='text-7xl'> Loading...</div>
        </div>
    )
}

export default loading
