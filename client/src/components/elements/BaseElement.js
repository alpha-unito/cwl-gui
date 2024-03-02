import React, { useState, useEffect } from 'react';
import { useDispatch  } from 'react-redux';

/*
* BaseElement: This component is used to create a simple input.
*/
function BaseElement({ parent='', position, name, type, required = false, readOnly = false, regex = '', message = '', currentType = '', currentValue = '', isArrayOfElements=false , index = ''}) {
    const [inputValue, setInputValue] = useState(currentValue); 
    const [isValid, setIsValid] = useState(new RegExp(regex).test(currentValue) || (!required && currentValue === '')); 
    const dispatch = useDispatch();

    useEffect(() => {
        setInputValue(currentValue);
    }, [currentValue]);

    const handleChange = (event) => {
        if (readOnly) return; 

        const newValue = event.target.value;
        setInputValue(newValue);
        setIsValid(new RegExp(regex).test(newValue) || (!required && newValue === ''));
        if(isValid){
            var modified = position === 'node' ? {nodeModified: true} : {generalModified: true};
            dispatch({
                type: 'set', 
                value: { 
                    ...modified
                }
            });
        }
    };

    let className = !isValid ? 'invalid' : '';

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                required={required}
                readOnly={readOnly}
                className={className}
                name={name}
                data-array={isArrayOfElements}
                data-parent={parent}
                data-index={index}
            />
            <span>{type}</span>
            {!isValid && <label style={{ color: '#e70c0c' }}>{message}</label>}
        </>
    );
}

export default BaseElement;
