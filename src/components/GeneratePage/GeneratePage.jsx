import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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

  return (
    <div>
      <h2>{heading}</h2>
      <form onSubmit={fetchGeneration}>
        <input value={promptName} onChange={(e) => setPromptName(e.target.value)} type="text" placeholder='Prompt Goes Here!' />
        <input type="submit" />
      </form>
      <div>
        <h2>Test Data</h2>
        {
          storyList.map(generation => {
            return <div>{generation.story}{generation.prompt}</div>
          })
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
