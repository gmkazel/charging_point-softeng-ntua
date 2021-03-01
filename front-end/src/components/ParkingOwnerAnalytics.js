import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from '../components/NavBar2';
import ParkingownerLinks from './ParkingownerLinks';
import LineChart from './LineChart';
import { Link } from 'react-router-dom';

let carsData = [
    { value: 'All Cars' },
    { value: 'Tesla' },
    { value: 'Mercedes' }            
];

// let data1=[5, 2, 1, 3, 3];

function ParkingOwnerAnalytics() {
    return (
        <div>
            <NavBar2/>
            <ParkingownerLinks/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center no-gutters">
                    <select id="cars" name="cars" value={carsData.value} className="dropdownmargin">
                        {carsData.map((e, key) => {return <option key={key} value={e.value}>{e.value}</option>;})}
                    </select>

                    <select id="timeperiod" name="timeperiod">
                        <option value="lastweek">Last Week</option>
                        <option value="lastmonth">Last Month</option>
                        <option value="last3months">Last 3 Months</option>
                        <option value="last6months">Last 6 Months</option>
                        <option value="lastyear">Last Year</option>
                        <option value="alltime">All Time</option>
                    </select>

                    <button className="btn btn-primary buttonmargin">Apply</button>
                </div>
            </div>
            <br/>
            <div className="container-fluid chart">
                <LineChart/>
            </div>
            <br/>
            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/parkingowner/analytics/history"><button className="btn btn-primary">See full charge history</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ParkingOwnerAnalytics;