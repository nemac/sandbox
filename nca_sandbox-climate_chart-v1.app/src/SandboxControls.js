import React from 'react';
//import logo from './logo.svg';
import chart_icon from './Sandbox_chart_icon.png'
import './App.css';
import DoubleSlider from './DoubleSlider.js'

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
                    <select disabled className="loc_region_select" onClick={()=> this.variableSelectChanged()}>
                        <option className="no_select" value="">Climate variable</option>
                    </select>
                </div>
                
                <div className="sandbox_slider">
                    <div className="sandbox_slider_center">
                        <div className="sandbox_slider_left_top"> Start Year/Period </div>
                        <div className="sandbox_slider_left_bottom" id="start_year">1950</div>

                        <DoubleSlider />

                        <div className="sandbox_slider_right_top"> End Year/Period </div>
                        <div className="sandbox_slider_right_bottom" id="end_year">2018</div>
                    </div>
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

export default SandboxControls;
