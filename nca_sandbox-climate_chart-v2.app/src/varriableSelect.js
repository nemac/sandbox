import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
 formControl: {
   margin: theme.spacing(1),
   minWidth: 120,
 },
 selectEmpty: {
   marginTop: theme.spacing(2),
 },
}));

// Put all the optios in the 'Climate Varible' selector, based on the 'Location/Region'
// selector
const varibles = () => {
    let region_select =  document.getElementById("loc_region_select");
    let loc_value = region_select.value;
    if(loc_value === "region"){ loc_value="regions";} //TODO: fix
    this.selected_loc = loc_value;

    let data_subset = this.nca_data_index[loc_value];

    if(data_subset){
        this.setState({
            var_select_options: data_subset.map((item,index)=>
                <option key={"var_select_option"+index} value={item.name}>{item.type}</option>
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


export default function SimpleSelect(props) {
  const classes = useStyles();
  // const [region] = React.useState('');
  const region = props.region;

  // const state = React.useState();

  console.log('props', region)
  const handleChange = (event) => {
    // setAge(event.target.value);
  };



 return (
   <div>
     <FormControl variant="outlined" className={classes.formControl}>
       <InputLabel id="demo-simple-select-outlined-label">Climate Varible</InputLabel>
       <Select
         labelId="demo-simple-select-outlined-label"
         id="demo-simple-select-outlined"
         value={10}
         onChange={handleChange}
         label="Climate Varible"
       >
         <MenuItem value="">
           <em>Climate Varible</em>
         </MenuItem>
         <MenuItem value={10}>Ten</MenuItem>
         <MenuItem value={20}>Twenty</MenuItem>
         <MenuItem value={30}>Climate Varible</MenuItem>
       </Select>
     </FormControl>
   </div>
 );
}
