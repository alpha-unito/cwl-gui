const secondaryFiles = {
    pattern: {
        required: true,
        type: ["string","expression"],
    },
    required: {
        required: false,
        type: ["boolean","expression"],
    }
}

export const workflowOutputs = {
    type: {
        required: true,
        type: ["select"],
        options: ["File","Directory","string","int","float","long","double","boolean","Any","File[]","Directory[]","string[]","int[]","float[]","long[]","double[]"],
    },
    id: {
        required: false,
        type: ["string"]
    },
    label: {
        required: false,
        type: ["string"]
    },
    secondaryFiles: {
        dependency: {
            type: ["File","File[]"]
        },
        required: false,
        type: ["component[]"],
        component: secondaryFiles
    },
    streamable: {
        dependency: {
            type: ["File","File[]"]
        },
        required: false,
        type: ["boolean"],
    },
    doc: {
        required: false,
        type: ["string","string[]"],
    },
    format: {
        dependency: {
            type: ["File","File[]"]
        },
        required: false,
        type: ["string","expression"],
    },
    outputSource: {
        required: false,
        type: ["string","string[]"],
    },
    linkMerge: {
        required: false,
        type: ["enum"],
        values: ["merge_nested","merge_flattened"]
    },
    pickValue: {
        required: false,
        type: ["enum"],
        values: ["first_non_null","the_only_non_null","all_non_null"]
    },
    
}
