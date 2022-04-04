import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import Center from './../components/center';
import styles from '../styles/Home.module.css'
import Sidebar from './../components/sidebar';
import Player from './../components/player';

export default function Home() {
  return (
    <div className="bg-transparent h-screen w-full flex flex-col overflow-hidden">
      <main className="flex" >
        <Sidebar/>
        <Center/>
      </main>
      <div>
      </div>
        {/* player */}
        <div className='sticky text-white bottom-0'>
        <Player/>
        </div>
    </div>
  )
}
export async function getServerSideProps(context){
  const session = await getSession(context);
  return{
    props:{
      session
    }
  }
}
