import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Controls, MarkerType, isEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeInput from './nodes/NodeInput.js';
import NodeOutput from './nodes/NodeOutput.js';
import NodeArgument from './nodes/NodeArgument.js';
import NodeStep from './nodes/NodeStep.js';
import { useSelector, useDispatch  } from 'react-redux';

const nodeTypes = { nodeInput: NodeInput, nodeOutput: NodeOutput, nodeArgument: NodeArgument, nodeStep: NodeStep };


/**
 * Graph: Graph: A component for displaying the cwl file as a graph
 * 
 * Use the ReactFlow library to display nodes and edges
 */
function Graph({initialNodes, initialEdges}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  const cwl = useSelector((state) => state.cwl_data);
  const dispatch = useDispatch();

  const onNodeClick = (event, node) => {
    //alert(JSON.stringify(node));
    console.log(node.id);
    console.log(cwl.activeNode);
    let nodeid = (cwl.activeNode == node.id) ? "" : node.id; 
    dispatch({ 
      type: 'set', 
      value: { 
        name: cwl.name, 
        content: cwl.data, 
        object: cwl.cwlobject,
        node: nodeid
      } 
    });
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onEdgeClick = (event, edge) => {
    let newEdges=null;
    if(edge.id != selectedEdgeId){
      setSelectedEdgeId(edge.id);
      newEdges = edges.map(e => {
        if (e.id === edge.id) {
          return { ...e, style: { ...e.style, stroke: '#ffe300' } };
        }else return { ...e, style: { ...e.style, stroke: '#222' } };;
      });
    } else {
      setSelectedEdgeId(null);
      newEdges = edges.map(e => {
        return { ...e, style: { ...e.style, stroke: '#b1b1b7' } };;
      });
    }
    setEdges(newEdges);
  };

  const onPaneClick = () => {
    if (selectedEdgeId) {
      const newEdges = edges.map(e => ({ ...e, style: { stroke: '#b1b1b7' } }));
      setEdges(newEdges);
      setSelectedEdgeId(null);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Graph;