import { useSelector, useDispatch  } from 'react-redux';
import CodeBlock from './CodeBlock';
import CodeView from './CodeView';
import React, { useState, useEffect } from 'react';
import {commandLineTool} from './../data/commandLineToolGeneral';
import {workflow} from './../data/workflowGeneral';
import RenderElement from './RenderElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import {createFormDataGeneral} from './../helpers/formHelpers';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Summary: A component that displays a summary of the CWL data.
 * 
 * It retrieves CWL data from the Redux store and uses the CodeBlock component to display the data.
 */
function Summary({ className }) {
  
  const [activeTab, setActiveTab] = useState('editor');
  const cwl = useSelector((state) => state.cwl_data);
  const APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(0);
  const [prevEditor, setPrevEditor] = useState(0);
  const elements = (cwl.cwlobject.class === "Workflow") ? workflow : commandLineTool;  

  const elementsRender = Object.keys(elements).map(key => {
    let currentValue = cwl.cwlobject[key] ? cwl.cwlobject[key] : undefined;
    
    if(key === "id" && currentValue !== undefined) {
      currentValue = currentValue.split("#")[1] !== undefined ? currentValue.split("#")[1] : "";
    }

    return (
      <div className='element' key={key}>
        <label>{key}{elements[key].required ? " *" : ""}</label>
        <RenderElement position="general" name={key} element={elements[key]} currentValue={currentValue !== undefined ? currentValue : ""}/>
      </div>
    )    
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if(!editor && prevEditor) {
      fetch(`${APP_SERVER_URL}api/data`, {
        method: 'POST',
        body: JSON.stringify({ content: cwl.data }),
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
      setPrevEditor(0);
    }
  }, [editor, prevEditor, setPrevEditor, APP_SERVER_URL, cwl, dispatch]);


  function toggleEditor () {
      setPrevEditor(editor);
      setEditor(!editor); 
  };

  const saveGeneral = (event) => {

    if(cwl.errorElementsGeneral.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();

    var formData = {};
    formData = createFormDataGeneral(event);

    const cwltemp = cloneDeep(cwl.cwlobject);   
    if(cwltemp.steps){ 
      var idCwl = cwltemp.id && cwltemp.id.split("#")[1] ? cwltemp.id.split("#")[1] : "";
      cwltemp.steps = cwltemp.steps.map(step => {
        if(idCwl !== "" && (formData["id"] === null || formData["id"] === undefined || formData["id"] === '')) {
          step.in = step.in.map(input => {
              if(input.source !== undefined){
                input.source = input.source.replace(idCwl+"/", "");
              }
              return input;
          });
        }
        return step;
      });
    }  

    Object.keys(formData).forEach(key => {
      if(formData[key] !== null || formData[key] !== undefined || formData[key] !== '')
        cwltemp[key] = formData[key];
      else delete cwltemp[key];
    });


    fetch(`${APP_SERVER_URL}api/general`, {
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
            generalModified: false,
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
      <div className="buttons">        
        <button className={`button editor-button ${activeTab === 'editor' ? 'active' : ''}`} type="button" onClick={() => handleTabChange('editor')}>
          Editor
        </button>
        <button className={`button general ${activeTab === 'general' ? 'active' : ''}`} type="button" onClick={() => handleTabChange('general')}>
          General
        </button>
      </div>      
      <div className={`tab editor ${activeTab === 'editor' ? 'active' : ''}`}>
        <button type="button"  className='button' onClick={toggleEditor}>{!editor ? "Edit inline" : "Close editor"}</button>
        {!editor ? (<CodeView code={cwl.data} language="yaml" />) : (<CodeBlock language="yaml" />)}
      </div>
      <div className={`tab general ${activeTab === 'general' ? 'active' : ''}`}>
        <form onSubmit={saveGeneral}>
          <button 
            className={`update button ${!cwl.generalModified ? 'disable' : ''}`}>
            <FontAwesomeIcon icon={faArrowsRotate} /> Update cwl
          </button>          
          {elementsRender}
        </form>
      </div>
    </div>
  );
}
  
export default Summary;