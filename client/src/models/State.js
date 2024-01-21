// State: A class to represent a state for file cwl in Redux
class State{

    constructor(name = '', data = ''){
        this.name = name;
        this.data = data;
    }

    /**
     * Checks if the state is empty.
     * 
     * @returns {boolean} True if both name and data are false, otherwise false.
     */
    isEmpty(){
        return !(this.name && this.data);
    }
    

}

export default State;