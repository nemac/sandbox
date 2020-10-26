import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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


export default function Selector(props) {
  const classes = useStyles();
  const items = props.items;

  const [item, setItem] = React.useState('');
  const handleChange = (event) => {
    setItem(event.target.value);
  };



 return (
     <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
       <InputLabel id="demo-simple-select-outlined-label">Region Based</InputLabel>
       <Select
         labelId="demo-simple-select-outlined-label"
         id="demo-simple-select-outlined"
         value={item}
         onChange={handleChange}
         label="Region Based"
       >
       <MenuItem value="">
          <em>None</em>
        </MenuItem>
       {items.map((name) => (
           <MenuItem key={name} value={name}>
             {name}
           </MenuItem>
         ))}
       </Select>
     </FormControl>
 );
}
