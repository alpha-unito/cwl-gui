import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

/**
 * Uploader: A component for uploading .cwl files.
 * 
 * It enables the user to select or drag-and-drop a .cwl file. 
 * Once a file is selected, its content is read and dispatched to the Redux store.
 */
function Uploader({ className }) {
  
  const dispatch = useDispatch();

  // Handles file selection and dispatches its content to the Redux store.
  const handleFileChange = (event) => {
      const file = event.target.files[0];

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target.result;

        dispatch({ type: 'set', value: { name: file.name, content: content } });
      };
      
      reader.readAsText(file);
  };

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
