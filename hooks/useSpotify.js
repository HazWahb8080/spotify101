import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';

const sportifyApi =new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default function useSpotify() {
    const {data:session, status} = useSession();
    useEffect(()=>{
        if(session){
            if(session.error==="RefreshAccessTokenError"){
                signIn();
            }
            sportifyApi.setAccessToken(session.user.accessToken);
        }
    },[session]);
 return sportifyApi;
}
