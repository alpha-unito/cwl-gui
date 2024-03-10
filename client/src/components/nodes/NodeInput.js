import { Handle, Position} from 'reactflow';
import React from 'react';
import { useSelector  } from 'react-redux';
import {getType} from './../../helpers/formHelpers';

function NodeInput({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const nodeid = data.typeNode+"_"+data.index;
  const classActive = nodeid === node ? 'active' : '';

  return (
    <div id={nodeid} className={`node-base type-input ${classActive}`}>
        <div className='node-header'>
          <span>{data.label}</span>
        </div>
        <div className='node-content'>
          <p>Type: <span>{getType(data.type)}</span></p>
          <p>Prefix: <span>{data.prefix}</span></p>
        </div>
        <Handle type="source" position={Position.Bottom}/>
    </div>

  );
}

export default NodeInput;