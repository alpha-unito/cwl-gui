import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
  
function NodeOutput({ data }) {
 
  return (
    <div className='node-base type-output'>
        <Handle type="target" position={Position.Top} />
        <div className='node-header'>
            Output
        </div>
        <div className='node-content'>
        </div>
    </div>

  );
}

export default NodeOutput;