import React from 'react'
import { useRecoilValue } from 'recoil';
import { playListState } from './../atoms/playlistAtom';
import Song from './Song';

export default function Songs() {
  const playlist = useRecoilValue(playListState)
  return (
    <div className="text-white px-8 pb-28 pt-6 space-y-1 bg-black
    w-full items-start justify-start flex flex-col">
      {playlist?.tracks.items.map((song,i)=>(
        <Song
        key={song.track.id}
        id={song.track.id}
        song={song}
        order={i+1}
        />

      ))}
      
    </div>
  )
}

