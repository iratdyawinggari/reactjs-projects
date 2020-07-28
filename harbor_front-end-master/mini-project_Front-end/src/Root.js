import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {changeSessionReducer, userActiveReducer} from "./reducers/user";
import {ListMenu, menuActive, menuHeaderActive} from "./reducers/menu";


export class Root extends React.Component {
    render() {
        const appReducer = combineReducers({
            userActive: userActiveReducer,
            changeSession: changeSessionReducer,
            menuActive: menuActive,
            menuHeaderActive: menuHeaderActive,
            listMenu: ListMenu,
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