import React from 'react';
import Login from "./components/login/Login";
import MainContent from "./components/mainContent/MainContent";
import './app.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MasterShip from "./components/ship/MasterShip";
import MasterHarbor from "./components/Harbor/MasterHarbor";
import MasterShipUpdate from "./components/ship/MasterShipUpdate";
import MasterHarborUpdate from "./components/Harbor/MasterHarborUpdate";
import MasterDocks from "./components/docks/MasterDocks";
import MasterDocksUpdate from "./components/docks/MasterDocksUpdate";
import Transaction from "./components/Transaction/Transaction";
import TransactionUpdate from "./components/Transaction/TransactionUpdate";
import MasterDockStatus from "./components/dockStatus/MasterDockStatus";
import MasterDockStatusUpdate from "./components/dockStatus/MasterDockStatusUpdate";
import MasterShipStatus from "./components/shipStatus/MasterShipStatus";
import MasterShipStatusUpdate from "./components/shipStatus/MasterShipStatusUpdate";
import MasterHarborStatus from "./components/harborStatus/MasterHarborStatus";
import MasterHarborStatusUpdate from "./components/harborStatus/MasterHarborStatusUpdate";

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path='/protected/main/masterShipUpdate' Component={MasterShipUpdate}/>
                    <PrivateRoute path='/protected/main/masterHarborUpdate' Component={MasterHarborUpdate}/>
                    <PrivateRoute path='/protected/main/masterDocksUpdate' Component={MasterDocksUpdate}/>
                    <PrivateRoute path='/protected/main/transactionUpdate' Component={TransactionUpdate}/>
                    <PrivateRoute path='/protected/main/masterShip' Component={MasterShip}/>
                    <PrivateRoute path='/protected/main/masterShipStatus' Component={MasterShipStatus}/>
                    <PrivateRoute path='/protected/main/masterShipStatusUpdate' Component={MasterShipStatusUpdate}/>
                    <PrivateRoute path='/protected/main/masterHarbor' Component={MasterHarbor}/>
                    <PrivateRoute path='/protected/main/masterHarborStatus' Component={MasterHarborStatus}/>
                    <PrivateRoute path='/protected/main/masterHarborStatusUpdate' Component={MasterHarborStatusUpdate}/>
                    <PrivateRoute path='/protected/main/masterDocks' Component={MasterDocks}/>
                    <PrivateRoute path='/protected/main/masterDockStatus' Component={MasterDockStatus}/>
                    <PrivateRoute path='/protected/main/masterDockStatusUpdate' Component={MasterDockStatusUpdate}/>
                    <PrivateRoute path='/protected/main/transaction' Component={Transaction}/>
                    <PrivateRoute path='/protected/main' Component={MainContent}/>
                    <Route path="/"
                           render={(props) => <Login {...props}/>}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
