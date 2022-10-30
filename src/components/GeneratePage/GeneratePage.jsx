import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GeneratePage.css';
import axios from 'axios';
import {Grid, Box, Card, CardContent, CardActions, Typography} from '@mui/material'
import {ToggleButton, ToggleButtonGroup, TextField} from '@mui/material'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function GeneratePage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const [heading, setHeading] = useState('Generator will go here!');
  const [storyList, setStoryList] = useState([]);
  const [promptName, setPromptName] = useState('');

  const fetchGeneration = (e) => {
    e.preventDefault();
    console.log('in fetchGeneration');
    axios.get(`/api/story/${promptName}`)
    .then(response => {
      console.log('This is the data', response.data)
      setStoryList([response.data, ...storyList]);
      // fetchStoryList();
    }).catch(error => {
      console.log(error);
      alert('Something went wrong in fetchGeneration');
    });
    setPromptName('');
  }

  const favoriteStory = (generation) => {
    console.log('favorite story', generation)
    // in .then call fetch storyList
    axios.put(`/api/story/favorite/${generation.id}`).then((response) => {
      generation.favorite = !generation.favorite
    }).catch((e) => {
        console.log(e);
        alert('Something went wrong');
    });
  }


  return (
    <div>
      <Box>
        <Grid
          container
          justifyContent={'center'}
          alignItems='center'
        >
      <form onSubmit={fetchGeneration}>
        <div>
        <input value={promptName} onChange={(e) => setPromptName(e.target.value)} type="text" placeholder='Enter Prompt!' />
        <input type="submit" />
        </div>
      </form>
        </Grid>
      </Box>
        <div>
          <Box>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >

                      {
          storyList.map(generation => {
            return (
              <div>
              <Card 
              variant="outlined"
              sx={{ maxWidth: "600", backgroundColor: "#272727"}}
              >
              <CardContent>
              <div>
                <Typography color="#dddddd" align='center'>Prompt: {generation.prompt}</Typography>
                <Typography color="#dddddd" align='center'>{generation.story}</Typography>
                {/* <input type="checkbox" checked={generation.favorite} onChange={() => favoriteStory(generation)}/> */}
                {
                generation.favorite === true ? (
                    <>
                    <button onClick={() => favoriteStory(generation)}>UnFavorite</button>
                    </>
                ) : (
                    <>
                    <button onClick={() => favoriteStory(generation)}>Favorite</button>
                    </>
                )
              } 
              </div>
              </CardContent>
              </Card>
              </div>
          )})
        }
        </Grid>
        </Box>
          </div>
    </div>
  );
}

export default GeneratePage;

{/* <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    ></ToggleButtonGroup> */}

    // <button onClick={() => favoriteStory(generation)}>UnFavorite</button>

    // <button onClick={() => favoriteStory(generation)}>Favorite</button>