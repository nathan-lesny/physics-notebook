import React from 'react';
import logo from './assets/BlockM.png';
import Box from './Box';
import SampleGraph from './SampleGraph';

function LandingPage() {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <h1>Physics Interactive Notebook</h1>
      <SampleGraph />
      <header className="App-header"></header>
    </div>
  );
}

export default LandingPage;