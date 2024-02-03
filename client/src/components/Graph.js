import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Controls  } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeInput from './nodes/NodeInput.js';
import NodeOutput from './nodes/NodeOutput.js';
import { useSelector, useDispatch  } from 'react-redux';

const nodeTypes = { nodeInput: NodeInput, nodeOutput: NodeOutput };


/**
 * Graph: Graph: A component for displaying the cwl file as a graph
 * 
 * Use the ReactFlow library to display nodes and edges
 */
function Graph({initialNodes, initialEdges}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const cwl = useSelector((state) => state.cwl_data);
  const dispatch = useDispatch();

  const onNodeClick = (event, node) => {
   
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
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Graph;