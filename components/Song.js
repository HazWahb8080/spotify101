import React from 'react'
import sportifyApi from './../lib/spotify';
import useSpotify from './../hooks/useSpotify';
import { time } from './../lib/time';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

function Song({order,song}) {
  const sportifyApi = new useSpotify();
  const [currentTrackId,setcurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying,setisPlaying] = useRecoilState(isPlayingState);
  const playSong = () => {
    setcurrentTrackId(song.track.id)
    setisPlaying(true);
    sportifyApi.play({
      uris:[song?.track?.uri],
    });
  };
  
  return (
    <div onClick={playSong} className="py-4 px-5 hover:bg-gray-700/20 transition ease-in-out duration-200 rounded-lg cursor-pointer w-full grid grid-cols-2 text-gray-400">
      <div className="flex space-x-4 self-center">
        <p className='self-center'>{order}</p>
        <img className="w-10 h-10" src={song.track.album.images[0].url}/>
        <div>
        <h1 className="self-center w-36 lg:w-64 truncate text-white">{song.track.name}</h1>
        <h1 className="self-center text-xs w-40 italic">{song.track.artists[0].name}</h1>
        </div>
      </div>
    <div className='flex items-center justify-between ml-auto md:ml-0'>
      <p className="hidden md:inline w-40">{song.track.album.name}</p>
      <p >{time(song.track.duration_ms)}</p>
    </div>
    </div>
  )
}

export default Song