import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import BaseElement from './BaseElement';
import { useDispatch  } from 'react-redux';

/*
* ArrayElement: This component is used to create a BaseElement array
*/
function ArrayElement({ parent  = '', position, name, type, currentValue = '', required = false, readOnly =  false, regex = '', message = '', index = ''}) {
    const dispatch = useDispatch();

    const initializeElements = (value, type, required) => 
    Array.isArray(value) ? value.map(item => ({
        type: type,
        value: item,
        required: required,
    })) : [{ type: type, value: value, required: required }];

    const [elements, setElements] = useState(() => initializeElements(currentValue, type, required));

    useEffect(() => {
        setElements(elements);
    }, [currentValue, type, required, elements]);


    function addElementArray() {
        const newElement = { type: type, value: '', required: required };
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
        if (elements.length > 1) {
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
                {elements.map((element, i) => (
                    <div className='array-element' key={name+"-"+i}>
                        <BaseElement   
                            position={position} 
                            type={element.type} 
                            required={element.required}
                            currentValue={element.value} 
                            regex={regex}
                            message={message}
                            name={name}
                            isArrayOfElements={true}
                            parent={parent}
                            index={index}
                        />
                    </div>
                ))}
            </div> 
        </>
    );
}

export default ArrayElement;