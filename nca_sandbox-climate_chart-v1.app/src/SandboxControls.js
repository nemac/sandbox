import React from 'react';
//import logo from './logo.svg';
import chart_icon from './Sandbox_chart_icon.png'
import './App.css';
import DoubleSlider from './DoubleSlider.js'
import PlotRegion from './PlotRegion.js'
//import * as plot_data from './testPlotData.js';

import GeneratePlotData from './GeneratePlotData.js'

const plot_data = new GeneratePlotData();


const list_of_regions = [ "Northeast","Southeast","Midwest","Northern Great Plains",
    "Northwest","Southwest","Southern Great Plains","Alaska","Hawaii","Puerto Rico" ];
const list_of_states = [ "AL","AZ","AR","CA","CO","CT","DE","FL","GA","ID",
    "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO",
    "MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
    "RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AK",
    "HI","PR","VI"];




const axios = require('axios');


class SandboxControls extends React.Component {
    constructor(props) {
        super(props)
        console.log("SandboxControls object instantated.");
        this.name = "SandBoxControls"
        this.nca_data_index = {};
        this.selected_loc = "";
        this.selected_var = "";
        this.state = {
            plotly_data: [], plotly_layout: {}, plotly_frames: [], plotly_config: {}, 
            plotly_revision: 0,
            var_select_options : [],
            var_select_disabled : true,
            loc_sub_select_options : [],
            loc_sub_select_disabled : true,
            slider_min_value: 1900,
            slider_max_value: 2018,
        }
        this.sliderChanged = this.sliderChanged.bind(this);

    }

    sliderChanged(values){
        console.log('SanboxControls.sliderChanged()');
        if(values.length && values.length === 2){
            console.log('slider_min_value='+values[0]+' slider_max_value='+values[1]);
            this.setState({
                slider_min_value: values[0],
                slider_max_value: values[1],
            });

            let region_select =  document.getElementById("loc_region_select");
            let var_select =  document.getElementById("var_select");
            let region_sub_select =  document.getElementById("loc_sub_select");
            if(region_select.value === "national"){
                if(var_select && var_select.value !== ""){
                    this.updatePlotData();
                }
            }else if(region_select.value === "region" || region_select.value === "state"){
                if(var_select && var_select.value !== "" &&
                   region_sub_select && region_sub_select.value !== ""){
                    this.updatePlotData();
                }
            }





        }
                
    }

