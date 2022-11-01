import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Card, CardContent, CardMedia, Box, Typography, Grid} from '@mui/material';
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Examples() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
        <Box>
            <Grid>
            <Card
             variant="outlined"
             sx={{ maxWidth: "600", backgroundColor: "#272727"}}
            >
                <CardContent style={{justifyContent: 'center'}}>
                    <Typography color='primary' align='center'>Prompt: Fractal</Typography>
                    <Typography color='#dddddd' align='center'>I keep seeing fractals in my tv static. I think its trying to tell me something</Typography>
                    <CardMedia style={{justifyContent: 'center'}}
                    align='center'
                    ><iframe src="https://giphy.com/embed/xgYiW3wKaV9Bg1TN4c" width="480" height="270" frameBorder="0" class="giphy-embed" align='center' allowFullScreen></iframe><p><a href="https://giphy.com/gifs/fractal-kaleidoscope-tvstatic-xgYiW3wKaV9Bg1TN4c"></a></p></CardMedia>
                    <Typography color='#dddddd' align='center'>Made this gif in AfterEffects based off the story generated!</Typography>
                </CardContent>
            </Card>
            </Grid>
        </Box>
        
    </div>
  );
}

export default Examples;
