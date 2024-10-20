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

const outputBinding = {
    loadContents: {
        dependency: {
            type: ["File","File[]"]
        },
        required: false,
        type: ["boolean"],
    },
    loadListing: {
        dependency: {
            type: ["Directory","Directory[]"]
        },
        required: false,
        type: ["enum"],
        values: ["no_listing","shallow_listing","deep_listing"]
    },
    glob: {
        required: false,
        type: ["string","expression","string[]"]
    },
    outputEval: {
        required: false,
        type: ["expression"],
    },
}

export const cltOutputs = {
    type: {
        required: true,
        type: ["select"],
        options: ["stdout","stderr","File","Directory","string","int","float","long","double","boolean","Any","File[]","Directory[]","string[]","int[]","float[]","long[]","double[]"],
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
    outputBinding: {
        required: false,
        type: ["component"],
        component: outputBinding
    },
    
}