    render(){
        console.log("Rendering SandboxControls this.state=")
        console.log(this.state)
        let region_select =  document.getElementById("loc_region_select");
        let region_select_value = " -- ";
        if(region_select && region_select.value !== "" && region_select.value !== "national"){
            //region_select_value = region_select.value;
            // capitalize
            region_select_value = region_select.value.charAt(0).toUpperCase() + region_select.value.slice(1);
        }
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
                        <option value="region">Regional</option>
                        <option value="state">State</option>
                    </select>
                    <select id="var_select" disabled={this.state.var_select_disabled} onChange={()=>this.variableSelectChanged()}>
                        <option className="no_select" value="">Climate variable</option>;
                        {this.state.var_select_options}
                    </select>
                    <select style={{width: "170px"}} id="loc_sub_select" disabled={this.state.loc_sub_select_disabled} onChange={()=>this.locationSubSelectChanged()}>
                        <option className="no_select" value="">{ region_select_value }</option>
                        {this.state.loc_sub_select_options}
                    </select>
                </div>
                
                <div className="sandbox_slider">
                    <div className="sandbox_slider_center">
                        <div className="sandbox_slider_left_top"> Start Year/Period </div>
                        <div className="sandbox_slider_left_bottom" id="start_year">{this.state.slider_min_value}</div>

                        <DoubleSlider
                            sliderChanged={this.sliderChanged}
                            min_value={this.state.slider_min_value}
                            max_value={this.state.slider_max_value}
                        />

                        <div className="sandbox_slider_right_top"> End Year/Period </div>
                        <div className="sandbox_slider_right_bottom" id="end_year">{this.state.slider_max_value}</div>
                    </div>
                </div>
                <PlotRegion
                    plotly_data={this.state.plotly_data} 
                    plotly_layout={this.state.plotly_layout} 
                    plotly_frames={this.state.plotly_frames} 
                    plotly_config={this.state.plotly_config} 
                    plotly_revision={this.state.plotly_revision}
                />

            </div>
        );
    }

    // This function loads the 'index.json' file into 'this.nca_data_index'
    // Then it calls "this.populateVariableSelect()"
    // This is only called when the 'Location/Region' selector is changed
    // and the json data has not been loaded yet
    loadNCAdata(){
        
        axios.get("./TSU_Sandbox_Datafiles/index.json")
          .then( (response)=>{
            // handle success
            console.log('SanboxControls.loadNCADdata() response='+response);
            console.log(response);
            //
            //this.nca_data = JSON.parse(response);
            this.nca_data_index = response.data;

            // finally call function to process data
            this.populateVariableSelect();
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
        // clear it out
        // populate from data
        if( Object.keys(this.nca_data_index).length > 0){
            // data already loaded, proceed synchronously
            this.populateVariableSelect();
        }else{
            // load data, then call 'this.populateVariableSelect' asynchronously
            this.loadNCAdata();
        }
        console.log("region_select.value="+region_select.value)
        if(region_select.value === ""){
            this.setState((state)=>({
                    plotly_data: [],
                    plotly_layout: {},
                    plotly_revision: state.plotly_revision+1,
                    var_select_options : [],
                    var_select_disabled : true,
                    loc_sub_select_options : [],
                    loc_sub_select_disabled : true,
            }));
        }else if(region_select.value === "national"){
            if(var_select && var_select.value !== ""){
                this.updatePlotData();
                this.setState((state)=>({
                        loc_sub_select_options : [],
                        loc_sub_select_disabled : true,
                }));
            }else{
                // no value, clear plot
                this.setState((state)=>({
                        plotly_data: [],
                        plotly_layout: {},
                        plotly_revision: state.plotly_revision+1,
                        loc_sub_select_options : [],
                        loc_sub_select_disabled : true,
                }));
            }
        }else if(region_select.value === "region"){
            let region_options = list_of_regions.map((item,index)=>
                <option key={"region_select_options"+index} value={item}>{item}</option>
                );
            console.log('region_options');
            console.log(region_options);
            this.setState((state)=>({
                    plotly_data: [],
                    plotly_layout: {},
                    plotly_revision: state.plotly_revision+1,
                    loc_sub_select_options : region_options,
                    loc_sub_select_disabled : false,
            }));
        }else if(region_select.value === "state"){
            let state_options = list_of_states.map((item,index)=>
                <option key={"region_select_options"+index} value={item}>{item}</option>
                );
            console.log('state_options');
            console.log(state_options);
            this.setState((state)=>({
                    plotly_data: [],
                    plotly_layout: {},
                    plotly_revision: state.plotly_revision+1,
                    loc_sub_select_options : state_options,
                    loc_sub_select_disabled : false,
            }));
        }
    }


    // Put all the optios in the 'Climate Varible' selector, based on the 'Location/Region'
    // selector
    populateVariableSelect(){
        console.log('SanboxControls.populateVariableSelect()');
        let region_select =  document.getElementById("loc_region_select");
        let loc_value = region_select.value;
        if(loc_value === "region"){ loc_value="regions";} //TODO: fix
        this.selected_loc = loc_value;
        console.log('loc_value='+loc_value);
        console.log('nca_data_index=');
        console.log(this.nca_data_index);
        let data_subset = this.nca_data_index[loc_value];
        console.log('data_subset=');
        console.log(data_subset);
        if(data_subset){
            this.setState({
                var_select_options: data_subset.map((item,index)=>
                    <option key={"var_select_option"+index} value={item.type}>{item.type}</option>
                ),
                var_select_disabled: false
            });
        }else{
            this.setState({
                var_select_options: [],
                var_select_disabled: true
            });
        }
        
    }


    updatePlotData(){
        console.log("setState(data) = ");
        console.log(plot_data.data);

        plot_data.setXRange(this.state.slider_min_value, this.state.slider_max_value);

        this.setState((state)=>({
            plotly_revision: state.plotly_revision+1,
            //plotly_data: plot_data.data, 
            //plotly_layout: plot_data.layout
            plotly_data: plot_data.getData(), 
            plotly_layout: plot_data.getLayout()
        }));
    }


    variableSelectChanged(){
        console.log('SanboxControls.variableSelectChanged()');
        let region_select =  document.getElementById("loc_region_select");
        let var_select =  document.getElementById("var_select");
        let region_sub_select =  document.getElementById("loc_sub_select");


        if(!var_select || var_select.value === ""){
            // no value, clear plot
            this.setState((state)=>({
                    plotly_data: [],
                    plotly_layout: {},
                    plotly_revision: state.plotly_revision+1,
            }));
        } else if(region_select.value === "national"){
            this.updatePlotData();
        }else if(region_select.value === "region"){
            if(region_sub_select && region_sub_select.value !== ""){
                this.updatePlotData();
            }else{
                // no value, clear plot
                this.setState((state)=>({
                        plotly_data: [],
                        plotly_layout: {},
                        plotly_revision: state.plotly_revision+1,
                }));
            }
        }else if(region_select.value === "state"){
            if(region_sub_select && region_sub_select.value !== ""){
                this.updatePlotData();
            }else{
                // no value, clear plot
                this.setState((state)=>({
                        plotly_data: [],
                        plotly_layout: {},
                        plotly_revision: state.plotly_revision+1,
                }));
            }
        }
    }

    // Get called with the 3rd selector is changed
    locationSubSelectChanged(){
        console.log('SanboxControls.locationSubSelectChanged()');
        let region_select =  document.getElementById("loc_region_select");
        let var_select =  document.getElementById("var_select");
        let region_sub_select =  document.getElementById("loc_sub_select");

        if(!region_sub_select || region_sub_select.value === ""){
            // no value, clear plot
            this.setState((state)=>({
                    plotly_data: [],
                    plotly_layout: {},
                    plotly_revision: state.plotly_revision+1,
            }));
        //} else if(region_select.value === "national"){
        //    this.updatePlotData();
        }else if(region_select.value === "region"){
            if(var_select && var_select.value !== ""){
                this.updatePlotData();
            }else{
                // no value, clear plot
                this.setState((state)=>({
                        plotly_data: [],
                        plotly_layout: {},
                        plotly_revision: state.plotly_revision+1,
                }));
            }
        }else if(region_select.value === "state"){
            if(var_select && var_select.value !== ""){
                this.updatePlotData();
            }else{
                // no value, clear plot
                this.setState((state)=>({
                        plotly_data: [],
                        plotly_layout: {},
                        plotly_revision: state.plotly_revision+1,
                }));
            }
        }
    }






}

export default SandboxControls;
