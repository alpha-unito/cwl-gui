import {configureStore} from '@reduxjs/toolkit';
import State from '../models/State';

const cwlReducer = (state = new State(), action) => {
    if(action.type === "set"){
        return new State(action.value.name, action.value.content, action.value.object, action.value.node);
    }

    return new State();
};

const store = configureStore({
    reducer: {
        cwl_data: cwlReducer
    }
});
  
export default store;