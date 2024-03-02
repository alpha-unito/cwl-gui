export const workflow = {
    class: {
        type: ["constant"],
        value: "Workflow",
        required: true,
    },
    cwlVersion: {
        type: ["string"],
        required: true,
    },
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

}
