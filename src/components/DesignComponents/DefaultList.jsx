import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    // color: theme.palette.text.secondary,
    color: 'white',
  },
}));

export default function DefaultList(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  let index = 0;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const showSongs = (song, songIndex) => {
    const emailIndex = index - 1
    if(props.friends[emailIndex].status[songIndex] === "Public")
      return (
        <ExpansionPanelDetails style={{ backgroundColor: 'white', color: 'black' }} key={song}>
          <Typography>
            {song} 
          </Typography>
            <audio className="mt-3 ml-3" src={'/users/getAllAudio/' + props.friends[emailIndex].email + '/' + song} controls id="music" />
        </ExpansionPanelDetails>
      )
  }

  const showFriends = (friend) => {
    let publicSongs = 0;
    // eslint-disable-next-line array-callback-return
    friend.status.map(songStatus => {
      if(songStatus === "Public")
        ++publicSongs
    })
    return (
      <ExpansionPanel style={{ backgroundColor: '#3b4d61', color: 'white' }} key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="error" fontSize="default" />} aria-controls={"panel" + index + "bh-content"} id={"panel" + index + "bh-header"}>
          <Typography className={classes.heading}>{friend.first_name + " " + friend.last_name}</Typography>
  <Typography className={classes.secondaryHeading}>{publicSongs + ' Public Song(s)'}</Typography>
        </ExpansionPanelSummary>
          {props.friends[index++].songs.map((value, songIndex) => showSongs(value, songIndex))}
      </ExpansionPanel>
    )
  }

  return (
    <div className={classes.root}>
      {props.friends.map((friend) => showFriends(friend))}
    </div>
  );
}
