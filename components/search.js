import React from 'react';
import { useState, useEffect } from 'react';
import sportifyApi from './../lib/spotify';
import useSpotify from './../hooks/useSpotify';
import SearchResult from "./SearchResult";
import Player from './player';



function Search() {
    const [search,setSearch] = useState("");
    const [searchResults,setSearchResults] = useState([]);
    const [lyrics,setLyrics] = useState("");

    const sportifyApi = useSpotify();
    useEffect(()=>{
        if(!search)return setSearchResults([]);
        let cancel = false;
        sportifyApi.searchTracks(search).then(res=>{
            if(cancel) return;
            setSearchResults(res.body.tracks.items.map(track =>{
                const smallestAlbumImage = track.album.images.reduce((
                    smallest,image) => {
                        if(image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    id: track.id,
                    uri:track.uri,
                    albumUrl: smallestAlbumImage.url,
                }

            }))
        })
        // after making the request and when search changes do that below
        return () => cancel = true
    },[search]);

    


  return (
    <div className='bg-black/95 h-screen w-full items-center justify-center flex'>
        <div className=" items-center justify-start flex flex-col w-full h-full">
            {/* search bar */}
            <div className=" w-full py-4 items-center flex justify-center">
                <input
                 className="input w-11/12 lg:w-1/3"
                 placeholder='search songs/artists'
                 value={search}
                 onChange={(e)=>setSearch(e.target.value)}
                  />
            </div>
            {/* results */}
            <div className="w-full h-[700px] space-y-4 px-6 lg:px-12 py-6 overflow-y-scroll scrollbar-hide my-2">
                {searchResults.map((result)=>(
                    <SearchResult
                    key={result.uri}
                    track={result}
                    />
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default Search;