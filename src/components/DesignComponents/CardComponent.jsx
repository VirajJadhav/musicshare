import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
// import PauseCircleFilledRounded from "@material-ui/icons/PauseCircleFilledRounded"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 140,
    height: 0,
    paddingTop: '32%',
    marginTop:'10'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function CardComponent(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const url = '/users/getAllAudio/' + props.email + "/" + props.songName[props.index]
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
  {props.songName[props.index]}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            - -
          </Typography>
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div> */}
        <audio src={url} controls id="music" />
      </div>
      
      <CardMedia
        className={classes.cover}
        title="Music"
        image={require('../../music.png')}
      />
    </Card>
  );
}
