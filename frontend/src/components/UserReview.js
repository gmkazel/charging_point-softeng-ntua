import 'bootstrap/dist/css/bootstrap.css';
import ReviewStation from './ReviewStation';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';

function UserReview() {
    return (
        <div>
            <NavBar2/>

            <UserLinks/>

            <ReviewStation/>
            <ReviewStation/>
            <ReviewStation/>
        </div>
    );
}

export default UserReview;