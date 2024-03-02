import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import ComponentElement from './ComponentElement';
import { useDispatch  } from 'react-redux';

/*
* ArrayComponentElement: This component is used to create a ComponentElement array
*/
function ArrayComponentElement({ parent = '', position, name, element, currentType = '', currentValue = '', index = ''}) {
  const dispatch = useDispatch();

  const initializeElements = (value) => 
  Array.isArray(value) ? value.map(item => ({
      value: item,
  })) : [/*{ value: value }*/];

  const [elements, setElements] = useState(() => initializeElements(currentValue));

  useEffect(() => {
      setElements(initializeElements(currentValue));
  }, [currentValue]);

  function addElementArray() {
    const newElement = { value: '' };
    setElements([...elements, newElement]);
    var modified = position === 'node' ? {nodeModified: true} : {generalModified: true};
    dispatch({
        type: 'set', 
        value: { 
            ...modified
        }
    });
  };

  function removeElementArray() {
      if (elements.length > 0) {
          const updatedElements = elements.slice(0, -1); 
          setElements(updatedElements);
      }
      var modified = position === 'node' ? {nodeModified: true} : {generalModified: true};
      dispatch({
          type: 'set', 
          value: { 
            ...modified
          }
      });
  };

  return (
    <>
      <div className='buttons'>
          <button className='button plus' type="button" onClick={addElementArray}>
              <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className='button minus' type="button" onClick={removeElementArray}>
              <FontAwesomeIcon icon={faMinus} />
          </button>
      </div>
      <div className='array-elements'>
          {elements.map((item, i) => (
              <div className='array-element' key={name+"-"+i}>
                  <ComponentElement   
                        position={position}
                        currentValue={currentValue[i]} 
                        element={element}
                        name={name}
                        parent={parent}
                        index={i}
                  />
              </div>
          ))}
      </div> 
    </>
  );
}

export default ArrayComponentElement;