import React from 'react';
import Graph from './Graph';
import { useSelector } from 'react-redux';
import { MarkerType } from 'reactflow';
import {topologicalSort} from './../helpers/graphHelpers';

// Parses the CWL object into nodes and edges for the Graph component
const parseCWLObject = (object, savedPositions) => {
  const allNodes = {}; // Tracks all nodes for level calculation
  const initialEdges = []; // Stores edges between nodes
  const initialNodes = []; // Stores node definitions for the graph

  // Processes input sections of the CWL object to create graph nodes
  const processInputs = (inputs) => {
    inputs.forEach((input, index) => {
      const inputId = input.id;
      allNodes[inputId] = 0; // Initialize input nodes at level 0
      const prefix = input.inputBinding ? input.inputBinding.prefix : "";
      initialNodes.push(createNode(inputId, 'nodeInput', index, allNodes[inputId], {typeNode: "input", type: input.type, prefix: prefix}));
    });
  };

  // Processes argument sections for additional nodes
  /*const processArguments = (arguments_, startIndex) => {
    arguments_.forEach((argument_, index) => {
      const argId = argument_.id;
      initialNodes.push(createNode(argId, 'nodeArgument', startIndex + index, 0, {typeNode: "argument", valueFrom: argument_.valueFrom}));
    });
  };*/

  // Processes steps to determine node levels and create edges based on dependencies
  const processSteps = (steps, idCwl) => {
    steps = topologicalSort(steps, idCwl);
    [...steps].forEach((step, index) => {
      const stepId = step.id;
      const levels = processStepInputs(step, stepId, initialEdges, allNodes, idCwl); // Calculate node level based on input dependencies
      allNodes[stepId] = Math.max(0, ...levels); // Set the step node level
      initialNodes.push(createNode(stepId, 'nodeStep', index, allNodes[stepId], {typeNode: "step", run: step.run}));
    });
  };

  // Processes outputs to create nodes and link them to their sources
  const processOutputs = (outputs, lastLine) => {
    outputs.forEach((output, index) => {
      const outputId = output.id;
      initialNodes.push(createNode(outputId, 'nodeOutput', index, lastLine, {typeNode: "output", type: output.type}));
    });
  };

  // Helper function to create node objects
  const createNode = (id, type, index, level, data) => {
    const defaultPosition = { x: index * 160, y: level * 100 };
    const position = savedPositions[data.typeNode+"_"+index] ? { x: savedPositions[data.typeNode+"_"+index].x, y: savedPositions[data.typeNode+"_"+index].y } : defaultPosition;

    return {
      id: id,
      type: type,
      position: position, // Position nodes based on their index and level
      data: {
        label: id,
        index: index,
        ...data,
      }
    };
  };

  // Processes inputs of steps to create edges and determine node levels
  const processStepInputs = (step, stepId, initialEdges, allNodes, idCwl) => {
    let levels = [1]; // Start with level 1 to ensure steps are below inputs
    Object.keys(step.in).forEach((index) => {
      let sources = Array.isArray(step.in[index].source) ? step.in[index].source : [step.in[index].source];
      sources.forEach(source => {
        if (source !== undefined) {
          let sourceId = source;
          var i = idCwl !== "" && sourceId.split("/")[0] === idCwl ? 1 : 0;
          sourceId = sourceId.includes("/") ? sourceId.split("/")[i] : sourceId;
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
    outputs.forEach((output, index) => {
      let sourceIds = Array.isArray(output.outputSource) ? output.outputSource : [output.outputSource];
      if(sourceIds !== undefined && Array.isArray(sourceIds) && sourceIds.length > 0){
        sourceIds.forEach(sourceId => {
          if(sourceId !== undefined) {
            sourceId = sourceId.includes("/") ? sourceId.split("/")[0] : sourceId;
            const targetId = output.id;
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
          }
        });        
      }

    });
  };

  // Main processing flow
  if(object.inputs) processInputs(object.inputs);
  //if(object.arguments) processArguments(object.arguments, Object.keys(object.inputs).length);
  var idCwl = object.id && object.id.split("#")[1] ? object.id.split("#")[1] : "";
  if(object.steps) processSteps(object.steps, idCwl);
  if(object.steps && object.outputs) processStepOutputs(object.outputs, object.steps, initialEdges, allNodes); // Link step nodes to output nodes
  var lastLine = Math.max(...Object.values(allNodes)) + 1; // Determine the last line for output positioning
  lastLine = lastLine === -Infinity ? 0 : lastLine;
  if(object.outputs) processOutputs(object.outputs, lastLine);

  return { initialNodes, initialEdges };

};


function Workflow() {
  const cwlObject = useSelector((state) => state.cwl_data.cwlobject);
  const savedPositions = useSelector((state) => state.cwl_data.nodePositions);

  const { initialNodes, initialEdges } = parseCWLObject(cwlObject, savedPositions);

  return <Graph initialNodes={initialNodes} initialEdges={initialEdges} />;
}

export default Workflow;
