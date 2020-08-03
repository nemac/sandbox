import React from 'react';
//import logo from './logo.svg';
import chart_icon from './Sandbox_chart_icon.png'
import './App.css';

class SandboxControls extends React.Component {
    constructor(props) {
        super(props)
        console.log("SandboxControls object instantated.");
        this.name = "SandBoxControls"
    }

    render(){
        return (
            <div className="sandbox_controls">
                <div className="sandbox_header" >
                    <img height="30" src={chart_icon} />
                    <span>NCA Sandbox - Climate Chart</span>
                </div>
                <div className="sandbox_selectors">
                    <select className="loc_region_select" onClick={()=> this.locationSelectChanged()}>
                        <option className="no_select" value="">Location/Region</option>
                        <option value="national">National</option>
                        <option value="regions">Regional</option>
                        <option value="state">State</option>
                    </select>
                    <select className="loc_region_select" onClick={()=> this.variableSelectChanged()}>
                        <option className="no_select" value="">Climate variable</option>
                    </select>
                </div>
                <div className="sandbox_slider">
                </div>
            </div>
        );
    }

    locationSelectChanged(){
        console.log('SanboxControls.locationSelectChanged()');
    }
    variableSelectChanged(){
        console.log('SanboxControls.variableSelectChanged()');
    }

}


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
