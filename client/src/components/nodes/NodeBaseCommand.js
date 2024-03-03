import { Handle, Position} from 'reactflow';
import React from 'react';
import { useSelector  } from 'react-redux';

function NodeBaseCommand({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const nodeid = data.typeNode+"_"+data.index;
  const classActive = nodeid === node ? 'active' : '';

  return (
    <div id={nodeid} className={`node-base type-basecommand ${classActive}`}>
        <Handle type="target" position={Position.Top} />
        <div className='node-header'>
          baseCommand
        </div>
        <div className='node-content'>
          <p>{data.value.join(', ')}</p>
        </div>
        <Handle type="source" position={Position.Bottom}/>
    </div>

  );
}

export default NodeBaseCommand;