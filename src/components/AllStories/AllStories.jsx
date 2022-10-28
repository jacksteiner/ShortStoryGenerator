import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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
      <h2>{heading}</h2>
      <div>
        <h2>Test Data</h2>
        {
          storyList.map(generation => {
            return <div>
              {generation.story} {generation.prompt}
              <input onChange={() => favoriteStory(generation.id)} type="checkbox"  
              checked ={generation.favorite}/>

              {
                generation.favorite === true ? (
                    <>
                    <label onClick={() => favoriteStory(generation.id)} >UnFavorite</label>
                    </>
                ) : (
                    <>
                    <label onClick={() => favoriteStory(generation.id)} >Favorite</label>
                    </>
                )
              } 
            </div>
          })
        }
        </div> 
    </div>
  );
}

export default AllStories;