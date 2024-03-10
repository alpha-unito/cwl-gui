import { Handle, Position} from 'reactflow';
import React from 'react';
import { useSelector  } from 'react-redux';

function NodeOutput({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const nodeid = data.typeNode+"_"+data.index;
  const classActive = nodeid === node ? 'active' : '';

  return (
    <div id={nodeid} className={`node-base type-output ${classActive}`}>
        <Handle type="target" position={Position.Top} />
        <div className='node-header'>
          <span>{data.label}</span>
        </div>
        <div className='node-content'>
          <p>Type: <span>{data.type}</span></p>
        </div>
    </div>

  );
}

export default NodeOutput;