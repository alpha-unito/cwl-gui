// State: A class to represent a state for file cwl in Redux
class State{

    constructor(name = '', data = '', cwlobject = '', node = ''){
        this.name = name;
        this.data = data;
        this.cwlobject = cwlobject;
        this.activeNode = node;
    }

    /**
     * Checks if the state is empty.
     * 
     * @returns {boolean} True if both name and data are false, otherwise false.
     */
    isEmpty(){
        return !(this.name && this.data && this.cwlobject);
    }
    

}

export default State;