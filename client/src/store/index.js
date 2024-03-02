import {configureStore} from '@reduxjs/toolkit';
import {initialState} from '../models/State';

const cwlReducer = (state = initialState, action) => {
    if(action.type === "set"){
        return {
            ...state, 
            ...action.value
        };
    }else if(action.type === "reset"){
        return initialState;
    }

    return state;
};

const store = configureStore({
    reducer: {
        cwl_data: cwlReducer
    }
});
  
export default store;