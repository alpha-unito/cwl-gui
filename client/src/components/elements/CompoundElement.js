import React, { useState, useEffect } from 'react';
import RenderElement from './../RenderElement';
import { useDispatch  } from 'react-redux';
import ArrayComponentElement from './ArrayComponentElement';

/*
* CompoundElement: This component is used to create a compound element.
*/
function CompoundElement({ parent='', position, name, element, currentType = '', currentValue = '', index = ''}) {
  const [selectedElement, setSelectedElement] = useState(currentType && element.type.includes(currentType) ? currentType : element.type[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedElement(currentType && element.type.includes(currentType) ? currentType : element.type[0]);
  }, [element, currentType]);

  const handleClick = (typeElement) => {
    setSelectedElement(typeElement);
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
      <div className='buttons-element'>
      {element.type.map((typeElement, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(typeElement)} 
          className={selectedElement === typeElement ? 'typebutton active' : 'typebutton'}
        >
          {typeElement}
        </button>
      ))}        
      </div>

      {element.type.map((typeElement, i) => {
        
        if (typeElement === selectedElement ) {
          if(typeElement === "component[]"){
            return <ArrayComponentElement parent={name} position={position} key={name + "comp" + i} name={name} element={element.component[i]} currentValue = {currentValue}/>;
          }else{
            
            return (
              <RenderElement
                position={position} 
                key={name + "comp" + i}
                currentType = {currentType}
                currentValue = {typeElement!=="component" && typeof currentValue === 'object' ? '' : currentValue}
                name={name}
                element={{ ...element, type: [typeElement] }}
                parent={parent}
                index={index}
              />
            );            
          }

        }
        return null; 
      })}
    </>
  );
}

export default CompoundElement;