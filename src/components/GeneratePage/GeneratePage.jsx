import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function GeneratePage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Generator will go here!');
  const [storyList, setStoryList] = useState([]);
  const [promptName, setPromptName] = useState('');

  return (
    <div>
      <h2>{heading}</h2>
      <form>
        <input value={promptName} onChange={(e) => setPromptName(e.target.value)} type="text" placeholder='Prompt Goes Here!' />
        <input type="submit" />
      </form>
    </div>
  );
}

export default GeneratePage;
