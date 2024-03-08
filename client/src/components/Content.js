import React, { useState } from 'react';
import Workflow from './Workflow';
import CommandLineTool from './CommandLineTool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

/**
 * Content: This component is used to render the Graph.
 */
function Content({ className }) {
  const object = useSelector((state) => state.cwl_data.cwlobject);
  const workflow = (object.class === "Workflow") ? true : false;
  const [showMenu, setMenu] = useState(false);
  const dispatch = useDispatch();
  
  function newNode(value) {
    dispatch({ 
      type: 'set', 
      value: {  
        activeNode: value+"_new",
      } 
    });
    setMenu(false);
  }

  function toggleMenu() {
    setMenu(!showMenu);
  }

  return <div className={className}>
    <div class="select-type-node">
      <button class="select-button" onClick={toggleMenu}><FontAwesomeIcon icon={faPlus}/> New node</button>
      {showMenu && <div class="other-button">
        {!workflow && !object.baseCommand && <button onClick={() => newNode('baseCommand')}>BaseCommand</button>}
        {!workflow && <button onClick={() => newNode('argument')}>Argument</button>}
        <button onClick={() => newNode('input')}>Input</button>
        <button onClick={() => newNode('output')}>Output</button>
        {workflow && <button onClick={() => newNode('step')}>Step</button>}
      </div>}
    </div>
    {workflow && <Workflow/>}
    {!workflow && <CommandLineTool/>}
    <div className='legend'>
      <div className='legend-content'>
        <span><FontAwesomeIcon icon={faCircle} color="#0c0c9d59"/> Inputs</span>
        <span><FontAwesomeIcon icon={faCircle} color="#870fff59" /> Arguments</span>
        <span><FontAwesomeIcon icon={faCircle} color="#00b91ca3" /> Steps</span>
        <span><FontAwesomeIcon icon={faCircle} color="#ac910059" /> Outputs</span>
        <span><FontAwesomeIcon icon={faCircle} color="#ff000059" /> BaseCommand</span>
      </div>
      <FontAwesomeIcon icon={faCircleInfo} />
    </div>
  </div>;
}

export default Content;
