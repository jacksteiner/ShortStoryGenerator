import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchStoryList();
  }, []);

  const fetchStoryList = () => {
    console.log('fetchStoryList is called')
    axios.get('/api/story').then((response) => {
      setStoryList(response.data)
    }).catch((e) => {
      console.log(e);
      alert('Something went wrong');
    });
  }

  return (
    <div>
      <h2>{heading}</h2>
      <form>
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
    </div>
  );
}

export default GeneratePage;
