// State: Represent a state for file cwl in Redux
const initialState = {
    name: '',
    data: '',
    cwlobject: '',
    activeNode: '',
    nodePositions: {},
    generalModified: false,
    nodeModified: false,
    errorElementsNode: [],
    errorElementsGeneral: [],
    errorEnabled: ''
};

/**
 * Checks if the state is empty.
 * 
 * @returns {boolean} True if both name and data are false, otherwise false.
 */
function isStateEmpty(state) {
    return !state.cwlobject;
}

export { initialState, isStateEmpty };