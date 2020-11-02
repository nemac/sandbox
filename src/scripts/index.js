import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import SandboxControls from './SandboxControls';
import '../css/Sandbox.css';

function App() {
  return (
    <div>
      <SandboxControls />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
