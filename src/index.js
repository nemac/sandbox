import React from "react";
import ReactDOM from "react-dom";
import '@babel/polyfill'
import SandboxControls from './SandboxControls.js'
import './Sandbox.css';

const App = () => {
  return (
    <div>
      <SandboxControls />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));