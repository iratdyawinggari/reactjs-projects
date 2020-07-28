import {combineReducers} from 'redux';

const calculatorReduce =(operation = null, action) =>{
    if (action.type === 'JUMLAH'){
        return Number(action.payload.num1) + Number(action.payload.num2)
    }else if (action.type === 'KURANG'){
        return Number(action.payload.num1) - Number(action.payload.num2)
    }else if (action.type === 'KALI'){
        return Number(action.payload.num1) * Number(action.payload.num2)
    }else if (action.type === 'BAGI'){
        return Number(action.payload.num1) / Number(action.payload.num2)
    }
    return operation;
}

export default combineReducers({
    calculator:calculatorReduce
})