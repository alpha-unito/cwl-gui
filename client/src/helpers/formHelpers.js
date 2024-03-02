export const determineType = (value) => {
    if (Array.isArray(value)) {
        if (typeof value[0] === 'string') {
        return "string[]";
        } else if (typeof value[0] === 'number') {
        return "int[]";
        }
    } else if (typeof value === 'string') {
        if (value.startsWith('$(') && value.endsWith(')')) {
        return "expression";
        }
        return "string";
    } else if (typeof value === 'number') {
        return "int";
    } 

    return '';
};

export const createFormDataGeneral = (event) => {
    var formData = {};
    Array.from(event.target.elements).forEach(element => {
        let value = element.value;
        if (element.name && value !== '') {
          if (element.type === 'number') {
            value = parseInt(element.value);
          }
          formData = arrayFormData(element, formData, value);
        }else formData[element.name] = undefined;
    });

    return formData;
};

export const createFormDataNode = (event) => {
    var formData = {};
    var value = "";
    var index;
    Array.from(event.target.elements).forEach(element => {
        if(element.value !== '') {
            switch (element.name) {
                case "pattern":
                    if(element.getAttribute('data-parent') === 'secondaryFiles'){
                        if (!formData['secondaryFiles']) {
                            formData['secondaryFiles'] = [];
                        }
                        value = {pattern: element.value};
                        formData['secondaryFiles'].push(value);
                    }    
                    else formData[element.name] = element.value;
                    break;
                case "required":
                    if(element.getAttribute('data-parent') === 'secondaryFiles'){
                        const lastIndex = formData['secondaryFiles'].length - 1;
                        formData['secondaryFiles'][lastIndex].required = element.value;
                    }    
                    else formData[element.name] = element.value;
                    break;
                case "glob":
                    if(element.getAttribute('data-parent') === 'outputBinding'){
                        if (!formData['outputBinding']) {
                            formData['outputBinding'] = {};
                        }
                        if (!formData['outputBinding'][element.name]) {
                            formData['outputBinding'][element.name] = [];                            
                        }
                        formData['outputBinding'][element.name].push(element.value);
                    }    
                    else formData[element.name] = element.value;
                    break;
                case "outputSource":
                case "doc":
                case "scatter":
                case "format":
                case "out":
                    formData = arrayFormData(element, formData, element.value);
                    break;
                case "ids":
                    if(element.getAttribute('data-parent') === 'in'){
                        if (!formData['in']) {
                            formData['in'] = [];
                        }
                        value = {id: element.value};
                        formData['in'].push(value);
                    }    
                    else formData[element.name] = element.value;
                    break;
                case "source":
                    if(element.getAttribute('data-parent') === 'in'){
                        index = element.getAttribute('data-index');
                        if (!formData['in']) {
                            formData['in'] = [];
                        }
                        if (!formData['in'][index]) {
                            value = {[element.name]: element.value};
                            formData['in'].push(value);
                        } else formData['in'][index] = arrayFormData(element, formData['in'][index], element.value);
                    }    
                    else formData[element.name] = element.value;
                    break;
                case "id":
                case "linkMerge":
                case "pickValue":
                case "label":
                case "default":
                case "valueFrom":
                    if(element.getAttribute('data-parent') === 'in'){
                        index = element.getAttribute('data-index');
                        if (!formData['in']) {
                            formData['in'] = [];
                            value = {[element.name]: element.value};
                            formData['in'].push(value);
                        }
                        if (!formData['in'][index]) {
                            value = {[element.name]: element.value};
                            formData['in'].push(value);
                        } else formData['in'][index][element.name] = element.value;
                    }    
                    else formData[element.name] = element.value;
                    break;
                default:
                    if(element.getAttribute('data-parent')){
                        if (!formData[element.getAttribute('data-parent')]) {
                            formData[element.getAttribute('data-parent')] = {};
                        }
                        formData[element.getAttribute('data-parent')][element.name] = element.value;
                    }
                    else formData[element.name] = element.value;
            }
        }
    });

    return formData;
};

const arrayFormData = (element, formData, value) => {
    if (formData.hasOwnProperty(element.name)) {
        if (Array.isArray(formData[element.name])) {
          formData[element.name].push(value);
        } else {
          formData[element.name] = [formData[element.name], value];
        }
      } else {
        if(element.getAttribute('data-array') === 'true') {
          formData[element.name] = [value];
        } else formData[element.name] = value;
    }
    
    return formData;
};