import React, { useState, useEffect } from 'react';
import { useDispatch  } from 'react-redux';


/*
* SelectElement: This component is used to create a select element.         
*/
function SelectElement({ parent='', position, name, currentValue = '', options = [] , index = '', change = undefined}) {
    const [selectedValue, setSelectedValue] = useState(currentValue);
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedValue(currentValue);
    }, [currentValue]);

    const handleChange = (event, change) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        var modified = position === 'node' ? {nodeModified: true} : {generalModified: true};
        dispatch({
            type: 'set', 
            value: { 
                ...modified,
            }
        });

        if(change !== undefined){
            dispatch({
                type: 'set', 
                value: { 
                    activeNodeType: newValue,
                }
            });
        }
    };

    return (
        <>
            <select
                value={selectedValue}
                onChange={(event) => handleChange(event, change)}
                name={name}
                data-parent={parent}
                data-index={index}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
}

export default SelectElement;
