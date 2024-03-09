import {configureStore} from '@reduxjs/toolkit';
import {initialState} from '../models/State';

const cwlReducer = (state = initialState, action) => {
    if(action.type === "set"){
        return {
            ...state, 
            ...action.value
        };
    }else if(action.type === "removeErrorNode"){
        return {
            ...state, 
            errorElementsNode: state.errorElementsNode.includes(action.value.key) ? [...state.errorElementsNode].filter(element => element !== action.value.key) : state.errorElementsNode
        };
    }else if(action.type === "removeErrorGeneral"){
        return {
            ...state, 
            errorElementsNode: state.errorElementsGeneral.includes(action.value.key) ? [...state.errorElementsGeneral].filter(element => element !== action.value.key) : state.errorElementsGeneral
        };
    }else if(action.type === "addErrorNode"){
        return {
            ...state, 
            errorElementsNode: state.errorElementsNode.includes(action.value.key) ? state.errorElementsNode : [...state.errorElementsNode, action.value.key]
        };
    }else if(action.type === "addErrorGeneral"){
        return {
            ...state, 
            errorElementsGeneral: state.errorElementsGeneral.includes(action.value.key) ? state.errorElementsGeneral : [...state.errorElementsGeneral, action.value.key]
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