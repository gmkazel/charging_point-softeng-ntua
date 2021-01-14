import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    // Link,
    Redirect
} from "react-router-dom";

//Pages
import MainPage from './pages/mainpage';
import NotFoundPage from './pages/404';
import UserPage from './pages/user';

class App extends Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/user" component={UserPage}/>
                    <Route exact path="/user/analytics" component={UserPage}/>
                    <Route exact path="/user/paymentmethods" component={UserPage}/>
                    <Route exact path="/user/review" component={UserPage}/>
                    <Route exact path="/user/charge" component={UserPage}/>
                    <Route exact path="/404" component={NotFoundPage}/>
                    <Redirect to="/404"/>
                </Switch>
            </Router>
        )
    }
}

export default App;
