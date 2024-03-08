import RenderElement from './../components/RenderElement';

export const renderNode = (element, scheme, parent = '', index='') => {
    console.log("renderNode", element);
    if(element !== undefined ) {
        return Object.entries(scheme).map(([key, field]) => {
            var currentElement = (element[key] !== undefined) ? element[key] : undefined;
            if(key === "nokey") currentElement = element;
            if (scheme[key].dependency === undefined || (scheme[key].dependency !== undefined && scheme[key].dependency.type.includes(element.type))) {
                return (<div className='element' key={key}>
                    {key!=="nokey" && <label>{key}{scheme[key].required ? " *" : ""}</label>}
                    <RenderElement parent={parent} position="node" name={key} element={scheme[key]} currentValue={currentElement} index={index}/>
                </div>);
            } else return null;
        });        
    }
};