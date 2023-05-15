import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../auth/firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import 'react-toastify/dist/ReactToastify.css';
import info from '../../images/info.jpg'
import { v4 as uuidv4 } from 'uuid';
import Footer from "../Footer";
import "./MyLink.css";

function MyLink() {
  const navigate = useNavigate();
  const [namev, setName] = useState(localStorage.getItem("namev") || "");
  const [subtitlev, setSubTitle] = useState(localStorage.getItem("subtitlev") || "");
  const [tokenv, setToken] = useState(localStorage.getItem("tokenv") || "");

  const notify = () =>
    toast.success("Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

  function handleSave() {
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, "userdata", uid);
    setDoc(
      docRef,
      {
        name: namev,
        subtitle: subtitlev,
        token: tokenv,
      },
      { merge: true }
    );
    console.log("Document updated with ID: ", uid);

    // Show a notification
    notify();
  }

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const uid = user.uid;
    const docRef = doc(db, "userdata", uid);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data.token && data.name && data.subtitle) {
            setName(data.name);
            setSubTitle(data.subtitle);
            setToken(data.token);
            console.log("Such document!");
          } else {
            console.log("No such document!");
            setDoc(
              docRef,
              {
                name: data.name || "Default Name",
                subtitle: data.subtitle || "Default Subtitle",
                token: data.token || uuidv4(),
              },
              { merge: true }
            );

            getDoc(docRef).then((doc) => {
              if (doc.exists) {
                setName(data.name);
                setSubTitle(data.subtitle);
                setToken(data.token);
              }
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  // Update the local storage values when the state values change
  useEffect(() => {
    localStorage.setItem("namev", namev);
    localStorage.setItem("subtitlev", subtitlev);
    localStorage.setItem("tokenv", tokenv);
  }, [namev, subtitlev, tokenv]);

  return (
    <div className="mylinks">
      <ToastContainer />
      <div className="rowContainer">
        <div className="mylink__container" data-aos="fade-up" data-aos-easing="ease" data-aos-delay="250">
          <button
            className="reset__btn return" onClick={() => navigate('/dashboard')} >
            ↩ back
          </button>
          <h1 className="socials__title">Edit Link</h1>

          <div className="mylink">
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              title
              <input type="text" className="socials__textBox mylink__textBox" placeholder="Test" value={namev} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="mylink">
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              subtitle
              <input type="text" className="socials__textBox mylink__textBox" placeholder="Welcome to my page" value={subtitlev} onChange={(e) => setSubTitle(e.target.value)} />
            </div>
          </div>

          <div className="mylink">
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              share id
              <div>
              <label className="socials__textBox mylink__textBox" placeholder="3" value={tokenv} onChange={(e) => setToken(e.target.value)}>ever-x.com/</label>
              <input type="text" className="socials__textBox mylink__textBox" style={{width: '65%'}} placeholder="3" value={tokenv} onChange={(e) => setToken(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="notice" >
            <img src={info} className="social__icon" style={{alignSelf:'center'}} />
            <p>To edit social links, go to <b>Profile Settings</b>. You can also use drag and drop to arrange the links sequence.</p>
          </div>

          <button
            className="login__btn" onClick={() => { handleSave(); }} type="submit" style={{ width: '95%', marginTop: '28px', alignSelf: 'center' }}>
            Save
          </button>
        </div>
        <div className="phoneFrame" />
        <Canvas style={{ position: 'absolute', width: '100vh', height: '90vh', top: '0', right: '0' }}>
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
        <Canvas style={{ position: 'absolute', width: '100vh', height: '100vh', bottom: '0', left: '0' }}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={1} />
            <directionalLight position={[2, 1, 0]} />
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
        
      </div>
      <Footer className="Footer.socials" />
    </div>
  );
}
export default MyLink;