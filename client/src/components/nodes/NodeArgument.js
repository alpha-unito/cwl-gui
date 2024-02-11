import { Handle, Position} from 'reactflow';
import React from 'react';
import { useSelector  } from 'react-redux';

function NodeArgument({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const classActive = data.id === node ? 'active' : '';

  return (
    <div id={data.id} className={`node-base type-argument ${classActive}`}>
        <div className='node-header'>
          {data.label}
        </div>
        <div className='node-content'>
          <p>Value: <span>{data.value}</span></p>
        </div>
        <Handle type="source" position={Position.Bottom}/>
    </div>

  );
}

export default NodeArgument;