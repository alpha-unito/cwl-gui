import React from 'react';
import Graph from './Graph';
import { useSelector } from 'react-redux';

function CommandLineTool() {
  const object = useSelector((state) => state.cwl_data.cwlobject);

  const initialNodes = []; // Array to hold all nodes for rendering
  let currentIndex = 0; // Index to track the position of nodes horizontally

  // Helper function to create a node
  const createNode = (idPrefix, index, type, positionY, data) => {
    const id = `${idPrefix}${index}`;
    return {
      id: id,
      type: type,
      position: {
        x: index * 160, // Spread nodes horizontally
        y: positionY
      },
      data: {
        id: id,
        label: data.label || type, // Use provided label or default to type
        ...data.extra, // Spread any extra data
      }
    };
  };

  // Process inputs to create input nodes
  Object.keys(object.inputs).forEach((key, index) => {
    const input = object.inputs[key];
    const label = input.id.split('#')[1] || "Input";
    initialNodes.push(createNode('in', index, 'nodeInput', 0, {label, extra: {type: input.type}}));
    currentIndex++;
  });

  // Process arguments, if any, to create argument nodes
  if(object.arguments_) {
    Object.keys(object.arguments_).forEach((key, index) => {
      const argument = object.arguments_[key];
      const label = argument.valueFrom !== "" ? argument.valueFrom : "Argument";
      const extra = {value: argument.valueFrom, prefix: argument.prefix, position: argument.position};
      initialNodes.push(createNode('ar', currentIndex++, 'nodeArgument', 0, {label, extra}));
    });
  }

  // Process outputs to create output nodes
  Object.keys(object.outputs).forEach((key, index) => {
    const output = object.outputs[key];
    const label = output.id.split('#')[1] || "Output";
    initialNodes.push(createNode('ou', index, 'nodeOutput', 100, {label, extra: {type: output.type}}));
  });

  const initialEdges = [];

  return <Graph initialNodes={initialNodes} initialEdges={initialEdges} />;
}

export default CommandLineTool;
