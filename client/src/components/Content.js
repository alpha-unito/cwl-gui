import React from 'react';
import Workflow from './Workflow';
import CommandLineTool from './CommandLineTool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

/**
 * Content: This component is used to render the Graph.
 */
function Content({ className }) {
  const object = useSelector((state) => state.cwl_data.cwlobject);
  const workflow = (object.class === "Workflow") ? true : false;

  return <div className={className}>
    {workflow && <Workflow/>}
    {!workflow && <CommandLineTool/>}
    <div className='legend'>
      <div className='legend-content'>
        <span><FontAwesomeIcon icon={faCircle} color="#0c0c9d59"/> Inputs</span>
        <span><FontAwesomeIcon icon={faCircle} color="#870fff59" /> Arguments</span>
        <span><FontAwesomeIcon icon={faCircle} color="#00b91ca3" /> Steps</span>
        <span><FontAwesomeIcon icon={faCircle} color="#ac910059" /> Outputs</span>
        <span><FontAwesomeIcon icon={faCircle} color="#df00ff59" /> BaseCommand</span>
      </div>
      <FontAwesomeIcon icon={faCircleInfo} />
    </div>
  </div>;
}

export default Content;
