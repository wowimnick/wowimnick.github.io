import React, { useEffect, useState, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logOut } from "../auth/firebase";
import { v4 as uuidv4 } from 'uuid';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { query, collection, getDocs, where, doc, setDoc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Fetch user data from firestore

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // Redirect to login if user is not logged in

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  // Create a new document in the collection "userdata"

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const uid = user.uid;
    const docRef = doc(db, "userdata", uid);

    // Check if document exists
    
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          console.log("Document already exists:", doc.data());
          setUserData(doc.data());
        } else {
          // Create document
          setDoc(
            docRef,
            {
              name: "My List",
              subtitle: "You can find my social media links here!",
              token: uuidv4(),
              phone: "",
              email: "",
              instagram: "",
              twitter: "",
              facebook: "",
              youtube: "",
              tiktok: "",
              snapchat: "",
              discord: "",
              reddit: "",
              twitch: "",
            },
            { merge: true }
          )
          .then(() => {
            console.log("Document created with ID:", uid);
          })
          .catch((error) => {
            console.error("Error creating document:", error);
          });
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, []);

  return (
    <div className="dashboard">
       <div className="dashboard__container">
       <div className="greeting">
        Welcome, <br /> {name} ✅</div>
        <div className="dashboard__btnContainer">
        <Link to={`../${userData?.token}`} className='button'>
            Your Page
            <div>📄</div>
          </Link>
          <Link to="/dashboard/link" className='button'>
            My Link
            <div>🔗</div>
          </Link>
          <Link to="/dashboard/socials" className='button'>
            Social Links
            <div>⮌</div>
          </Link>
        </div>
         <button className="dashboard__logout" onClick={logOut}>
          🚪Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;