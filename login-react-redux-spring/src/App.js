import React from 'react';
import Login from './components/Login'
import MainContent from './components/MainContent'
import Product from './components/Product'
import Category from './components/Category'
import AddCategory from './components/AddCategory'
import UpdateCategory from './components/UpdateCategory'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import './style.css'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const routes=[
    {id: 1, path:'/MainContent', component: MainContent },
    {id: 2, path:'/Product', component: Product},
    {id: 3, path:'/Category', component: Category},
    {id: 4, path:'/AddCategory', component: AddCategory},
    {id: 5, path:'/UpdateCategory', component: UpdateCategory},
    {id: 6, path:'/AddProduct', component: AddProduct},
    {id: 7, path:'/UpdateProduct', component: UpdateProduct}
]

class App extends React.Component {

    render() {
        let a = routes.map((route) => {
            return <Route
                key={route.id}
                path={route.path} render={
                    (props) => {
                        return this.props.isAuth ?
                            <route.component {...props} /> : <Redirect to="/" />
                    }
                } />
        })
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact render={(props) => { return <Login {...props} /> }} />
                        {a}
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth
    }
}

export default connect(mapStateToProps)(App)