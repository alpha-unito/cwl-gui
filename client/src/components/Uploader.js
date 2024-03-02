import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

/**
 * Uploader: A component for uploading .cwl files.
 * 
 * It enables the user to select or drag-and-drop a .cwl file. 
 * Once a file is selected, its content is read and dispatched to the Redux store.
 */
function Uploader({ className }) {
  const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData({ content: e.target.result, name: file.name });
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (fileData) {
      fetch(APP_SERVER_URL+'api/data', {
        method: 'POST',
        body: JSON.stringify({ content: fileData.content }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ 
          type: 'set', 
          value: { 
            name: fileData.name, 
            data: data.string, 
            cwlobject: data.object,
          } 
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [APP_SERVER_URL,fileData, dispatch]);

  return (
    <div className={className}>
      <div className="upload">
        <input type="file" name="filecwl" accept=".cwl" onChange={handleFileChange}/>
        <div className="upload-content">
          <span><FontAwesomeIcon icon={faFolderOpen} /> Choose file .cwl from Directory</span>
          <label>Or</label>
          <label>Drag and Drop your file</label>            
        </div>
      </div>
      <p>Or create a <button type="button">New file cwl</button></p>
    </div>
  );
}

export default Uploader;
