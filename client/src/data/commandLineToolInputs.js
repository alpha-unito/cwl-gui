let inputs = {
    "null": {
        id: {required: false, type: "string"},                     //This is a unique string that identifies the input within the CWL doc: {required: false, type: "string"}ument.
        label: {required: false, type: "string"},                  //string that provides a descriptive label for the input.
        doc: {required: false, type: "string"},                    //A string that can be used to provide additional doc: {required: false, type: "string"}umentation about the input.
        default_: {required: false, type: "string"},               //Specifies a default value for the input. The default value will be used if input is not provided during workflow execution.
        inputBinding: {                                            //An object that specifies binding options for the input, such as location, prefix: {required: false, type: "string"}, formatting options, and more.
            position: {required: false, type: "int"},              //This parameter specifies the position of the parameter within the command from the command line. It can be a positive integer or a string representing the position.
            prefix: {required: false, type: "string"},             //This parameter specifies a prefix to add to the parameter value when passed to the command from the command line.
            separate: {required: false, type: "boolean"},          //This parameter is a Boolean indicating whether the parameter should be separated from the value with a space (if true) or whether the value should be concatenated directly to the parameter (if false).
            itemSeparator: {required: false, type: "string"},      //This parameter specifies the separator to use when dealing with a list of values for the parameter. It is usually a string, for example ",".
            shellQuote: {required: false, type: "boolean"},        //This parameter is a boolean indicating whether the parameter value should be quoted when passed to the command from the command line. If true, the value will be quoted.
            loadContents: {required: false, type: "boolean"},      //This parameter is a boolean indicating whether the parameter value should be interpreted as a file and the contents of that file should be loaded as input to the command.
            valueFrom: {required: false, type: "string"}
        }
    },
    "boolean": {
        id: {required: false},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "int": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "long": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "float": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "double": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "string": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "File": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                    
        format: {required: false, type: "string"}, //This parameter specifies the format of the parameter value                                    
        streamable: {required: false, type: "boolean"},             //A Boolean indicating whether the input can be streamed instead of written to disk.
        secondaryFiles: {required: false},         //This parameter can be used to specify additional files to include as input. It can be an array of File or Directory type objects.          
        loadContents: {required: false, type: "boolean"},
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "Directory": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},   
        loadListing: {required: false, type: "string"},                                
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "boolean[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "int[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "long[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "float[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "double[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "string[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "File[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                        
        format: {required: false, type: "string"},              //This parameter specifies the format of the parameter value                    
        streamable: {required: false, type: "boolean"},         //A Boolean indicating whether the input can be streamed instead of written to disk.
        secondaryFiles: {required: false},                      //This parameter can be used to specify additional files to include as input. It can be an array of File or Directory type objects.       
        loadContents: {required: false, type: "boolean"},
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
    "Directory[]": {
        id: {required: false, type: "string"},                     
        label: {required: false, type: "string"},                 
        doc: {required: false, type: "string"},                   
        default_: {required: false, type: "string"},                                    
        loadListing: {required: false, type: "string"},                
        inputBinding: {        
            position: {required: false, type: "int"},           
            prefix: {required: false, type: "string"},             
            separate: {required: false, type: "boolean"},           
            itemSeparator: {required: false, type: "string"},      
            shellQuote: {required: false, type: "boolean"},         
            loadContents: {required: false, type: "boolean"},       
            valueFrom: {required: false, type: "string"}
        }
    },
}
