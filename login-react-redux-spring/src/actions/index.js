export const addUserInfo = (user) => {
    return {
        type: 'user',
        payload: user
    }
}

export const addProduct = (product) => {
    return {
        type: 'product',
        payload: product
    }
}

export const addCategory = (category) => {
    return {
        type: 'category',
        payload: category
    }
}

export const isAuth = (auth) => {
    return {
        type: 'auth',
        payload: auth
    }
}

export const updateCategoryAction = (category) => {
    return {
        type: 'updateCategory',
        payload: category
    }
}

export const updateProductAction = (product) => {
    return {
        type: 'updateProduct',
        payload: product
    }
}
