import { Handle, Position} from 'reactflow';
import React, { useCallback } from 'react';
import { useSelector  } from 'react-redux';

function NodeStep({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const classActive = data.id == node ? 'active' : '';

  return (
    <div id={data.id} className={`node-base type-step ${classActive}`}>
        <Handle type="target" position={Position.Top} />
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

export default NodeStep;