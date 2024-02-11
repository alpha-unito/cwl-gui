import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { useSelector } from 'react-redux';
import { MarkerType } from 'reactflow';

// Parses the CWL object into nodes and edges for the Graph component
const parseCWLObject = (object, savedPositions) => {
  const allNodes = {}; // Tracks all nodes for level calculation
  const initialEdges = []; // Stores edges between nodes
  const initialNodes = []; // Stores node definitions for the graph

  // Processes input sections of the CWL object to create graph nodes
  const processInputs = (inputs) => {
    Object.keys(inputs).forEach((key, index) => {
      const inputId = inputs[key].id.split("#")[1];
      allNodes[inputId] = 0; // Initialize input nodes at level 0
      initialNodes.push(createNode(inputId, 'nodeInput', index, allNodes[inputId], inputs[key]));
    });
  };

  // Processes argument sections for additional nodes
  const processArguments = (arguments_, startIndex) => {
    Object.keys(arguments_ || {}).forEach((key, index) => {
      const argId = arguments_[key].id.split("#")[1];
      initialNodes.push(createNode(argId, 'nodeArgument', startIndex + index, 0, arguments_[key]));
    });
  };

  // Processes steps to determine node levels and create edges based on dependencies
  const processSteps = (steps) => {
    Object.keys(steps).reverse().forEach((key, index) => {
      const step = steps[key];
      const stepId = step.id.split("#")[1];
      const levels = processStepInputs(step, stepId, initialEdges, allNodes); // Calculate node level based on input dependencies
      allNodes[stepId] = Math.max(0, ...levels); // Set the step node level
      initialNodes.push(createNode(stepId, 'nodeStep', index, allNodes[stepId], step));
    });
  };

  // Processes outputs to create nodes and link them to their sources
  const processOutputs = (outputs, lastLine) => {
    Object.keys(outputs).forEach((key, index) => {
      const outputId = outputs[key].id.split("#")[1];
      initialNodes.push(createNode(outputId, 'nodeOutput', index, lastLine, outputs[key]));
    });
  };

  // Helper function to create node objects
  const createNode = (id, type, index, level, data) => {
    const defaultPosition = { x: index * 160, y: level * 100 };
    const position = savedPositions[id] ? { x: savedPositions[id].x, y: savedPositions[id].y } : defaultPosition;

    return {
      id: id,
      type: type,
      position: position, // Position nodes based on their index and level
      data: {
        id: id,
        label: data.id.split('#')[1] || type, // Use the last part of the ID as the label
        type: (typeof data.type !== 'undefined') ? data.type : "",
        run: (typeof data.run !== 'undefined') ? data.run : ""
      }
    };
  };

  // Processes inputs of steps to create edges and determine node levels
  const processStepInputs = (step, stepId, initialEdges, allNodes) => {
    let levels = [1]; // Start with level 1 to ensure steps are below inputs
    Object.keys(step.in_).forEach((inKey) => {
      let sources = Array.isArray(step.in_[inKey].source) ? step.in_[inKey].source : [step.in_[inKey].source];
      sources.forEach(source => {
        if (source !== undefined) {
          let sourceId = source.split("#")[1];
          sourceId = sourceId.includes("/") ? sourceId.split("/")[0] : sourceId;
          const level = allNodes[sourceId] + 1;
          levels.push(level);
          const edgeId = `${sourceId}->${stepId}`;
          const existingEdge = initialEdges.find(edge => edge.id === edgeId);
          if (!existingEdge) {
            initialEdges.push({
              id: edgeId,
              markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
              source: sourceId,
              target: stepId,
            });
          }
        }
      });
    });
    return levels;
  };

  // Creates edges between steps and outputs based on the CWL outputSource field
  const processStepOutputs = (outputs, steps, initialEdges, allNodes) => {
    Object.keys(outputs).forEach(outputKey => {
      const output = outputs[outputKey];
      let sourceIds = Array.isArray(output.outputSource) ? output.outputSource : [output.outputSource];
      sourceIds.forEach(sourceId => {
        sourceId = sourceId.split("#")[1];
        sourceId = sourceId.includes("/") ? sourceId.split("/")[1] : sourceId;
        const targetId = output.id.split("#")[1];
        if (sourceId && allNodes[sourceId] !== undefined) {
          const edgeId = `${sourceId}->${targetId}`;
          const existingEdge = initialEdges.find(edge => edge.id === edgeId);
          if (!existingEdge) {
            initialEdges.push({
              id: edgeId,
              markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
              source: sourceId,
              target: targetId,
            });
          }
        }
      });
    });
  };

  // Main processing flow
  processInputs(object.inputs);
  processArguments(object.arguments_, Object.keys(object.inputs).length);
  processSteps(object.steps);
  processStepOutputs(object.outputs, object.steps, initialEdges, allNodes); // Link step nodes to output nodes
  const lastLine = Math.max(...Object.values(allNodes)) + 1; // Determine the last line for output positioning
  processOutputs(object.outputs, lastLine);

  return { initialNodes, initialEdges };

};


function Workflow() {
  const cwlObject = useSelector((state) => state.cwl_data.cwlobject);
  const savedPositions = useSelector((state) => state.cwl_data.nodePositions);

  const { initialNodes, initialEdges } = parseCWLObject(cwlObject, savedPositions);

  return <Graph initialNodes={initialNodes} initialEdges={initialEdges} />;
}

export default Workflow;
