import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import Center from './../components/Center';
import styles from '../styles/Home.module.css'
import Sidebar from './../components/sidebar';
import Player from './../components/player';
import Search from "./../components/search"
import { useRecoilState } from 'recoil';
import { SearchAtom } from './../atoms/SearchAtom';

export default function Home() {
      const [SearchActive,setSearchActive] = useRecoilState(SearchAtom);

  return (
    <div className="bg-transparent h-screen w-full flex flex-col overflow-hidden">
      <main className="flex" >
        <Sidebar/>
        {SearchActive ? ( <Search/>) : (<Center/>)}
      </main>
      <div>
      </div>
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
