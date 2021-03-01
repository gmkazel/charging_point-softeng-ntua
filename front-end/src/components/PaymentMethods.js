import 'bootstrap/dist/css/bootstrap.css';
import PaymentMethod from '../components/PaymentMethod';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';

function PaymentMethods() {
    return (
        <div>
            <NavBar2/>

            <UserLinks/>

            <PaymentMethod/>
            <PaymentMethod/>
            <PaymentMethod/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/user/paymentmethods/add"><button className="btn btn-primary">+ Add a new payment method</button></Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethods;
