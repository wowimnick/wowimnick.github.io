import Navbar from './components/Navbar';
import Title from './components/Title';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Link from './components/dashboard/MyLink';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import Socials from './components/dashboard/Social';
import TokenSite from './components/dashboard/TokenSite';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="" element={<><div className='background' /><Title /><Navbar /><Footer /></>} />
          <Route exact path="/login" element={<><div className='background' /><Login /><Footer /></>} />
          <Route exact path="/register" element={<><div className='background' /><Register /><Footer /></>} />
          <Route exact path="/dashboard" element={<><div className='background' /><Dashboard /><Footer /></>} />
          <Route exact path="/dashboard/link" element={<><Link /></>} />
          <Route exact path="/dashboard/socials" element={<><Socials /></>} />
          <Route path="/:token" element={<><div className='background' /><TokenSite /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
