import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch  } from 'react-redux';

/*
* BaseElement: This component is used to create a simple input.
*/
function BaseElement({ parent='', position, name, type, required = false, readOnly = false, regex = '', message = '', currentType = '', currentValue = '', isArrayOfElements=false , index = ''}) {
    const [inputValue, setInputValue] = useState(currentValue); 
    const [isValid, setIsValid] = useState(new RegExp(regex).test(currentValue) || (!required && currentValue === '')); 
    const dispatch = useDispatch();


    const errorUpdate = useCallback(() => {
        var modified;
        var typeDisp;
        if(isValid){
            modified = { ...(position === 'node' ? { nodeModified: true } : { generalModified: true }) };
            dispatch({
                type: "set", 
                value: { ...modified }
            });
        }
        if (isValid) {
            typeDisp = position === 'node' ? 'removeErrorNode' : 'removeErrorGeneral';
            modified = { key: name };
        } else {
            typeDisp = position === 'node' ? 'addErrorNode' : 'addErrorGeneral';
            modified = { key: name };
        }
        dispatch({
            type: typeDisp, 
            value: { ...modified }
        });
    }, [isValid, name, position, dispatch]);
    

    useEffect(() => {
        errorUpdate();
    }, [errorUpdate]);

    useEffect(() => {
        setInputValue(currentValue);
    }, [currentValue]);
    
    const handleChange = (event) => {
        if (readOnly) return; 

        const newValue = event.target.value;
        setInputValue(newValue);
        setIsValid(new RegExp(regex).test(newValue) || (!required && newValue === ''));
        errorUpdate();
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
