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
  const [newfile, setNewFile] = useState(false);

  function setCwl (type) { 
    var cwlobject = {}; 
    var data = "";

    switch(type) {
      case "CommandLineTool": 
        cwlobject = { cwlVersion: "v1.2", class: type, inputs: [], outputs: [] };
        data = "cwlVersion: v1.2\nclass: "+type+"\ninputs: [] \noutputs: []\n";
        break;
      case "Workflow":
        cwlobject = { cwlVersion: "v1.2", class: type, inputs: [], steps: [], outputs: [] };
        data = "cwlVersion: v1.2\nclass: "+type+"\ninputs: [] \nsteps: [] \noutputs: []\n";
        break;
      default:
        break;
    }

    dispatch({ 
      type: 'set', 
      value: { 
        name: "unnamed.cwl", 
        data: data, 
        cwlobject: cwlobject,
      } 
    }); 
  };

  function toggleNewFile () {
      setNewFile(!newfile); 
  };

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
        if(data.result) {
          dispatch({ 
            type: 'set', 
            value: { 
              name: fileData.name, 
              data: data.string, 
              cwlobject: data.object,
            } 
          });          
        }else{
          dispatch({ 
            type: 'set', 
            value: { 
              errorMessage: data.message,
              errorEnabled: true,
            } 
          });  
        }
      })
      .catch(error => {
        dispatch({ 
          type: 'set', 
          value: { 
            errorEnabled: error,
          } 
        });       
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
      <p>Or create a <button type="button" onClick={toggleNewFile}>New file cwl</button></p>
      {newfile && 
        <div className="newfile">
          <div className="newfile-content">
            <p>Select the cwl type</p>
            <button type="button" onClick={() => setCwl("CommandLineTool")}>CommandLineTool</button>
            <button type="button" onClick={() => setCwl("Workflow")}>Workflow</button>
            <button type="button" className='return' onClick={toggleNewFile}>Come back</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Uploader;
