import React from 'react';
//import logo from './logo.svg';
import chart_icon from './Sandbox_chart_icon.png'
import './App.css';
import DoubleSlider from './DoubleSlider.js'
import PlotRegion from './PlotRegion.js'
const axios = require('axios');


class SandboxControls extends React.Component {
    constructor(props) {
        super(props)
        console.log("SandboxControls object instantated.");
        this.name = "SandBoxControls"
        this.nca_data_index = {};
        this.selected_loc = "";
        this.selected_var = "";
    }

    render(){
        return (
            <div className="sandbox_controls">
                <div className="sandbox_header" >
                    <img height="30" src={chart_icon} alt="NCA icon" />
                    <span>NCA Sandbox - Climate Chart</span>
                </div>
                <div className="sandbox_selectors">
                    <select id="loc_region_select" onChange={()=>this.locationSelectChanged()}>
                        <option className="no_select" value="">Location/Region</option>
                        <option value="national">National</option>
                        <option value="regions">Regional</option>
                        <option value="state">State</option>
                    </select>
                    <select id="var_select" disabled onChange={()=>this.variableSelectChanged()}>
                        <option className="no_select" value="">Climate variable</option>
                    </select>
                    <select style={{width: "170px"}} id="loc_sub_select" disabled onChange={()=>this.locationSubSelectChanged()}>
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
                <PlotRegion />

            </div>
        );
    }

    // This function loads the 'index.json' file into 'this.nca_data_index'
    // Then it calls "this.populateVariableSelect()"
    // This is only called when the 'Location/Region' selector is changed
    // and the json data has not been loaded yet
    loadNCAdata(loc_value){
        
        axios.get("./TSU_Sandbox_Datafiles/index.json")
          .then( (response)=>{
            // handle success
            console.log('SanboxControls.loadNCADdata() response='+response);
            console.log(response);
            //
            //this.nca_data = JSON.parse(response);
            this.nca_data_index = response.data;

            // finally call function to process data
            this.populateVariableSelect(loc_value);
          })
          .catch((error)=>{
            // handle error
            console.log('SanboxControls.loadNCADdata() error='+error);
          })
          //.then(function () {
            // always executed
          //});


    }

    // Gets called when 'Location/Region' selector is changed
    locationSelectChanged(){
        console.log('SanboxControls.locationSelectChanged()');
        let region_select =  document.getElementById("loc_region_select");
        let var_select =  document.getElementById("var_select");
        console.log('region_select.value = ' + region_select.value);
        var_select.disabled = true;
        // clear it out
        this.clearVariableSelect();
        // populate from data
        if( Object.keys(this.nca_data_index).length > 0){
            // data already loaded, proceed synchronously
            this.populateVariableSelect(region_select.value);
        }else{
            // load data, then call 'this.populateVariableSelect' asynchronously
            this.loadNCAdata(region_select.value);
            
        }
    }

    // Get called with the 3rd selector is changed
    locationSubSelectChanged(){
        console.log('SanboxControls.locationSubSelectChanged()');
    }

    // Put all the optios in the 'Climate Varible' selector, based on the 'Location/Region'
    // selector
    populateVariableSelect(loc_value){
        console.log('SanboxControls.populateVariableSelect('+loc_value+')');
        let var_select =  document.getElementById("var_select");
        let data_subset = this.nca_data_index[loc_value];
        if(!data_subset){ return;} // check for empty value
        for(let i=0; i<data_subset.length; i++){
            let el = document.createElement("option");
            el.textContent = data_subset[i].type;
            el.value = data_subset[i].type;
            var_select.appendChild(el);
        }

        // enable selector
        var_select.disabled = false;
        // save the selection
        this.selected_loc = loc_value;
    }

    // remove all but the first option from the 'Climate Varible' selector
    clearVariableSelect(){
        console.log('SanboxControls.clearVariableSelect()');
        let var_select =  document.getElementById("var_select");
        for(let i=var_select.length-1; i>=1; i--){
            var_select.remove(i);
        }
    }



    variableSelectChanged(){
        console.log('SanboxControls.variableSelectChanged()');
        let region_select =  document.getElementById("loc_region_select");
        let var_select =  document.getElementById("var_select");
        let region_sub_select =  document.getElementById("loc_sub_select");

        if(var_select.value === ""){ return; } // shortcircuit if empty

        if(region_select.value !== "national"){
            alert("Currently only 'National' is supported");
            return
        }


        let plotly_div = document.getElementById("plotly-div"); 
        let el = document.createElement("img");
        el.width = "750";
        el.height = "400";
        el.src = "./nc-state-rain-3inch-plot.png"

        plotly_div.appendChild(el)


    }



}

export default SandboxControls;
