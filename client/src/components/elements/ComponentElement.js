import React from 'react';
import {renderNode} from './../../helpers/graphHelpers';
import { useSelector } from 'react-redux';

/*
* ComponentElement: This component is used to create a component element, a subelement that contains other elements
*/
function ComponentElement({ parent = '', position, name, element, currentType = '', currentValue = '', index = ''}) {
  const activeNodeType = useSelector((state) => state.cwl_data.activeNodeType);

  return (
    <div className="element-component" data-name={name} data-type={currentType}>
      {renderNode(currentValue, element, parent, index, activeNodeType)}
    </div>
  );
}

export default ComponentElement;