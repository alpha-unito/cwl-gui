import { useSelector,useDispatch } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

/**
 * Toolbar: Renders a toolbar component with buttons for file manipulation.
 */
function Toolbar({ className }) {
  const APP_VERSION = process.env.REACT_APP_VERSION;

  const cwl = useSelector((state) => state.cwl_data);
  const dispatch = useDispatch();

  const resetState = () => {
    dispatch({type: 'reset'});
  };

  return (
    <div className={className}>
      <p>cwl-gui <span>v{APP_VERSION}</span></p>
      <div className="info">
        <p className="file">You are editing <span>{cwl.name}</span></p>
        <button type="button" className='button' onClick={resetState}><FontAwesomeIcon icon={faFolderOpen} /> Change file</button>
        <button type="button" className='button disable'><FontAwesomeIcon icon={faFloppyDisk} /> Export</button>
      </div>
    </div>
  );
}
  
export default Toolbar;