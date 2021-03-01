import 'bootstrap/dist/css/bootstrap.css';
import MyReview from './MyReview';
import NavBar2 from '../components/NavBar2';
import ParkingownerLinks from './ParkingownerLinks';

function ParkingOwnerReview() {
    return (
        <div>
            <NavBar2/>

            <ParkingownerLinks/>

            <MyReview/>
            <MyReview/>
            <MyReview/>
        </div>
    );
}

export default ParkingOwnerReview;
