import React from 'react';
import Graph from './Graph';
import { MarkerType } from 'reactflow';

import { useSelector } from 'react-redux';

function CommandLineTool() {
  const object = useSelector((state) => state.cwl_data.cwlobject);
  const savedPositions = useSelector((state) => state.cwl_data.nodePositions);
  const initialEdges = []; // Array to hold all edges for rendering
  const initialNodes = []; // Array to hold all nodes for rendering
  let currentIndex = 0; // Index to track the position of nodes horizontally

  // Helper function to create a node
  const createNode = (id, index, type, positionY, data, fixed = false, offset = 0) => {
    var defaultPosition = { x: (index+offset) * 160, y: positionY };
    if(fixed) defaultPosition = {...defaultPosition, x: (index+offset)};
    const position = savedPositions[data.typeNode+"_"+index] ? { x: savedPositions[data.typeNode+"_"+index].x, y: savedPositions[data.typeNode+"_"+index].y } : defaultPosition;
    return {
      id: id,
      type: type,
      position: position,
      data: {
        label: id,
        index: index, 
        ...data, // Spread any extra data
      }
    };
  };

  // Process inputs to create input nodes
  if(object.inputs) {
    object.inputs.forEach((input, index) => {
      const label = input.id || "input_"+index;
      const prefix = input.inputBinding ? input.inputBinding.prefix : "";
      initialNodes.push(createNode(label, index, 'nodeInput', 0, {typeNode: "input", type: input.type, prefix: prefix }));
      currentIndex++;
      if(object.baseCommand) {
        initialEdges.push({
          id: `${label}->baseCommand`,
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
          source: label,
          target: "baseCommand",
        });
      }
    });    
  }


  // Process arguments, if any, to create argument nodes
  if(object.arguments) {
    object.arguments.forEach((argument, index) => {
      const label = argument.valueFrom !== undefined ? argument.valueFrom : "argument_"+index;
      const prefix = argument.prefix || "";
      const position = argument.position || "";
      initialNodes.push(createNode(label, index, 'nodeArgument', 0, {typeNode: "argument", prefix: prefix, position: position}, false, currentIndex));
      if(object.baseCommand) {
        initialEdges.push({
          id: `${label}->baseCommand`,
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
          source: label,
          target: "baseCommand",
        });
      }
    });
  }

  var indexBaseCommand = 0;
  if(object.baseCommand) {
    indexBaseCommand = 150;
    var position = 0;
    position = (object.inputs) ? position+object.inputs.length : position+0;
    position = (object.arguments) ? position+object.arguments.length : position+0;
    initialNodes.push(createNode("baseCommand", position*160/2-80, 'nodeBaseCommand', indexBaseCommand, {typeNode: "baseCommand", value: object.baseCommand}, true));
  }

  // Process outputs to create output nodes
  if(object.outputs){
    object.outputs.forEach((output, index) => {
      const label = output.id || "output_"+index;
      initialNodes.push(createNode(label, index, 'nodeOutput', indexBaseCommand+150, {typeNode: "output", type: output.type}));
      if(object.baseCommand) {
        initialEdges.push({
          id: `baseCommand->${label}`,
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
          source: "baseCommand",
          target: label,
        });
      }
    });    
  }


  return <Graph initialNodes={initialNodes} initialEdges={initialEdges} />;
}

export default CommandLineTool;
