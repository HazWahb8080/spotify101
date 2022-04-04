import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playListState } from '../atoms/playlistAtom';
import sportifyApi from './../lib/spotify';
import useSpotify from './../hooks/useSpotify';
import Songs from './Songs';
import { currentTrackIdState, isPlayingState } from './../atoms/songAtom';


const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-neutral-500",
];

function Center() {
  const sportifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null)
  const [playlistid, setplaylistid] = useRecoilState(playListIdState);
  const [playlist, setplaylist] = useRecoilState(playListState);


  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistid]);

  useEffect(() => {
    sportifyApi.getPlaylist(playlistid).then((data) => {
      setplaylist(data.body)
    }).catch((err) => console.log("error", err));

  }, [sportifyApi, playlistid]);


  return (
    <div  className="flex-1 w-full h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div onClick= {signOut} className="  flex items-center justify-center cursor-pointer rounded-full p-1 pr-2
             bg-black space-x-3 opacity-90 hover:opacity-80 text-white">
          <img className="rounded-full self-center w-10 h-10" src={session?.user.image} />
          <h2 className="self-center ">{session?.user.name}</h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>
      <section className={`flex flex-1 p-8 w-full items-end space-x-7 h-80 text-white bg-gradient-to-b to-black ${color}`}>
        <img
          className='h-44 w-44 shadow-2xl'
          src={playlist?.images[0]?.url} />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center