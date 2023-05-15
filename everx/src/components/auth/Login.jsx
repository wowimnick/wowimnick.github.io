import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../../images/googlelogo.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Reset from "./Reset";
import "./Login.css";

AOS.init();


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [resetVisible, setResetVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const handleResetClick = () => {
    setResetVisible(true);
  }
  
  return (
    <div className="login" data-aos="fade-up" data-aos-easing="ease">
      
      <h1>EverX</h1>
      
      <div className="login__container">
      <p style={{color:'lightgray', marginBottom:'25px'}}>Sign In with:</p>
      <button className="login__btn login__google" onClick={signInWithGoogle}>
        <img className="logo" src={logo}/> Google
      </button>

        <p style={{color:'lightgray', marginBottom:'25px'}}>or</p>
        
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Sign In
        </button>
        
        <button className="reset__btn login__btn" onClick={handleResetClick}>
          Forgot Password?
        </button>
          <Link to="/register" className="reset__btn login__btn">Register</Link>
      </div>
      {resetVisible && <Reset setResetVisible={setResetVisible} />}
    </div>
  );
}
export default Login;