import { combineReducers } from 'redux'

const userInfo = (state = {}, action) => {
    if (action.type === 'user') {
        return action.payload
    }
    return state
}

const product = (state = [], action) => {
    if (action.type === 'product') {
        return action.payload
    }
    return state
}

const category = (state = [], action) => {
    if (action.type === 'category') {
        return action.payload
    }
    return state
}

const auth = (state = false, action) => {
    if (action.type === 'auth') {
        return state = action.payload
    }
    return state
}

const updateCategoryReducer= (state = false, action) => {
    if (action.type === 'updateCategory') {
        return state = action.payload
    }
    return state
}

const updateProductReducer= (state = false, action) => {
    if (action.type === 'updateProduct') {
        return state = action.payload
    }
    return state
}


export default combineReducers({
    user: userInfo,
    product: product,
    category:category,
    auth: auth,
    updateCategory:updateCategoryReducer,
    updateProduct:updateProductReducer
})