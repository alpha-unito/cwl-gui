import React from 'react';
import Workflow from './Workflow';
import CommandLineTool from './CommandLineTool';

import { useSelector } from 'react-redux';

function Content({ className }) {
  const object = useSelector((state) => state.cwl_data.cwlobject);
  const workflow = (object.class_ === "Workflow") ? true : false;


  return <div className={className}>
    {workflow && <Workflow/>}
    {!workflow && <CommandLineTool/>}
  </div>;
}

export default Content;
