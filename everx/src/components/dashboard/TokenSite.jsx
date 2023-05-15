
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db, auth } from '../auth/firebase';
import { doc, setDoc, getDoc, getDocs, query, where, collection } from "firebase/firestore";

import instagram from "../../images/instagram.png"
import youtube from "../../images/youtube.png"
import facebook from "../../images/facebook.png"
import tiktok from "../../images/tiktok.png"
import discord from "../../images/discord.png"
import twitter from "../../images/twitter.png"
import reddit from "../../images/reddit.png"
import twitch from "../../images/twitch.png"
import snapchat from "../../images/snapchat.png"
import email from "../../images/email.png"
import phone from "../../images/phone.png"
import './TokenSite.css';


function TokenSite() {
    const [title, setTitle] = useState(localStorage.getItem("phonev") || "");
    const [subtitle, setSubTitle] = useState(localStorage.getItem("emailv") || "");
    const [phonev, setPhone] = useState(localStorage.getItem("phonev") || "");
    const [emailv, setEmail] = useState(localStorage.getItem("emailv") || "");
    const [instagramv, setInstagram] = useState(localStorage.getItem("instagramv") || "");
    const [youtubev, setYoutube] = useState(localStorage.getItem("youtubev") || "");
    const [facebookv, setFacebook] = useState(localStorage.getItem("facebookv") || "");
    const [tiktokv, setTiktok] = useState(localStorage.getItem("tiktokv") || "");
    const [discordv, setDiscord] = useState(localStorage.getItem("discordv") || "");
    const [twitterv, setTwitter] = useState(localStorage.getItem("twitterv") || "");
    const [redditv, setReddit] = useState(localStorage.getItem("redditv") || "");
    const [twitchv, setTwitch] = useState(localStorage.getItem("twitchv") || "");
    const [snapchatv, setSnapchat] = useState(localStorage.getItem("snapchatv") || "");
  
    const [usertoken, setUsertoken] = useState(null);
    const location = useLocation();
    const token = location.pathname.substring(1);
  
    useEffect(() => {
      if (token) {
        console.log(`Token from URL: ${token}`);
  
        const q = query(collection(db, 'userdata'), where('token', '==', token));
        getDocs(q)
          .then((querySnapshot) => {
            console.log(`Number of matching documents: ${querySnapshot.size}`);
  
            // Check if there's a matching document and set the usertoken state variable
            if (querySnapshot.size > 0) {
              const usertokenData = querySnapshot.docs[0].data().token;
              setUsertoken(usertokenData);
              // Get the social media values from the document
              const userData = querySnapshot.docs[0].data();
              setTitle(userData.name || '');
              setSubTitle(userData.subtitle || '');
              setPhone(userData.phone || '');
              setEmail(userData.email || '');
              setInstagram(userData.instagram || '');
              setYoutube(userData.youtube || '');
              setFacebook(userData.facebook || '');
              setTiktok(userData.tiktok || '');
              setDiscord(userData.discord || '');
              setTwitter(userData.twitter || '');
              setReddit(userData.reddit || '');
              setTwitch(userData.twitch || '');
              setSnapchat(userData.snapchat || '');
            }
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }
    }, [db, token]);

        return (
        <div className='shareable'>
            <div className='shareable__container'>
                <h1 className='socials__title shareable__title'>{title}</h1>
                <h2 className='socials__subtitle shareable__subtitle'>{subtitle}</h2>
                <div className='icon__container__content'>
                    {phonev && <a href={`tel:${phonev}`} target="_blank"><img src={phone} className="social__icon social__icon__dist" /></a>}
                    {emailv && <a href={`mailto:${emailv}`} target="_blank"><img src={email} className="social__icon social__icon__dist" /></a>}
                    {instagramv && <a href={`https://www.instagram.com/${instagramv}`} target="_blank"><img src={instagram} className="social__icon social__icon__dist" /></a>}
                    {youtubev && <a href={`https://www.youtube.com/channel/${youtubev}`} target="_blank"><img src={youtube} className="social__icon social__icon__dist" /></a>}
                    {discordv && <a href={`https://discord.com/users/${discordv}`} target="_blank"><img src={discord} className="social__icon social__icon__dist" /></a>}
                    {twitchv && <a href={`https://www.twitch.tv/${twitchv}`} target="_blank"><img src={twitch} className="social__icon social__icon__dist" /></a>}
                    {redditv && <a href={`https://www.reddit.com/user/${redditv}`} target="_blank"><img src={reddit} className="social__icon social__icon__dist" /></a>}
                    {tiktokv && <a href={`https://www.tiktok.com/@${tiktokv}`} target="_blank"><img src={tiktok} className="social__icon social__icon__dist" /></a>}
                    {facebookv && <a href={`https://www.facebook.com/${facebookv}`} target="_blank"><img src={facebook} className="social__icon social__icon__dist" /></a>}
                    {twitterv && <a href={`https://twitter.com/${twitterv}`} target="_blank"><img src={twitter} className="social__icon social__icon__dist" /></a>}
                    {snapchatv && <a href={`https://www.snapchat.com/add/${snapchatv}`} target="_blank"><img src={snapchat} className="social__icon social__icon__dist" /></a>}
                </div>
            </div>
        </div>
        );
    }; 

export default TokenSite;