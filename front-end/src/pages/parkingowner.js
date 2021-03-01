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
//ParkingOwnerPages
import ParkingOwnerAnalytics from '../components/ParkingOwnerAnalytics';
import ParkingOwnerFullHistory from '../components/ParkingOwnerFullHistory';
import ParkingOwnerManage from '../components/ParkingOwnerManage';
import AddCharger from '../components/AddCharger';
import ParkingOwnerReview from '../components/ParkingOwnerReview';

const ParkingOwnerPage = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/parkingowner/analytics" component={ParkingOwnerAnalytics}/>
          <Route exact path="/parkingowner/analytics/history" component={ParkingOwnerFullHistory}/>
          <Route exact path="/parkingowner/manage" component={ParkingOwnerManage}/>
          <Route exact path="/parkingowner/manage/add" component={AddCharger}/>
          <Route exact path="/parkingowner/review" component={ParkingOwnerReview}/>
          <Redirect to="/parkingowner/analytics"/>
        </Switch>
      </Router>
    </div>
  );
};

export default ParkingOwnerPage;
