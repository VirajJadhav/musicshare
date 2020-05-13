import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import {updateStatus} from "../Function"

const GreenRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PinkRadio = withStyles({
  root: {
    color: pink[400],
    '&$checked': {
      color: pink[600],
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
        <PinkRadio
            checked={selectedValue === 'Public'}
            onChange={handleChange}
            value="Public"
            name="Public"
            inputProps={{ 'aria-label': 'Public' }}
        />Public
    </div>
  );
}
