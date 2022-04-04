import React from 'react'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from './useSpotify';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useEffect } from 'react';

function useSongInfo() {
    const sportifyApi = new useSpotify();
    const [currentTrackId,setcurrentTrackId] = useRecoilState(currentTrackIdState);
    const {data:session,status} = useSession();
    const [songInfo,setSongInfo] = useState(null);

    useEffect(()=>{
        const fetchsongInfo = async()=>{
            if (currentTrackId) { 
                const trackInfo  = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,{
                        headers:{
                            Authorization: `Bearer ${sportifyApi.getAccessToken()}`,
                        },
                    }
                ).then((res) => res.json());
                setSongInfo(trackInfo)
            }
        };
        
        fetchsongInfo();

    },[currentTrackId,sportifyApi]);

    return songInfo;


    return (
    <div>
        
    </div>
  )
}

export default useSongInfo