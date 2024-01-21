import { useSelector } from 'react-redux';
import CodeBlock from './CodeBlock';
import CodeView from './CodeView';
import React, { useState } from 'react';

/**
 * Summary: A component that displays a summary of the CWL data.
 * 
 * It retrieves CWL data from the Redux store and uses the CodeBlock component to display the data.
 */
function Summary({ className }) {
  const cwl = useSelector((state) => state.cwl_data);
  const [editor, setEditor] = useState(0);

  const toggleEditor = () => {
      setEditor(!editor);
  };

  return (
    <div className={className}>
      <p className='name'>{cwl.name}</p>
      <div className='editor'>
        <button type="button" onClick={toggleEditor}>{!editor ? "Edit inline" : "Close editor"}</button>
        {!editor ? (<CodeView code={cwl.data} language="yaml" />) : (<CodeBlock language="yaml" />)}
      </div>
    </div>
  );
}
  
export default Summary;