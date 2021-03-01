import 'bootstrap/dist/css/bootstrap.css';
import Charger from './Charger';
import NavBar2 from '../components/NavBar2';
import ParkingownerLinks from './ParkingownerLinks';
import { Link } from 'react-router-dom'

function ParkingOwnerManage() {
    return (
        <div>
            <NavBar2/>

            <ParkingownerLinks/>

            <Charger/>
            <Charger/>
            <Charger/>

            <div className="row justify-content-around align-items-center">
                <Link to="/parkingowner/manage/add"><button className="btn btn-primary">+ Add a new Charger</button></Link>
            </div>
        </div>
    );
}

export default ParkingOwnerManage;