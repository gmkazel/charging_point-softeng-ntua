import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from '../components/NavBar2';
import { Link } from 'react-router-dom'

function ParkingFullHistory() {
    return (
        <div>
            <NavBar2/>

            <h1>kalispera soy</h1>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/user/analytics"><button className="btn btn-primary">&#8592; Back to analytics</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ParkingFullHistory;