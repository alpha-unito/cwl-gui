import { useSelector, useDispatch  } from 'react-redux';
import CodeBlock from './CodeBlock';
import CodeView from './CodeView';
import React, { useState, useEffect } from 'react';

/**
 * Summary: A component that displays a summary of the CWL data.
 * 
 * It retrieves CWL data from the Redux store and uses the CodeBlock component to display the data.
 */
function Summary({ className }) {
  const cwl = useSelector((state) => state.cwl_data);
  const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(0);
  const [prevEditor, setPrevEditor] = useState(0);

  useEffect(() => {
    if(!editor && prevEditor) {
      fetch(`${APP_SERVER_URL}api/data`, {
        method: 'POST',
        body: JSON.stringify({ content: cwl.data }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ 
          type: 'set', 
          value: { 
            name: cwl.name, 
            content: cwl.data, 
            object: data.message,
            node: cwl.activeNode,
            nodePositions: cwl.nodePositions
          } 
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    setPrevEditor(0);
  }, [editor, prevEditor, setPrevEditor, APP_SERVER_URL, cwl, dispatch]);


  function toggleEditor () {
      setPrevEditor(editor);
      setEditor(!editor); 
  };

  return (
    <div className={className}>
      <div className='editor'>
        <button type="button"  className='button' onClick={toggleEditor}>{!editor ? "Edit inline" : "Close editor"}</button>
        {!editor ? (<CodeView code={cwl.data} language="yaml" />) : (<CodeBlock language="yaml" />)}
      </div>
    </div>
  );
}
  
export default Summary;