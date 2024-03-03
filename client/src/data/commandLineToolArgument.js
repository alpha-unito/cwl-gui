const  CommandLineBinding = {
    loadContents: {
        type: ["boolean"],
        required: false,
    },
    position: {
        type: ["int","expression"],
        required: false,
        validation:{
            regex: ["^[0-9]+$", null],
            message: ["Only numbers are allowed", null]
        }
    },
    prefix: {
        type: ["string"],
        required: false,
    },
    separate: {
        type: ["boolean"],
        required: false,
    },
    itemSeparator: {
        type: ["string"],
        required: false,
    },
    valueFrom: {
        type: ["string","expression"],
        required: false,
    },
    shellQuote: {
        type: ["boolean"],
        required: false,
    },
}

export const cltArgument = {
    nokey: {
        type: ["string","expression","component"],
        component: CommandLineBinding,
        required: false,
    }
}
