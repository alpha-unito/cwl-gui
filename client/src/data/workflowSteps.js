const workflowStepInputMap = {
    id: {
        required: true,
        type: ["string"],
    },
    source: {
        required: true,
        type: ["string"],
    },
}

const workflowStepInput = {
    id: {
        required: false,
        type: ["string"],
    },
    source: {
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
    label: {
        required: false,
        type: ["string"]
    },
    default: {
        required: false,
        type: ["string","string[]"],
    },
    valueFrom: {
        required: false,
        type: ["string","expression"],
    }
}

const workflowStepOutput = {
    id: {
        required: false,
        type: ["string"],
    },
}

export const workflowSteps = {
    id: {
        required: false,
        type: ["string"],
    },
    in: {
        required: true,
        type: ["component[]","component[map]"],
        component: [workflowStepInput, workflowStepInputMap]
    },
    out: {
        required: true,
        type: ["string[]"/*, "component[]"*/],
        component: [null/*, workflowStepOutput*/]
    },
    run: {
        required: true,
        type: ["string"],
    },
    label: {
        required: false,
        type: ["string"],
    },
    doc: {
        required: false,
        type: ["string","string[]"],
    },
    //requirements:{},
    //hints:{},
    when: {
        required: false,
        type: ["expression"],
    },
    scatter: {
        required: false,
        type: ["string","string[]"],
    },
    scatterMethod: {
        required: false,
        type: ["enum"],
        values: ["dotproduct","nested_crossproduct","flat_crossproduct"]
    }
}
