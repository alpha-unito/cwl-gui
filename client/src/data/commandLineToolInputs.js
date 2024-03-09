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

const inputBinding = {
    loadContents: {
        required: false,
        type: ["boolean"],
    },
    position: {
        required: false,
        type: ["int","expression"],
        validation:{
            regex: ["^[0-9]+$", null],
            message: ["Only numbers are allowed", null]
        }
    },
    prefix: {
        required: false,
        type: ["string"],
    },
    separate: {
        required: false,
        type: ["boolean"],
    },
    itemSeparator: {
        required: false,
        type: ["string"],
    },
    valueFrom: {
        required: false,
        type: ["string","expression"],
    },
    shellQuote: {
        required: false,
        type: ["boolean"],
    },
}

export const cltInputs = {
    type: {
        required: true,
        type: ["select"],
        options: [
            "stdin",
            "File",
            "Directory",
            "string",
            "int",
            "float",
            "long",
            "double",
            "boolean",
            "Any",
            "File[]",
            "Directory[]",
            "string[]",
            "int[]",
            "float[]",
            "long[]",
            "double[]",
            "stdin?",
            "File?",
            "Directory?",
            "string?",
            "int?",
            "float?",
            "long?",
            "double?",
            "boolean?",
            "Any?",
            "File[]?",
            "Directory[]?",
            "string[]?",
            "int[]?",
            "float[]?",
            "long[]?",
            "double[]?"
        ],
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
        type: ["string","string[]","expression"],
    },
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
    default: {
        required: false,
        type: ["string"],
    },
    inputBinding: {
        required: false,
        type: ["component"],
        component: inputBinding
    },
    
}
