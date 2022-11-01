import React from 'react';
import {Grid, Box, Card, CardContent, CardActions, Typography} from '@mui/material'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        {/* <p>This about page is for anyone to read!</p> */}
        <Typography color="primary" align='center'>Technology Used:</Typography>
        <Typography color="#dddddd" align='center'>React</Typography>
        <Typography color="#dddddd" align='center'>Redux</Typography>
        <Typography color="#dddddd" align='center'>Express</Typography>
        <Typography color="#dddddd" align='center'>Node</Typography>
        <Typography color="#dddddd" align='center'>Open Ai Api</Typography>
        <Typography color="#dddddd" align='center'>Material Ui</Typography>
      </div>
    </div>
  );
}

export default AboutPage;
