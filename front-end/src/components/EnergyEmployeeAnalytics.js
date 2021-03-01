import 'bootstrap/dist/css/bootstrap.css';
import './EnergyEmployeeAnalytics.css';
import NavBar2 from '../components/NavBar2';
import EnergyLineChart from './EnergyLineChart';
import { Link } from 'react-router-dom';

let stationsData = [
    { value: 'All Stations' },
    { value: 'Station 1' },
    { value: 'Station 2' }
];

let data1=[5, 2, 1, 3, 3];

function EnergyEmployeeAnalytics() {
    return (
        <div>
            <NavBar2/>

            <br/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center no-gutters">
                    <select id="stations" name="stations" value={stationsData.value} className="dropdownmargin">
                        {stationsData.map((e, key) => {return <option key={key} value={e.value}>{e.value}</option>;})}
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
                <EnergyLineChart/>
            </div>
            <br/>
            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/energyemployee/analytics/history"><button className="btn btn-primary">See full charge history</button></Link>
                </div>
            </div>
        </div>
    );
}

export default EnergyEmployeeAnalytics;
export {data1};
