import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import {cltInputs} from './../data/commandLineToolInputs';
import {cltOutputs} from './../data/commandLineToolOutputs';
import {workflowInputs} from './../data/workflowInputs';
import {workflowOutputs} from './../data/workflowOutputs';
import {workflowSteps} from './../data/workflowSteps';
import {renderNode} from './../helpers/graphHelpers';
import {createFormDataNode} from './../helpers/formHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
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
  const index = cwl.activeNode !== "" ? cwl.activeNode.split("_")[1] : undefined;

  const dispatch = useDispatch();
  const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  let render;

  if(type !== undefined && index !== undefined) {
    var inputs = {};
    var outputs = {};
    var steps = {};
    var arguments_ = {};

    switch (cwl.cwlobject.class) {
      case "CommandLineTool":
        inputs = cltInputs;
        outputs = cltOutputs;
        break;
      case "Workflow":
        inputs = workflowInputs;
        outputs = workflowOutputs;
        steps = workflowSteps;
        break;
      default:
    }

    switch (type) {
      case "step":
        let stepsArray = [...cwl.cwlobject.steps].reverse();
        render = renderNode(stepsArray[index], steps);
        break;
      case "output":
        render = renderNode(cwl.cwlobject.outputs[index], outputs);
        break;
      case "input":
        render = renderNode(cwl.cwlobject.inputs[index], inputs);
        break;
      case "argument":
        render = renderNode(cwl.cwlobject.arguments[index-1], arguments_);
        break; 
      default:
    }
  }

  const saveNode = (event) => {
    event.preventDefault();

    var formData = {};
    formData = createFormDataNode(event);
  
    // Updating the cwltemp object with form data
    Object.keys(formData).forEach(key => {
      if(key !== "nodeType" && key !== "nodePosition"){
        if(formData[key] !== null || formData[key] !== undefined || formData[key] !== '')
          cwltemp[type+"s"][index][key] = formData[key];
        else delete cwltemp[type+"s"][index][key];        
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

  return (
  <div className={className}>
    <form onSubmit={saveNode}>
      {cwl.activeNode !== "" &&
      <button 
        className={`update button ${!cwl.nodeModified ? 'disable' : ''}`}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Update Node
      </button> }
      {render}
      <input type="hidden" name="nodeType" value={type}/>
      <input type="hidden" name="nodePosition" value={index}/>
    </form>
  </div>
  );
}

export default Actions;