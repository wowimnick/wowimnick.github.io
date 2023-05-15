import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../auth/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'firebase/compat/auth';
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
import "./Social.css";
import Footer from "../Footer";

function Socials() {

  AOS.init();

  const notify = () =>
    toast.success('Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

  const navigate = useNavigate();
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

  function handleSave() {
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, "userdata", uid);
      setDoc(docRef, {
        phone: phonev,
        email: emailv,
        instagram: instagramv,
        youtube: youtubev,
        facebook: facebookv,
        tiktok: tiktokv,
        discord: discordv,
        twitter: twitterv,
        reddit: redditv,
        twitch: twitchv,
        snapchat: snapchatv
      }, { merge: true });
      console.log("Document merged with ID: ", uid);
  }

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const uid = user.uid;
    const docRef = doc(db, "userdata", uid);
    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setPhone(data.phone);
        setEmail(data.email);
        setInstagram(data.instagram);
        setYoutube(data.youtube);
        setFacebook(data.facebook);
        setTiktok(data.tiktok);
        setDiscord(data.discord);
        setTwitter(data.twitter);
        setReddit(data.reddit);
        setTwitch(data.twitch);
        setSnapchat(data.snapchat);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("phonev", phonev);
    localStorage.setItem("emailv", emailv);
    localStorage.setItem("instagramv", instagramv);
    localStorage.setItem("youtubev", youtubev);
    localStorage.setItem("facebookv", facebookv);
    localStorage.setItem("tiktokv", tiktokv);
    localStorage.setItem("discordv", discordv);
    localStorage.setItem("twitterv", twitterv);
    localStorage.setItem("redditv", redditv);
    localStorage.setItem("twitchv", twitchv);
    localStorage.setItem("snapchatv", snapchatv);
  }, [phonev, emailv, instagramv, youtubev, facebookv, tiktokv, discordv, twitterv, redditv, twitchv, snapchatv]);


  return (
    <div className="socials">
      
      <ToastContainer />
      <div className="socials__container" data-aos="fade-up" data-aos-easing="ease" data-aos-delay="250">
        <button
          className="reset__btn return" onClick={() => navigate('/dashboard')} >
          ↩ back
        </button>
        <h1 className="socials__title">Profile Settings</h1>
        <h2 className="socials__subtitle">Social Links</h2>
        <div className="social">
          <img src={phone} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Phone Number
            <input type="text" className="socials__textBox" placeholder="123-456-7890" value={phonev} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={email} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Email
            <input type="text" className="socials__textBox" placeholder="your@emailaddress.com" value={emailv} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={instagram} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Instagram
            <input type="text" className="socials__textBox" placeholder="username" value={instagramv} onChange={(e) => setInstagram(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={youtube} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Youtube
            <input type="text" className="socials__textBox" placeholder="https://youtube.com/channel/:channelID" value={youtubev} onChange={(e) => setYoutube(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={facebook} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Facebook
            <input type="text" className="socials__textBox" placeholder="https://facebook.com/pageUrl" value={facebookv} onChange={(e) => setFacebook(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={tiktok} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            TikTok
            <input type="text" className="socials__textBox" placeholder="@username" value={tiktokv} onChange={(e) => setTiktok(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={discord} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Discord
            <input type="text" className="socials__textBox" placeholder="username#1234" value={discordv} onChange={(e) => setDiscord(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={twitter} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Twitter
            <input type="text" className="socials__textBox" placeholder="username" value={twitterv} onChange={(e) => setTwitter(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={reddit} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Reddit
            <input type="text" className="socials__textBox" placeholder="https://www.reddit.com/user/username" value={redditv} onChange={(e) => setReddit(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={twitch} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Twitch
            <input type="text" className="socials__textBox" placeholder="https://twitch.tv/" value={twitchv} onChange={(e) => setTwitch(e.target.value)} />
          </div>
        </div>

        <div className="social">
          <img src={snapchat} className="social__icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            Snapchat
            <input type="text" className="socials__textBox" placeholder="https://snapchat.com/add/username" value={snapchatv} onChange={(e) => setSnapchat(e.target.value)} />
          </div>
        </div>

        <button
          className="login__btn" onClick={() => { handleSave(); notify() }} type="submit" style={{ width: '90%', marginTop: '50px', alignSelf: 'center' }}>
          Save
        </button>
      </div>
      <Canvas style={{position:'absolute', width: '100vh', height:'90vh', top:'0', right:'0'}}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[-2, 5, 0]} />
            <Sphere args={[1, 300, 200]} scale={2.4}>
              <MeshDistortMaterial
                color="#000"
                attach="material"
                distort={0.4}
                speed={1}
              />
            </Sphere>
          </Suspense>
        </Canvas>
        <Canvas style={{position:'absolute', width: '100vh', height:'100vh', bottom:'0', left:'0'}}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 5, 0]} />
            <Sphere args={[1, 300, 200]} scale={2.7}>
              <MeshDistortMaterial
                color="#000"
                attach="material"
                distort={0.2}
                speed={1}
              />
            </Sphere>
          </Suspense>
        </Canvas>
      <Footer className="Footer.socials" />
    </div>
  );
}
export default Socials;