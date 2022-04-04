import React, { useState,useEffect} from 'react';
import sportifyApi from './../lib/spotify';
import useSpotify from './../hooks/useSpotify';
import { currentTrackIdState, isPlayingState } from './../atoms/songAtom';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import useSongInfo from './../hooks/useSongInfo';
import { useCallback } from 'react';
import { debounce } from 'lodash';

function Player() {

    const sportifyApi = new useSpotify();
    const [currentTrackId,setcurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying,setisPlaying] = useRecoilState(isPlayingState);  
    const {data:session,status} = useSession();
    const [volume,setVolume] = useState();
    const songInfo = useSongInfo();
    const fetchCurentSong = () => { 
        if(!songInfo) { 
            sportifyApi.getMyCurrentPlayingTrack().then((data) => {
                setcurrentTrackId(data.body?.item?.id);
                sportifyApi.getMyCurrentPlaybackState().then((data)=>{
                    setisPlaying(data.body?.is_playing)
                })
            });
        }

    }
    useEffect(()=>{
        if(sportifyApi.getAccessToken() && !currentTrackId) { 
            fetchCurentSong();
            setVolume(50);
        }

    },[currentTrackId,sportifyApi,session]);

    const handlePlayPause = ()=>{
        sportifyApi.getMyCurrentPlaybackState().then((data)=>{
            if(data.body.is_playing) { 
                sportifyApi.pause();
                setisPlaying(false);
            }
            else { 
                sportifyApi.play();
                setisPlaying(true)
            }
        })
    }

    useEffect( () => {
        if(volume > 0 && volume < 100) { 
            debouncedAdjustVolume(volume)
        }
    },[volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            sportifyApi.setVolume(volume).catch((err)=>{}) ;
        },500),[]);


  return (
    <div className='h-24 bg-black border-green-400/10 shadow-sm shadow-green-400 text-white border-t backdrop-blur-lg backdrop-filter bg-opacity-5
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8
    '>
        {/* left */}
        <div className='flex items-center space-x-4'>
            <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} />
            <div>
                <h3>{songInfo?.name}</h3>
                <p> {songInfo?.artists?.[0]?.name} </p>
            </div>
        </div>
        {/* center */}
        <div className='flex items-center justify-evenly'>
            {/* Switch icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            {/* rewind icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
            {isPlaying ? (
                // pause icon
                <svg onClick={handlePlayPause} xmlns="http://www.w3.org/2000/svg" class="icon fill-gray-900 h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ) : (
                // play icon
                <svg onClick={handlePlayPause} xmlns="http://www.w3.org/2000/svg" class="icon  h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
            {/* fastforward */}
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
            {/* reply */}
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
        </div>
        {/* right */}

        <div className="flex justify-end  md:space-x-4 space-x-3 items-center pr-5">
            {/* down */}
            <svg onClick={() => volume > 0 && setVolume(volume - 10)} xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <input className='w-14 md:w-28 form-input ' onChange={(e)=>setVolume(Number(e.target.value))} value={volume} type="range" min={0} max={100} />
            {/* up */}
            <svg onClick={()=> volume < 100 && setVolume(volume + 10)}  xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
            </svg>




        </div>
    </div>
  ) 
}

export default Player