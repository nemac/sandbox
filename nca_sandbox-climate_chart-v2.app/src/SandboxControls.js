import React from 'react';
import './App.css';
import DoubleSlider from './DoubleSlider.js'
import PlotRegion from './PlotRegion.js'
import GeneratePlotData from './GeneratePlotData.js'

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import blueGrey from '@material-ui/core/colors/blueGrey';

import Slider from '@material-ui/core/Slider';
import Selector from './Selector.js';
import SandboxDataCheck from './SandboxDataCheck.js';
import Divider from '@material-ui/core/Divider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
library.add(faChartLine);


const list_of_regions = [ "Northeast","Southeast","Midwest","Northern Great Plains",
    "Northwest","Southwest","Southern Great Plains","Alaska","Hawaii","Puerto Rico" ];
const list_of_states = [ "AL","AZ","AR","CA","CO","CT","DE","FL","GA","ID",
    "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO",
    "MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA",
    "RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AK",
    "HI","PR","VI"];

const axios = require('axios');

const bgChart = blueGrey[100];
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      overflow: 'scroll',
    },
  },
  header: {
    height: '60px',
    maxHeight: '80px',
  },
  headerIcon: {
    display: 'inline-flex',
  },
  varriableSelectors: {
    height: '90px',
    maxHeight: '90px',
  },
  checkBox: {
    height: '90px',
    maxHeight: '90px',
  },
  yearSlider: {
    height: '75px',
    maxHeight: '75px',
  },
  chartRegion: {
    height: 'calc(100% - 225px)',
    [theme.breakpoints.down('xs')]: {
      height: '225px',
    },
  },
  chartBg: {
    backgroundColor: bgChart,
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function SandboxControls() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="flex-start" direction={"row"} className={classes.root}>

        <Grid item xs={12} className={classes.header} width="100%" >
          <Box fontWeight="fontWeightBold" m={1} p={1} display="flex" flexWrap="nowrap" justifyContent="flex-start">
            <Box px={1} color="text.secondary" fontSize="h4.fontSize" className={classes.headerIcon}>
              <FontAwesomeIcon icon={["fas", "chart-line"]} />
            </Box>
            <Box px={1} color="text.secondary" fontSize="h5.fontSize">NCA Sandbox - Climate Charts</Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
            <Selector items={['test1', 'test2', 'test3']}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
            <Selector items={['test4', 'test5', 'test6']}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
            <Selector items={['test7', 'test8', 'test9']}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" ml={2}  display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" className={classes.checkBox}>
            <SandboxDataCheck />
          </Box>
        </Grid>

        <Grid item xs={12}  className={classes.yearSlider}>
          <Box fontWeight="fontWeightBold" p={2} display="flex" flexDirection="row" flexWrap="nowrap" flex={0} flexGrow={0} flexShrink={0}>
            <Slider
              value={value}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              color="primary"
              />
          </Box>
        </Grid>

        <Grid item xs={12}  display="flex"  flex={1} className={classes.chartRegion}>
          <Divider variant="middle" />
          <Box className={classes.chartBg} fontWeight="fontWeightBold" m={2} p={2} display="flex" flexDirection="row" justifyContent="center" flex={1} flexGrow={3} height="90%" >
            Chart Goes Here
          </Box>
        </Grid>

      </Grid>
    </div>
  );
}


