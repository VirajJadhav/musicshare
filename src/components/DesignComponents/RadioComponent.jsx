import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import {updateStatus} from "../Function"

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


export default function RadioComponent(props) {
  const [selectedValue, setSelectedValue] = React.useState(props.songStatus);
  const handleChange = (event) => {
    const User = {
        email: props.email,
        name: props.songName,
        status: props.songStatus,
    }
    updateStatus(User).then(response => {
      if(response.result) {
        setSelectedValue(response.value);
        props.history.push('/')
        props.history.push('/profile')
      }
    })
      .catch(error => console.log(error))
  };

  return (
    <div>
        <GreenRadio
            checked={selectedValue === 'Private'}
            onChange={handleChange}
            value="Private"
            name="Private"
            inputProps={{ 'aria-label': 'Private' }}
        />Private
        <Radio
            checked={selectedValue === 'Public'}
            onChange={handleChange}
            value="Public"
            name="Public"
            inputProps={{ 'aria-label': 'Public' }}
        />Public
    </div>
  );
}
