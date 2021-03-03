import 'bootstrap/dist/css/bootstrap.css';
import './EnergyEmployeeAnalytics.css';
import NavBar2 from '../components/NavBar2';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

let stationData = [
    { value: 'All Stations' },
    { value: 'Station1' },
    { value: 'Station2' }
];

let labels1=['Jan', 'Feb', 'Mar', 'Apr', 'May'];
let label_km='Total sessions completed';
let label_kW='kWatts consumed';
let data1=[5, 2, 1, 3, 3];
let data2=[56, 13, 6, 19, 29];

function LineChart() {
    const data = {
        labels: labels1,
        datasets: [
            {
                label: label_km,
                data: data1,
                backgroundColor: 'rgba(255, 69, 0, 0.6)',
                borderColor: 'rgba(0, 0, 139)',
                pointBackgroundColor: 'rgba(0, 0, 139)'
            },
            {
                label: label_kW,
                data: data2,
                backgroundColor: 'rgba(255, 69, 0, 0.6)',
                borderColor: 'rgba(0, 0, 139)',
                pointBackgroundColor: 'rgba(0, 0, 139)'
            }
        ]
    }

    return (
        <Line data={data}/>
    );
}

function EnergyEmployeeAnalytics() {
    return (
        <div>
            <NavBar2/>

            <br/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center no-gutters">
                    <select id="stations" name="stations" value={stationData.value} className="dropdownmargin">
                        {stationData.map((e, key) => {return <option key={key} value={e.value}>{e.value}</option>;})}
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
                {LineChart()}
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
