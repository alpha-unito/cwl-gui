import React from 'react';
import {determineType, getType} from './../helpers/formHelpers';
import CompoundElement from './elements/CompoundElement';
import BaseElement from './elements/BaseElement';
import ArrayElement from './elements/ArrayElement';
import SelectElement from './elements/SelectElement';
import ComponentElement from './elements/ComponentElement';
import ArrayComponentElement from './elements/ArrayComponentElement';

/*
* RenderElement: decides which element component to render based on the type of the element passed as a prop
*/
function RenderElement({ parent='', position, name, element, currentType = '', currentValue = '', index = ''}) {  
  var component;
  currentValue = name === "type" ? getType(currentValue) : currentValue;
  var type = element.type[0] !== undefined ? element.type[0].replace("?","") : element.type[0];
  if(type === "component") {
    component = Array.isArray(element.component) && element.component.length > 1 ? element.component[0] : element.component;
    return <ComponentElement index={index} parent={name} position={position} name={name} element={element.component} currentValue = {currentValue}/>;
  }else if(type === "component[]"){
    component = Array.isArray(element.component) && element.component.length > 1 ? element.component[0] : element.component;
    return <ArrayComponentElement index={index} parent={name} position={position} name={name} element={component} currentValue = {currentValue}/>;
  }else if(Array.isArray(element.type) && element.type.length > 1) {
    
    currentValue = currentValue === undefined ? '' : currentValue;
    currentType = determineType(currentValue);
    if(name  === "default") console.log("RenderElement Default",currentType );
    return <CompoundElement index={index} parent={parent} position={position} currentType={currentType} currentValue = {currentValue} name={name} element={element} />;
  }else{
    switch (type) {
      case "constant":
        return <BaseElement index={index} parent={parent} position={position} currentValue = {element.value} type="text" name={name} required={element.required} readOnly={true}/>;
      case "string":
        return <BaseElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "string[]":
        return <ArrayElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "expression":
        return <BaseElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "int[]":
        return <ArrayElement index={index} parent={parent} position={position} currentValue = {currentValue} type="number" name={name} required={element.required} regex={element.validation.regex[0]} message={element.validation.message[0]} />;
      case "int":
        return <BaseElement index={index} parent={parent} position={position} currentValue = {currentValue} type="number" name={name} required={element.required} regex={element.validation.regex[0]} message={element.validation.message[0]} />;
      case "select":
        return <SelectElement index={index} parent={parent} position={position} currentValue = {currentValue} name={name} options={element.options}/>;
      case "boolean":
        return <SelectElement index={index} parent={parent} position={position} currentValue = {currentValue} name={name} options={["","false","true"]}/>;
      case "enum":
        return <SelectElement index={index} parent={parent} position={position} currentValue = {currentValue} name={name} options={["",...element.values]}/>;
      case "File":
        return <BaseElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "Directory":
        return <BaseElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "File[]":
        return <ArrayElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "Directory[]":
        return <ArrayElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      case "Any":
        return <ArrayElement index={index} parent={parent} position={position} currentValue = {currentValue} type="text" name={name} required={element.required} />;
      default:
        return "";
    }    
  }

}

export default RenderElement;