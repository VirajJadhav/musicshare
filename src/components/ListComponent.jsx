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
  const [expanded, setExpanded] = React.useState('panel1');

  var index = 0;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const showSongs = () => (
          <ExpansionPanel key={index} square expanded={expanded === 'panel' + props.data[index]} onChange={handleChange('panel' + props.data[index])}>
            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
  <Typography>Collapsible Group Item {props.data[index++]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <CardComponent />
            </ExpansionPanelDetails>
        </ExpansionPanel>
  )

  return (
    <div>
        {props.data.map(() => showSongs())}
    </div>
  );
}