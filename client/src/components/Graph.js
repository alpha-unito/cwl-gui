import { useCallback, useState, useEffect } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeInput from './nodes/NodeInput.js';
import NodeOutput from './nodes/NodeOutput.js';
import NodeArgument from './nodes/NodeArgument.js';
import NodeBaseCommand from './nodes/NodeBaseCommand.js';
import NodeStep from './nodes/NodeStep.js';
import { useSelector, useDispatch  } from 'react-redux';

const nodeTypes = { 
  nodeInput: NodeInput, 
  nodeOutput: NodeOutput, 
  nodeArgument: NodeArgument, 
  nodeStep: NodeStep, 
  nodeBaseCommand: NodeBaseCommand 
};


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

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges]);

  const onNodeClick = (event, node) => {
    let newid = node.data.typeNode+"_"+node.data.index;
    let oldid = (cwl.activeNode !== "") ? cwl.activeNode : "";
    let nodeid = (oldid === newid) ? "" : newid; 
    dispatch({ 
      type: 'set', 
      value: { 
        activeNode: nodeid,
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
  
  const onConnect = (connection) => {
    /*const newEdge = {
      ...connection,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));*/
    console.log("Adding new connections is not allowed.");
  };

  const onEdgeClick = (event, edge) => {
    let newEdges=null;
    if(edge.id !== selectedEdgeId){
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

  const onNodeDragStop = useCallback((event, node) => {
    let newid = node.data.typeNode+"_"+node.data.index;

    dispatch({ 
      type: 'set', 
      value: { 
        nodePositions: { ...cwl.nodePositions, [newid]: node.position }
      } 
    });
    console.log(node.position );
  }, [dispatch, cwl]);

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 41px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeDragThreshold={1}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Graph;