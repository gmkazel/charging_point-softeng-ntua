import 'bootstrap/dist/css/bootstrap.css';
import './ParkingOwnerManage.css';
import NavBar2 from '../components/NavBar2';
import ParkingOwnerLinks from './ParkingOwnerLinks';
import { Link } from 'react-router-dom'

function Station() {
    var rows = [];
    let numrows = 3;
    let stationname=[
        'Station1',
        'Station2',
        'Station3'
    ];
    for (var i = 0; i < numrows; i++) {
        rows.push(
            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <div className="parkingreviewstation">
                        <h3>{stationname[i]}</h3>
                        <div className="button"><button type="submit" className="btn btn-danger btn-block">Delete</button></div>
                    </div>
                </div>
            </div>
        );
    }    
    return rows;
}

function ParkingOwnerManage() {
    return (
        <div>
            <NavBar2/>

            <ParkingOwnerLinks/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <tbody>
                        {Station()}
                    </tbody>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/parkingowner/manage/add"><button className="btn btn-primary">+ Add a new station</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ParkingOwnerManage;