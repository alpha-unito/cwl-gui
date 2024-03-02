import RenderElement from './../components/RenderElement';

export const renderNode = (element, scheme, parent = '', index='') => {
    return Object.entries(scheme).map(([key, field]) => {

        if (scheme[key].dependency === undefined || (scheme[key].dependency !== undefined && scheme[key].dependency.type.includes(element.type))) {
            return (<div className='element' key={key}>
                <label>{key}{scheme[key].required ? " *" : ""}</label>
                <RenderElement parent={parent} position="node" name={key} element={scheme[key]} currentValue={element[key]} index={index}/>
            </div>);
        } else return null;
    });
};