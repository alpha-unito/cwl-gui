import React from 'react';
import Graph from './Graph';
import { useSelector } from 'react-redux';

function Content({ className }) {
  const object = useSelector((state) => state.cwl_data.cwlobject);

  const initialNodes = [];
  {Object.keys(object.inputs).map((key, index) => {
    initialNodes.push(
      {
        id: 'in'+index,
        type: 'nodeInput',
        position: {
          x: index*110,
          y: 0
        },
        data: {
          id: 'in'+index,
          label: (object.inputs[key].id.split('#')[1]) ? object.inputs[key].id.split('#')[1] : "Input",
          type: object.inputs[key].type
        }
      }
    );
  })}

/*  const initialNodes = [
    { id: '1', type: 'nodeInput', position: { x: 0, y: 0 }, data: { label: 'message', type: 'float' } },
    { id: '2', type: 'nodeInput', position: { x: 0, y: 100 }, data: { label: '2', type: 'int' } },
    { id: '3', type: 'nodeOutput', position: { x: 0, y: 200 }, data: { label: '3', number: 2 } }, 
  ];*/
  const initialEdges = [
    //{ id: '1->3', markerEnd: {type: MarkerType.ArrowClosed,width: 20,height: 20,}, source: '1', target: '3' },
    //{ id: '2->3', markerEnd: {type: MarkerType.ArrowClosed,width: 20,height: 20,}, source: '2', target: '3' }
  ];

  return <Graph initialNodes={initialNodes} initialEdges={initialEdges}/>;
}

export default Content;
