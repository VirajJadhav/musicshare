import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function DefaultList(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  var index = 0;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const showFriends = () => (
    <ExpansionPanel key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={"panel" + index + "bh-content"} id={"panel" + index + "bh-header"}>
          <Typography className={classes.heading}>{props.friends[index].first_name + " " + props.friends[index].last_name}</Typography>
  <Typography className={classes.secondaryHeading}>{props.friends[index++].songs.length + ' Songs'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )

  return (
    <div className={classes.root}>
      {props.friends.map(() => showFriends())}
    </div>
  );
}
