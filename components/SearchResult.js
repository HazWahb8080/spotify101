import React from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from './../atoms/songAtom';
import sportifyApi from './../lib/spotify';
import useSpotify from './../hooks/useSpotify';
import useSongInfo from './../hooks/useSongInfo';
import { useRef,useEffect } from 'react';




function SearchResult({track,chooseTrack}) {
    useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
    const ref = useRef(null);
        const songInfo = useSongInfo();
        const sportifyApi = useSpotify();
        const [currentTrackId,setcurrentTrackId] = useRecoilState(currentTrackIdState);
        function handlePlay () { 
            setcurrentTrackId(track.id)
            sportifyApi.play({
            uris:[track.uri],
            });
    }
         

  
     return (
    <div onClick={handlePlay} className={` ${track.id === currentTrackId ? "result-active" : "result" } `}>
        {/* container */}
        <div className="w-full flex items-center justify-start space-x-4">
        {/* image */}
        <div>
            <img src={track.albumUrl} className="w-[100px] rounded-l-xl h-[100px] object-cover" />
        </div>
        {/* name + title */}
        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col items-start justify-start w-full">
        <h1 className="text-white font-medium">{track.title}</h1>
        <h1 className="text-gray-400">{track.artist}</h1>
            </div>
        <div className="items-center px-5  justify-end flex">
        { track.id === currentTrackId && <lottie-player
        id="firstLottie"
        ref={ref}
        autoplay
        loop
        mode="normal"
        src="https://assets2.lottiefiles.com/packages/lf20_rtihieu4.json"
        style={{width: "60px" , height:"50px"}}
        >
        </lottie-player>}
        </div>
        
        </div>
        </div>

    </div>
  )
}

export default SearchResult;
