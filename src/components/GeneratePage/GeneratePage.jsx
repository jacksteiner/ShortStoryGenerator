import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GeneratePage.css';
import axios from 'axios';
import "98.css"

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function GeneratePage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Generator will go here!');
  const [storyList, setStoryList] = useState([]);
  const [promptName, setPromptName] = useState('');
  const [generated, setGenerated] = useState('');
  const inputRef = useRef();

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

  const fetchGeneration = (e) => {
    e.preventDefault();
    console.log('in fetchGeneration');
    axios.get(`/api/story/${promptName}`)
    .then(response => {
      console.log('This is the data', response.data)
      setGenerated(response.data)
      fetchStoryList();
    }).catch(error => {
      console.log(error);
      alert('Something went wrong in fetchGeneration');
    });
    setPromptName('');
  }

  // const favoriteStory = (storyId) => {
  //   // put to go here
  //   axios.put(`/api/story/${storyId}`).then(() => {
  //     fetchStoryList();
  //   }).catch((e) => {
  //     console.log(e);
  //     alert('Something went wrong');
  //   })
  // }

  return (
    <div>
      <h2>{heading}</h2>
      <form onSubmit={fetchGeneration}>
        <input value={promptName} onChange={(e) => setPromptName(e.target.value)} type="text" placeholder='Prompt Goes Here!' />
        <input type="submit" />
      </form>
      <div class="field-row">
          <label for="text17">Occupation</label>
          <input id="text17" type="text" />
      </div>
      <div>
        <h2>Test Data</h2>
        {
          storyList.map(generation => {
            return (
            <div style={{ width: 700 }} className="window">
              <div className='title-bar'>
                <div className='title-bar-text'>Story</div>
                <div className='title-bar-controls'>
                  <button aria-label='Minimize' />
                  <button aria-label='Maximize' />
                  <button aria-label='Close' />
                </div>
              </div>
              <div className='window-body'>
                <p style={{textAlign: "center", fontSize: 15, }}>{generation.story}</p>
                <p style={{textAlign: "center", fontSize: 15, color: 'blue' }}>Prompt: {generation.prompt}</p>
                <div className="field-row" style={{ justifyContent: 'center' }}>
                  <button>Favorite</button>
                </div>
              </div>
            </div>
          )})
        }
        </div> 
        <div>
          <h2>Test Generations</h2>
          {/* {
            generated.map(generatedStory => {
              return <div>{generatedStory.prompt}</div>
            })
          } */}
        </div>

    </div>
  );
}

export default GeneratePage;

// Testing 98.css(this is backup code)
// <div>
// {generation.story}
//  {generation.prompt}
//  <br></br>
// <button onClick={() => favoriteStory()}>Favorite</button>
// </div>