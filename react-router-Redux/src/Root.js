import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {changeSessionReducer, userActiveReducer} from "./reducers/user";
import {getListProduct, updateProduct} from "./reducers/product";
import {getListCategory, selectCategory, updateCategory} from "./reducers/category";
import {getListOutlet,updateOutlet} from './reducers/outlet';
import {uploadFile,getListFile} from './reducers/fileTransaction'

class Root extends React.Component {
    render() {
        const appReducer = combineReducers({
            userActive: userActiveReducer,
            changeSession: changeSessionReducer,
            listProduct: getListProduct,
            updateProduct: updateProduct,
            listCategory: getListCategory,
            updateCategory: updateCategory,
            selectCategory: selectCategory,
            listOutlet:getListOutlet,
            updateOutlet:updateOutlet,
            uploadFile:uploadFile,
            listFile:getListFile
        });

        const rootReducer = (state, action) => {
            if (action.type === 'LOGOUT') {
                state = undefined;
            }

            return appReducer(state, action);
        };
        const store = createStore(rootReducer);
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default Root;