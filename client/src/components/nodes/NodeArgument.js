import { Handle, Position} from 'reactflow';
import React from 'react';
import { useSelector  } from 'react-redux';

function NodeArgument({ data }) {  
  const node = useSelector((state) => state.cwl_data.activeNode);
  const nodeid = data.typeNode+"_"+data.index;
  const classActive = nodeid == node ? 'active' : '';

  return (
    <div id={data.nodeid} className={`node-base type-argument ${classActive}`}>
        <div className='node-header'>
          {data.label}
        </div>
        <div className='node-content'>
          <p>Position: <span>{data.position}</span></p>
          <p>Prefix: <span>{data.prefix}</span></p>
        </div>
        <Handle type="source" position={Position.Bottom}/>
    </div>

  );
}

export default NodeArgument;