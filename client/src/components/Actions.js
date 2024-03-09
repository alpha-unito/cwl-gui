import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import {cltInputs} from './../data/commandLineToolInputs';
import {cltOutputs} from './../data/commandLineToolOutputs';
import {cltBaseCommand} from './../data/commandLineToolBaseCommand';
import {cltArgument} from './../data/commandLineToolArgument';
import {workflowInputs} from './../data/workflowInputs';
import {workflowOutputs} from './../data/workflowOutputs';
import {workflowSteps} from './../data/workflowSteps';
import {renderNode} from './../helpers/graphHelpers';
import {createFormDataNode, changeType} from './../helpers/formHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faTrash } from '@fortawesome/free-solid-svg-icons';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Actions: Right sidebar
 * 
 * Allows viewing and editing a node
 */
function Actions({ className }) {
  const cwl = useSelector((state) => state.cwl_data);

  // Creating a deep clone of the cwl object to avoid directly mutating the state
  var cwltemp = cloneDeep(cwl.cwlobject);  
  // Extracting type and index from the activeNode identifier
  const type = cwl.activeNode !== "" ? cwl.activeNode.split("_")[0] : undefined;
  var index = cwl.activeNode !== "" ? cwl.activeNode.split("_")[1] : undefined;

  const dispatch = useDispatch();
  const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  let render;

  if(type !== undefined && index !== undefined) {
    var inputs = {};
    var outputs = {};
    var baseCommand = {};
    var steps = {};
    var arguments_ = {};

    switch (cwl.cwlobject.class) {
      case "CommandLineTool":
        inputs = cltInputs;
        outputs = cltOutputs;
        baseCommand = cltBaseCommand;
        arguments_ = cltArgument;
        break;
      case "Workflow":
        inputs = workflowInputs;
        outputs = workflowOutputs;
        steps = workflowSteps;
        break;
      default:
    }

    switch (type) {
      case "baseCommand":
        render = renderNode(cwltemp, baseCommand);
        break;
      case "step":
        if(cwltemp.steps === undefined){
          cwltemp.steps = [];
          index = 0;
          cwltemp.steps[index] = {run: ""};
        }
        if(index === "new"){
          index = cwltemp.steps.length;
          cwltemp.steps[index] = {run: ""};
        }
        let stepsArray = [...cwltemp.steps].reverse();
        render = renderNode(stepsArray[index], steps);
        break;
      case "output":
        if(cwltemp.outputs === undefined){
          cwltemp.outputs = [];
          index = 0;
          cwltemp.outputs[index] = {type: "File"};
        }
        if(index === "new"){
          index = cwltemp.outputs.length;
          cwltemp.outputs[index] = {type: "File"};
        }
        render = renderNode(cwltemp.outputs[index], outputs);
        break;
      case "input":
        if(cwltemp.inputs === undefined){
          cwltemp.inputs = [];
          index = 0;
          cwltemp.inputs[index] = {type: "File"};
        }
        if(index === "new"){
          index = cwltemp.inputs.length;
          cwltemp.inputs[index] = {type: "File"};
        }
        render = renderNode(cwltemp.inputs[index], inputs);
        break;
      case "argument":
        if(cwltemp.arguments === undefined){
          cwltemp.arguments = [];
          index = 0;
          cwltemp.arguments[index] = {};
        }
        if(index === "new"){
          index = cwltemp.arguments.length;
          cwltemp.arguments[index] = {};
        }
        render = renderNode(cwltemp.arguments[index], arguments_);
        break; 
      default:
    }
  }

  const saveNode = (event) => {
    if(cwl.errorElementsNode.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    dispatch({ 
      type: 'set', 
      value: { 
        activeNode: type+"_"+index,
      } 
    }); 

    var formData = {};
    formData = createFormDataNode(event);
  
    // Updating the cwltemp object with form data
    var indextemp = index;        
    //if(type === "argument") { indextemp = indextemp - 1; }
    Object.keys(formData).forEach(key => {
      if(key !== "nodeType" && key !== "nodePosition"){
        switch (type) {
          case "baseCommand":
            if(formData[key] !== null || formData[key] !== undefined || formData[key] !== '')
              cwltemp[key] = changeType(formData[key]);
            else delete cwltemp[key]; 
            break;
          default:
            if(formData[key] !== null || formData[key] !== undefined || formData[key] !== '')
              cwltemp[type+"s"][indextemp][key] = changeType(formData[key]);
            else delete cwltemp[type+"s"][indextemp][key];

        }     
      }
    });

    fetch(`${APP_SERVER_URL}api/node`, {
        method: 'POST',
        body: JSON.stringify({ content: cwltemp }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data.result) {
          dispatch({ 
            type: 'set', 
            value: { 
              data: data.string,
              cwlobject: data.object,
              nodeModified: false,
            } 
          });        
        }else{
          dispatch({ 
            type: 'set', 
            value: { 
              errorEnabled: data.message,
            } 
          });  
        }
      })
      .catch(error => {
        dispatch({ 
          type: 'set', 
          value: { 
            errorEnabled: error,
          } 
        }); 
      });
    };

  function deleteNode() {
      let updatedCwlObject = {...cwltemp};
  
      switch (type) {
        case "baseCommand":
          delete updatedCwlObject.baseCommand;
          break;
        case "step":
          updatedCwlObject.steps.splice(index, 1);
          break;
        case "output":
          updatedCwlObject.outputs.splice(index, 1);
          break;
        case "input":
          updatedCwlObject.inputs.splice(index, 1);
          break;
        case "argument":
          updatedCwlObject.arguments.splice(index, 1);
          break;
        default:
      }
  
      fetch(`${APP_SERVER_URL}api/node`, {
          method: 'POST',
          body: JSON.stringify({ content: updatedCwlObject }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
        .then(data => {
          if(data.result) {
            dispatch({ 
              type: 'set', 
              value: { 
                data: data.string,
                cwlobject: updatedCwlObject,
                nodeModified: false,
                activeNode: "",
              } 
            });        
          } else {
            dispatch({ 
              type: 'set', 
              value: { 
                errorEnabled: data.message,
              } 
            });  
          }
        })
        .catch(error => {
          console.error("Errore nell'eliminazione del nodo:", error);
          dispatch({ 
            type: 'set', 
            value: { 
              errorEnabled: error.toString(),
            } 
          }); 
        });
  }
  

  return (
  <div className={className}>
    <form onSubmit={saveNode}>
      {cwl.activeNode !== "" && <>
      <div className="deleteNode">
        <p><strong>{type}</strong></p>
        <button type="button"  onClick={deleteNode}><FontAwesomeIcon icon={faTrash} /> Delete node</button>
      </div>
      <button 
        className={`update button ${!cwl.nodeModified ? 'disable' : ''}`}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Update Node
      </button></> }
      {render}
      <input type="hidden" name="nodeType" value={type}/>
      <input type="hidden" name="nodePosition" value={index}/>
    </form>
  </div>
  );
}

export default Actions;