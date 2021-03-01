import 'bootstrap/dist/css/bootstrap.css';
import ReviewStation from './ReviewStation';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';

function UserReview() {
    return (
        <div>
            <NavBar2/>

            <UserLinks/>

            <ReviewStation reviewid="review1"/>
            <ReviewStation reviewid="review2"/>
            <ReviewStation reviewid="review3"/>
        </div>
    );
}

export default UserReview;
