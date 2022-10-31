import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {Grid, Box, Card, CardContent, CardActions, Typography, Button} from '@mui/material'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AllStories() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Favorite Stories');
  const [storyList, setStoryList] = useState([]);

  useEffect(() => {
    fetchStoryList();
    // fetchGeneration();
  }, []);

  // test that database can get story
  const fetchStoryList = () => {
    console.log('fetchStoryList is called')
    axios.get('/api/story').then((response) => {
      setStoryList(response.data)
    }).catch((e) => {
      console.log(e);
      alert('Something went wrong');
    });
  }

  const favoriteStory = (id) => {
    console.log('favorite story', id)
    // in .then call fetch storyList
    axios.put(`/api/story/favorite/${id}`).then((response) => {
        fetchStoryList(response.data)
    }).catch((e) => {
        console.log(e);
        alert('Something went wrong');
    });
  }

  return (
    <div>
        <div>
          <Box>
            <Grid
              container wrap='nowrap'
              justify = 'center'
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
              minWidth={500}
            >
                      {
          storyList.map(generation => {
            return (
              <div>
            <Grid
            container spacing = {1} wrap='nowrap'
            minWidth={700}
            maxWidth={600}
            >
              <Card 
              variant="outlined"
              sx={{ maxWidth: "600", backgroundColor: "#272727"}}
              >
              <CardContent>
              <div>
                <Typography color="primary" align='center'>Prompt: {generation.prompt}</Typography>
                <Typography color="#dddddd" align='center'>{generation.story}</Typography>
                {/* <input type="checkbox" checked={generation.favorite} onChange={() => favoriteStory(generation)}/> */}
                {
                generation.favorite === true ? (
                    <>
                    <CardActions style={{justifyContent: 'center'}}>
                    {/* <button onClick={() => favoriteStory(generation.id)}>UnFavorite</button>  */}
                    <Button align="center" onClick={() => favoriteStory(generation.id)}>UnFavorite</Button>
                    </CardActions>
                    </>
                ) : (
                    <>
                    <CardActions style={{justifyContent: 'center'}}>
                    {/* <button onClick={() => favoriteStory(generation.id)}>Favorite</button> */}
                    <Button align="center" onClick={() => favoriteStory(generation.id)}>Favorite</Button>
                    </CardActions>
                    </>
                )
              }   
              </div>
              </CardContent>
              </Card>
              <br />
              </Grid>
              </div>
          )})
        }
        </Grid>
        </Box>
          </div>
    </div>
  );
}

export default AllStories;