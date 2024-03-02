export const commandLineTool = {
    class: {
        type: ["constant"],
        value: "CommandLineTool",
        required: true,
    },
    cwlVersion: {
        type: ["string"],
        required: true,
    },
    /*baseCommand: {
        type: ["string", "string[]"],
        required: false,
    },*/
    intent: {
        type: ["string[]"],
        required: false,
    },
    id: {
        type: ["string"],
        required: false,  
    },
    label: {
        type: ["string"],
        required: false,
    },
    doc: {
        type: ["string","string[]"],
        required: false,
    },/*
    requirements: {
        type: ["string"],
        required: false,
    },
    hints: {
        type: ["string"],
        required: false,
    },*/
    stdin: {
        type: ["string","expression"],
        required: false,
    },
    stdout: {
        type: ["string","expression"],
        required: false,
    },
    stderr: {
        type: ["string","expression"],
        required: false,
    },
    successCodes: {
        type: ["int[]"],
        required: false,
        validation: {
            regex: ["^[0-9]+$"],
            message: ["Only numbers are allowed"]
        }
    },
    temporaryFailCodes: {   
        type: ["int[]"],
        required: false,
        validation: {
            regex: ["^[0-9]+$"],
            message: ["Only numbers are allowed"]
        }
    },
    permanentFailCodes: {
        type: ["int[]"],
        required: false,
        validation: {
            regex: ["^[0-9]+$"],
            message: ["Only numbers are allowed"]
        }
    },
}
