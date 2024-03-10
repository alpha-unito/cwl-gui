import { Handle, Position} from 'reactflow';
import React from 'react';
import { useSelector  } from 'react-redux';

function NodeStep({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const nodeid = data.typeNode+"_"+data.index;
  const classActive = nodeid === node ? 'active' : '';

  return (
    <div id={nodeid} className={`node-base type-step ${classActive}`}>
        <Handle type="target" position={Position.Top} />
        <div className='node-header'>
          <span>{data.label}</span>
        </div>
        <div className='node-content'>
          <p>Run: <span>{data.run}</span></p>
        </div>
        <Handle type="source" position={Position.Bottom}/>
    </div>

  );
}

export default NodeStep;