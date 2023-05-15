import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../images/googlelogo.png'
import AOS from 'aos';
import './Register.css';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading]);
  return (
    <div className="register" data-aos="fade-up" data-aos-easing="ease">
      <h1>EverX</h1>
      <div className="register__container">
        <p style={{ color: 'lightgray', marginBottom: '25px' }}>Register with:</p>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          <img className="logo" src={logo} /> Google
        </button>
        <p style={{ color: 'lightgray', marginBottom: '25px' }}>or</p>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="full name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <br />
        Already have an account?
        <div>

          <Link to="/login" className="already__btn">Login</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;