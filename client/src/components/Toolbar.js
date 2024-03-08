import { useSelector,useDispatch } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from './ConfirmModal';

/**
 * Toolbar: Renders a toolbar component with buttons for file manipulation.
 */
function Toolbar({ className }) {
  const APP_VERSION = process.env.REACT_APP_VERSION;  
  const cwl = useSelector((state) => state.cwl_data);
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setTitle] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    dispatch({type: 'reset'});
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const enableEdit = () => {
    setTitle(true);

  };

  useEffect(() => {
    if(editTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTitle, inputRef]);

  const handleChange = (e) => {
    if(e.target.value === "") {
      return;
    }
    dispatch({ 
      type: 'set', 
      value: { 
        name: e.target.value+".cwl"
      } 
    });
  };

  const handleBlur = () => {
    setTitle(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBlur();
      event.preventDefault();
    }
  };
  

  const saveState = () => {
    const blob = new Blob([cwl.data], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cwl.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={className}>
      <p>cwl-gui <span>v{APP_VERSION}</span></p>
      <div className="info">
        <p className="file" onClick={enableEdit}>You are editing 
          {!editTitle && <span>{cwl.name}</span>}
          {editTitle && <span><input ref={inputRef} onKeyDown={handleKeyDown} onChange={handleChange} onBlur={handleBlur} type="text" value={cwl.name.split(".")[0]}/>.cwl</span>}
        </p>
        <button type="button" className='button' onClick={handleOpenModal}><FontAwesomeIcon icon={faFolderOpen} /> Change file</button>
        <button type="button" className='button' onClick={saveState}><FontAwesomeIcon icon={faFloppyDisk} /> Export</button>
      </div>
      {showModal && <ConfirmModal 
        className="modal-inline"
        text="Are you sure? If you have not exported the file you will lose the changes you made" 
        onConfirm={handleConfirm} 
        onCancel={handleCancel} />}
    </div>
  );
}
  
export default Toolbar;