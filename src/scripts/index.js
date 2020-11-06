import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import SandboxControls from './SandboxControls';

function App() {
  return (
    <div className="sandbox-holderofall">
      <SandboxControls />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
