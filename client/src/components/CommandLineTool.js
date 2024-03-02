import React from 'react';
import Graph from './Graph';

import { useSelector } from 'react-redux';

function CommandLineTool() {
  const object = useSelector((state) => state.cwl_data.cwlobject);
  const savedPositions = useSelector((state) => state.cwl_data.nodePositions);

  const initialNodes = []; // Array to hold all nodes for rendering
  let currentIndex = 0; // Index to track the position of nodes horizontally

  // Helper function to create a node
  const createNode = (id, index, type, positionY, data) => {
    const defaultPosition = { x: index * 160, y: positionY };
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
  object.inputs.forEach((input, index) => {
    const label = input.id || "Input";
    const prefix = input.inputBinding ? input.inputBinding.prefix : "";
    initialNodes.push(createNode(label, index, 'nodeInput', 0, {typeNode: "input", type: input.type, prefix: prefix }));
    currentIndex++;
  });

  // Process arguments, if any, to create argument nodes
  if(object.arguments) {
    object.arguments.forEach((argument, index) => {
      const label = argument.valueFrom !== "" ? argument.valueFrom : "";
      const prefix = argument.prefix || "";
      const position = argument.position || "";

      initialNodes.push(createNode(label, currentIndex++, 'nodeArgument', 0, {typeNode: "argument", prefix: prefix, position: position}));
    });
  }

  // Process outputs to create output nodes
  object.outputs.forEach((output, index) => {
    const label = output.id || "Output";
    initialNodes.push(createNode(label, index, 'nodeOutput', 100, {typeNode: "output", type: output.type}));
  });

  const initialEdges = [];

  return <Graph initialNodes={initialNodes} initialEdges={initialEdges} />;
}

export default CommandLineTool;
