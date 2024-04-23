import Image from "next/image";
import { Inter } from "next/font/google";
import securevote from '@/assets/securevote.jpeg'
import Router from 'next/router'


export default function Home() {
  return (
    <div className="h-screen bg-blue-50 pt-20">

      <div className="flex justify-center items-center pt-4 ">

        <img src={securevote.src} alt="securevote" className='h-80 w-2/5  border-2 border-black' />


      </div>
      <div className="flex w-2/5 justify-between items-center m-auto mt-8">
        <button onClick={() => Router.push('/voters')} className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voting Page</button>
        <button onClick={() => Router.push('/center')} className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Center Authority</button>
        <button onClick={() => Router.push('/adminpanel')} className="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Admin Panel</button>

      </div>

    </div>
  );
}
