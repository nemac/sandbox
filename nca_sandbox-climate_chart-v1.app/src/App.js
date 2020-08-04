import React from 'react';
//import logo from './logo.svg';
import chart_icon from './Sandbox_chart_icon.png'
import './App.css';
import SandboxControls from './SandboxControls.js'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://production-tcf.imgix.net/app/uploads/2016/02/06180621/2014-06-06-climate_change-2.png" alt="logo" width="500" />
        <br />
        <SandboxControls />
      </header>
    </div>
  );
}

export default App;
