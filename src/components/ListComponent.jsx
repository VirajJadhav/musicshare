import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import CardComponent from "./CardComponent"

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
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
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function ListComponent(props) {
  const [expanded, setExpanded] = React.useState('panel0');

  var index = 0;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showSongs = () => (
          <ExpansionPanel key={index} square expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
            <ExpansionPanelSummary aria-controls={"panel" + index + "d-content"} id={"panel" + index + "d-header"}>
  <Typography>{props.data[index]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <CardComponent index={index++} email={props.email} data={props.data} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
  )
  return (
    <div className="mb-4">
        {props.data.map(() => showSongs())}
    </div>
  );
}