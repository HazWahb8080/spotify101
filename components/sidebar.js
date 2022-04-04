import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import useSpotify from './../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playListIdState } from '../atoms/playlistAtom';

export default function Sidebar() {
    const sportifyApi = useSpotify();
    const {data:session} = useSession();
    const [playlists,setPlaylists] = useState([]);
    const [playlistid,setplaylistid] = useRecoilState(playListIdState);
    
    useEffect(()=>{

        if(sportifyApi.getAccessToken()){
            sportifyApi.getUserPlaylists(session).then((data) => {
                setPlaylists(data.body.items)
            });
        }

    },[session,sportifyApi]);

  return (
    <div className="text-gray-500 p-5 lg:text-sm bg-black
    overflow-y-scroll h-screen scrollbar-hide text-xs sm:max-w-[12rem]
     lg:max-w-[36rem] lg:w-[15rem] md:w-[12rem] hidden md:inline-block ">
        <div className="space-y-4 w-full items-start justify-start flex flex-col">
            <button onClick={()=>signOut()} className="flex space-x-2 items-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <p>Home</p>
            </button>

            <button className="flex space-x-2 items-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p>Search</p>
            </button>

            <button className="flex space-x-2 items-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p>Library</p>
            </button> 
            <hr className="border-t-[0.1px] border-gray-900" />


            <button className="flex space-x-2 items-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v16m8-8H4" />
                    </svg>
                    <p>Create Playlist</p>
            </button>

            <button className="flex space-x-2 items-center hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p>Liked Songs</p>
            </button> 

            <button className="flex space-x-2 items-center hover:text-white">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                   </svg>
                    <p>Your Episodes</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900" />
            {playlists.map((playlist)=>(
            <p
            key= {playlist.id}
            onClick={()=>setplaylistid(playlist.id)}
             className="hover:text-white cursor-pointer">{playlist.name}</p>
            ))}
            
            
        </div>
    </div>
  )
}

