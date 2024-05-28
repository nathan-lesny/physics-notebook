import React from 'react';
import logo from '../assets/BlockM.png';
import './landingpage.css';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <h1 className="center-text">Physics Interactive Notebook</h1>
      <p className="center-text">Created by Andrew Hope and Nathan Lesny</p>
      <header className="App-header"></header>
    </div>
  );
}

export default LandingPage;