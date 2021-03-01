import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    // Link,
    Redirect,
    // NavLink
} from "react-router-dom";

import MainPage from '../pages/mainpage';
//EnergyEmployeePages
import EnergyEmployeeAnalytics from '../components/EnergyEmployeeAnalytics';
import EnergyEmployeeFullHistory from '../components/EnergyEmployeeFullHistory';

const EnergyEmployeePage = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/energyemployee/analytics" component={EnergyEmployeeAnalytics}/>
          <Route exact path="/energyemployee/analytics/history" component={EnergyEmployeeFullHistory}/>
          <Redirect to="/energyemployee/analytics"/>
        </Switch>
      </Router>
    </div>
  );
};

export default EnergyEmployeePage;
