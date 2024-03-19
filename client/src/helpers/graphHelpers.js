import RenderElement from './../components/RenderElement';
import {getType} from './formHelpers';

export const renderNode = (element, scheme, parent = '', index='', activeNodeType = '') => {
    if(element !== undefined ) {
        return Object.entries(scheme).map(([key, field]) => {
            var currentElement = (element[key] !== undefined) ? element[key] : undefined;
            if(key === "type") currentElement = getType(activeNodeType);
            if(key === "nokey") currentElement = element;
            if (scheme[key].dependency === undefined || (scheme[key].dependency !== undefined && scheme[key].dependency.type.includes(activeNodeType))) {
                return (<div className='element' key={key}>
                    {key!=="nokey" && <label>{key}{scheme[key].required ? " *" : ""}</label>}
                    <RenderElement parent={parent} position="node" name={key} element={scheme[key]} currentValue={currentElement} index={index}/>
                </div>);
            } else return null;
        });        
    }
};

export const topologicalSort = (steps, idCwl) => {
    const edges = new Map(); 
    const inDegree = new Map(); 
    const zeroInDegree = []; 
    const sorted = [];

    steps.forEach(step => {
        edges.set(step.id, []);
        inDegree.set(step.id, 0);
    });

    steps.forEach(step => {
        (step.in || []).forEach(input => {
            if (input.source) {
                let sourceId = input.source;
                var i = idCwl !== "" && sourceId.split("/")[0] === idCwl ? 1 : 0;
                if(sourceId.split("/").length > 1 && edges.has(sourceId.split("/")[i])){
                  sourceId = sourceId.includes("/") ? sourceId.split("/")[i] : sourceId;
                  const sources = Array.isArray(input.source) ? sourceId : [sourceId];
                  sources.forEach(source => {
                      edges.get(source)?.push(step.id);
                      inDegree.set(step.id, (inDegree.get(step.id) || 0) + 1);
                  });                  
                }
            }
          });
    });

    inDegree.forEach((count, stepId) => {
        if (count === 0) zeroInDegree.push(stepId);
    });

    while (zeroInDegree.length) {
        const current = zeroInDegree.shift();
        sorted.push(current);
        edges.get(current).forEach(next => {
            inDegree.set(next, inDegree.get(next) - 1);
            if (inDegree.get(next) === 0) {
                zeroInDegree.push(next);
            }
        });
    }
    return sorted.map(id => steps.find(step => step.id === id));
  }