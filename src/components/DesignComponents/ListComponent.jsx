import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardComponent from "./CardComponent"
import RadioComponent from "./RadioComponent"

const ExpansionPanel = withStyles({
  root: {
    border: '3px solid rgba(0, 0, 0, 0.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiExpansionPanelDetails);

export default function ListComponent(props) {
  const [expanded, setExpanded] = React.useState('panel');

  var index = 0;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showSongs = () => (
          <ExpansionPanel key={index} TransitionProps={{ unmountOnExit: true }} square expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={"panel" + index + "d-content"} id={"panel" + index + "d-header"}>
  <Typography>{props.songName[index]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <CardComponent index={index} email={props.email} songName={props.songName} />
            </ExpansionPanelDetails>
            <div className="text-center mb-2">
              <RadioComponent history={props.history} email={props.email} songName={props.songName[index]} songStatus={props.songStatus[index++]} />
            </div>
        </ExpansionPanel>
  )
  return (
    <div className="mb-4">
        {props.songName.map(() => showSongs())}
    </div>
  );
}