//
// // const classes = useStyles();
//
// // console.log('useStyles', useStyles)
// class SandboxControls extends React.Component {
//     constructor(props) {
//         super(props)
//         // console.log("SandboxControls object instantated.");
//
//
//         this.loadNCAdata();
//
//
//         this.name = "SandBoxControls";
//         let w = window.innerWidth - 48;
//         let h = window.innerHeight - 210;
//         this.nca_data_index = {};
//         this.selected_var = "";
//         this.plotly_data = [];
//         this.plotly_layout = {};
//         this.plotly_frames = [];
//         this.plotly_config = {};
//         this.plotly_revision = 0;
//         this.region_sub_select_options  = [];
//         this.region_sub_select_disabled  = true;
//         this.var_select_options  = [];
//         this.var_select_disabled = true;
//         this.state = {
//             plotly_width : w,
//             plotly_height : h,
//             region_select_value: undefined,
//             region_sub_select_value: undefined,
//             var_select_value: undefined,
//             slider_min_value: 1900,
//             slider_max_value: 2018,
//             RobustDatasetCheckboxChecked: false,
//             cached_data: {
//                            xvals: [],
//                            yvals: {},
//                            region: "",
//                            varible: "",
//                            region_sub: "",
//                            _loaded: false
//                          }
//
//         }
//         this.sliderChanged = this.sliderChanged.bind(this);
//         this.RobustDatasetCheckboxChanged = this.RobustDatasetCheckboxChanged.bind(this);
//         this.PlotRegionResize = this.PlotRegionResize.bind(this);
//     }
//
//
//
//     render(){
//         // console.log("Rendering SandboxControls this.state=")
//         // console.log(this.state)
//         let region_select =  document.getElementById("region_select");
//         let region_select_value = " -- ";
//         if(region_select && region_select.value !== "" && region_select.value !== "national"){
//             //region_select_value = region_select.value;
//             // capitalize
//             region_select_value = region_select.value.charAt(0).toUpperCase() + region_select.value.slice(1);
//         }
//
//         // update from state
//         this.populateSubSelect();
//         this.populateVariableSelect();
//         this.updatePlotData();
//
//
//         return (
//             <div >
//                 <div className="sandbox_header" >
//                     <FontAwesomeIcon icon={["fas", "chart-line"]}
//                         color="#666666"
//                         size="2x"
//                     />
//                     <span>NCA Sandbox - Climate Chart</span>
//                 </div>
//                 <div className="sandbox_selectors">
//                     <select id="region_select" value={this.loc_select_value} onChange={()=>this.regionSelectChanged()}>
//                         <option className="no_select" value="">Location/Region</option>
//                         <option value="national">National</option>
//                         <option value="region">Regional</option>
//                         <option value="state">State</option>
//                     </select>
//                     <select style={{width: "170px"}} id="region_sub_select" value={this.state.region_sub_select_value} disabled={this.region_sub_select_disabled} onChange={()=>this.regionSubSelectChanged()}>
//                         <option className="no_select" value="">{ region_select_value }</option>
//                         {this.region_sub_select_options}
//                     </select>
//                     <select id="var_select" value={this.state.var_select_value} disabled={this.var_select_disabled} onChange={()=>this.variableSelectChanged()}>
//                         <option className="no_select" value="">Climate variable</option>
//                         {this.var_select_options}
//                     </select>
//                     <FormControlLabel
//                         className="RobustCheckbox"
//                         style={{marginLeft: "0px"}}
//                         control={
//                           <Checkbox
//                             checked={this.state.RobustDatasetCheckboxChecked}
//                             onChange={this.RobustDatasetCheckboxChanged}
//                             color="primary"
//                           />
//                         }
//                         label='Use Robust Dataset'
//                     />
//
//
//
//                 </div>
//
//                 <div className="sandbox_slider_outerbox">
//                     <div className="sandbox_slider_center">
//                         <div className="sandbox_slider_left_top"> Start Year/Period </div>
//                         <div className="sandbox_slider_left_bottom" id="start_year">{this.state.slider_min_value}</div>
//
//                         <div className="sandbox_double_slider_container">
//                             <DoubleSlider
//                                 sliderChanged={this.sliderChanged}
//                                 min_value={this.state.slider_min_value}
//                                 max_value={this.state.slider_max_value}
//                             />
//                         </div>
//
//                         <div className="sandbox_slider_right_top"> End Year/Period </div>
//                         <div className="sandbox_slider_right_bottom" id="end_year">{this.state.slider_max_value}</div>
//                     </div>
//                 </div>
//                 <PlotRegion
//                     plotly_data={this.plotly_data}
//                     plotly_layout={this.plotly_layout}
//                     plotly_width={this.state.plotly_width}
//                     plotly_height={this.state.plotly_height}
//                     plotly_frames={this.plotly_frames}
//                     plotly_config={this.plotly_config}
//                     plotly_revision={this.plotly_revision}
//                     handleResize={this.PlotRegionResize}
//                 />
//
//             </div>
//         );
//     }
//
//
//     populateSubSelect(){
//
//         if(this.state.region_select_value === "region"){
//             let region_options = list_of_regions.map((item,index)=>
//                 <option key={"region_select_options"+index} value={item}>{item}</option>
//                 );
//             // console.log('region_options');
//             // console.log(region_options);
//             this.region_sub_select_options = region_options;
//             this.region_sub_select_disabled = false;
//         }else if(this.state.region_select_value === "state"){
//             let state_options = list_of_states.map((item,index)=>
//                 <option key={"region_select_options"+index} value={item}>{item}</option>
//                 );
//             // console.log('state_options');
//             // console.log(state_options);
//             this.region_sub_select_options = state_options;
//             this.region_sub_select_disabled = false;
//         }else{
//             this.region_sub_select_options = [];
//             this.region_sub_select_disabled = true;
//         }
//     }
//
//
//     // Put all the options in the 'Climate Varible' selector, based on the 'Location/Region'
//     // selector
//     populateVariableSelect(){
//         let robustData = this.state.RobustDatasetCheckboxChecked;
//         // console.log('SanboxControls.populateVariableSelect()');
//         let loc_value = this.state.region_select_value;
//         if(loc_value === "region"){ loc_value="regions";} //TODO: fix
//         // console.log('loc_value='+loc_value);
//
//         // If we change the dataset, try to keep the same option name selected,
//         // but need to change the value to the value from the corresponding dataset
//         // i.e. "1 inch" in the 1900 set, to "1 inch" in the 1950 set.
//         let var_select =  document.getElementById("var_select");
//         let var_selected_text = undefined;
//         if(var_select){
//             // console.log('var_select.value='+var_select.value);
//             if(this.var_select_value !== ""){
//                 var_selected_text = var_select[var_select.selectedIndex].innerHTML;
//             }
//             // console.log('var_selected_text='+var_selected_text);
//         }
//
//         // console.log('nca_data_index=');
//         // console.log(this.nca_data_index);
//         let data_subset = this.nca_data_index[loc_value];
//         // console.log('data_subset=');
//         // console.log(data_subset);
//         let var_select_value = undefined;
//         if(data_subset){
//             // filter out by "Use Robust Dataset"
//             let var_select_options = [];
//             for(let i=0;i<data_subset.length;i++){
//
//                 let opt = <option key={"var_select_option"+i} value={data_subset[i].name}>{data_subset[i].type}</option>
//
//                 if( data_subset[i].start === 1950 && robustData ){
//                     var_select_options.push(opt);
//                 }else if(data_subset[i].start === 1900 && !robustData ){
//                     var_select_options.push(opt);
//                 }else{
//                     console.log("Excluding "+i+" start="+data_subset[i].start);
//                     continue;
//                 }
//                 if(var_selected_text !== undefined && var_selected_text === data_subset[i].type){
//                     var_select_value = data_subset[i].name;
//                     console.log("Found var_select_value="+var_select_value+" var_selected_text="+var_selected_text+" this.state.var_select_value="+this.state.var_select_value+"  i="+i);
//
//                 }
//
//             }
//             // console.log("var_select_options=");
//             // console.log(var_select_options);
//             this.var_select_options= var_select_options;
//             this.var_select_disabled= false;
//             // if we changed from 1900 to 1950 (robust) dataset, we need up update var_select_value.
//             // Node, calling setState here can cause an infinite loop.
//             if( this.state.var_select_value !==  var_select_value){
//                 // console.log("Updating var_select_value="+var_select_value+"  this.state.var_select_value="+this.state.var_select_value);
//                 this.setState({
//                     var_select_value: var_select_value,
//                 });
//             }
//         }else{
//             this.var_select_options= [];
//             this.var_select_disabled= true;
//         }
//
//     }
//
//     // This function loads the 'index.json' file into 'this.nca_data_index'
//     // Then it calls "this.populateVariableSelect()"
//     // This is only called when the 'Location/Region' selector is changed
//     // and the json data has not been loaded yet
//     loadNCAdata(){
//
//         axios.get("./TSU_Sandbox_Datafiles/index.json")
//           .then( (response)=>{
//             // handle success
//             // console.log('SanboxControls.loadNCADdata() response='+response);
//             // console.log(response);
//             //
//             this.nca_data_index = response.data;
//
//           })
//           .catch((error)=>{
//             // handle error
//             // console.log('SanboxControls.loadNCADdata() error='+error);
//           })
//
//     }
//
//     parseNCAFile(data, type, region){
//         let xvals = [];
//         let yvals = [];
//         let lines = data.split(/\r?\n/);
//         let headers = lines[0].split(',');
//         // console.log('headers='+headers);
//         for(let h=0;h<headers.length;h++){
//             headers[h] = headers[h].trim();
//         }
//         let col_index = undefined;
//         if(type === "national"){
//             col_index = 1;
//         }else if(type === "region" || type === "state"){
//             for(let h=1;h<headers.length;h+=2){
//                 if(headers[h] === region){
//                     col_index = h;
//                     break;
//                 }
//             }
//         }
//         console.log('region='+region);
//         // console.log('col_index='+col_index);
//
//         for(let i=1;i<lines.length;i++){
//             // console.log('lines['+i+']='+lines[i]);
//             let elements = lines[i].split(',');
//             //console.log('elements.length='+elements.length);
//             if(elements.length <= 1){
//                 break;
//             }
//             let xval = parseInt(elements[0]);
//             let yval = parseFloat(elements[col_index]);
//             //console.log('xval='+xval+' yval='+yval);
//             xvals.push(xval);
//             yvals.push(yval);
//         }
//
//
//         return [xvals, yvals];
//     }
//
//     updatePlotData(){
//         // console.log('SanboxControls.updatePlotData()');
//         // console.log('region_select='+this.state.region_select_value);
//         // console.log('var_select='+this.state.var_select_value);
//         // console.log('region_sub_select='+this.state.region_sub_select_value);
//
//
//         if( (this.state.region_select_value === undefined) ||
//             (this.state.var_select_value === undefined) ||
//             ( (this.state.region_select_value === "region" ||
//                this.state.region_select_value === "state" )
//               &&
//               (this.state.region_sub_select_value === undefined ||
//                this.state.region_sub_select_value === "")
//             )
//             ){
//             // console.log('not plotting');
//             this.plotly_data= [];
//             this.plotly_layout= {};
//             this.plotly_revision= this.plotly_revision+1;
//             if(isNaN(this.plotly_revision)){console.log("= ERROR, revision is NaN");}
//
//
//         }else if( this.state.cached_data._loaded &&
//             (this.state.region_select_value === this.state.cached_data.region) &&
//             (this.state.var_select_value === this.state.cached_data.varible) &&
//             (this.state.region_sub_select_value === this.state.cached_data.region_sub) ){
//             // use cached data
//             // console.log('Using Cached data');
//             let plot_data = new GeneratePlotData(this.state.cached_data.xvals,
//                                                  this.state.cached_data.yvals);
//             plot_data.setXRange(this.state.slider_min_value, this.state.slider_max_value);
//
//             this.plotly_data = plot_data.getData();
//             this.plotly_layout= plot_data.getLayout();
//             this.plotly_revision= this.plotly_revision+1;
//             if(isNaN(this.plotly_revision)){console.log("= ERROR, revision is NaN");}
//         }else{
//             // fetch .txt data from the server, parse, add to cache
//             //let filename = "./TSU_Sandbox_Datafiles/national1inch_1900_2018_Sandbox.txt"
//             let filename = "./TSU_Sandbox_Datafiles/"+this.state.var_select_value;
//             console.log('fetching file from server. filename='+filename);
//             axios.get(filename)
//                 .then( (response)=>{
//                         console.log('SanboxControls.updatePlotData() response=');
//                         console.log(response);
//                         let xy_values = this.parseNCAFile(response.data, this.state.region_select_value, this.state.region_sub_select_value);
//                         let xvals = xy_values[0];
//                         let yvals = xy_values[1];
//
//                         this.setState((state)=>({
//                             cached_data: {
//                                 _loaded: true,
//                                 xvals: xvals,
//                                 yvals: yvals,
//                                 region: state.region_select_value,
//                                 varible: state.var_select_value,
//                                 region_sub: state.region_sub_select_value
//                             },
//                         }));
//
//                     })
//                 .catch( (error)=>{
//                         // console.log('SanboxControls.updatePlotData() error='+error)
//                     })
//
//         }
//     }
//
//
//     sliderChanged(values){
//         // console.log('SanboxControls.sliderChanged(values='+values+')');
//         if(values.length && values.length === 2){
//             // console.log('slider_min_value='+values[0]+' slider_max_value='+values[1]);
//             this.setState({
//                 slider_min_value: values[0],
//                 slider_max_value: values[1],
//             });
//         }
//
//     }
//
//
//     PlotRegionResize(){
//         let h = window.innerHeight - 210;
//         let w = window.innerWidth - 48;
//         if(window.innerWidth < 949){
//             h -= 29;
//         }
//         // console.log("SanboxControls.PlotRegionResize() height="+h+" width="+w);
//         this.setState((state)=>({
//             plotly_width : w,
//             plotly_height : h,
//         }));
//     }
//
//     RobustDatasetCheckboxChanged(){
//         // console.log("RobustDatasetCheckboxChanged() this.state.RobustDatasetCheckboxChecked="+this.state.RobustDatasetCheckboxChecked);
//         this.setState((state)=>({
//             RobustDatasetCheckboxChecked : ! state.RobustDatasetCheckboxChecked
//         }));
//     }
//
//     // Gets called when 'Location/Region' selector is changed
//     regionSelectChanged(){
//         // console.log('SanboxControls.regionSelectChanged()');
//         let region_select =  document.getElementById("region_select");
//
//         this.setState((state)=>({
//             region_select_value: region_select.value,
//             region_sub_select_value: ""
//         }));
//     }
//     variableSelectChanged(){
//         // console.log('SanboxControls.variableSelectChanged()');
//         let var_select =  document.getElementById("var_select");
//
//         this.setState((state)=>({
//             var_select_value: var_select.value
//         }));
//
//     }
//
//     // Get called with the 3rd selector is changed
//     regionSubSelectChanged(){
//         // console.log('SanboxControls.regionSubSelectChanged()');
//         let region_sub_select =  document.getElementById("region_sub_select");
//
//         this.setState((state)=>({
//             region_sub_select_value: region_sub_select.value
//         }));
//     }
//
// }
//
// export default SandboxControls;
