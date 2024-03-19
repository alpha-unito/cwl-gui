import React from 'react';
import { useDispatch  } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * Exception: show error message when there is an error in the CWL file.
 */
function Exception({ content, className, title}) {
  const dispatch = useDispatch();

  function resetError () {
    dispatch({ 
      type: 'set', 
      value: { 
        errorEnabled: false,
      } 
    });
  };

  function resetCwl () {
    dispatch({ 
      type: 'reset'
    });
  };

  return (
    <div className={className}>
      <div className='main'>
        <button onClick={resetError} type="button" className="close" aria-label="Close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className='header-error'>
            <p>{title}</p>
        </div>
        <div className='content'>
            {content}
        </div>
        <button onClick={resetError} type="button" className="button">Stay</button>
        <button onClick={resetCwl} type="button" className="button">Cwl Reset</button>
      </div>
    </div>
  );
}
  
export default Exception;