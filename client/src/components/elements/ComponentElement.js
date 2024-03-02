import React from 'react';
import {renderNode} from './../../helpers/graphHelpers';

/*
* ComponentElement: This component is used to create a component element, a subelement that contains other elements
*/
function ComponentElement({ parent = '', position, name, element, currentType = '', currentValue = '', index = ''}) {

  return (
    <div className="element-component" data-name={name} data-type={currentType}>
      {renderNode(currentValue, element, parent, index)}
    </div>
  );
}

export default ComponentElement;