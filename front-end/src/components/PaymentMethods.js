import 'bootstrap/dist/css/bootstrap.css';
import './PaymentMethods.css';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';

function PaymentMethod() {
    var rows = [];
    let numrows = 3;
    let type='Credit Card';
    let number=[
        '1234',
        '7890',
        '4567'
    ];
    let expdate=[
        '0618',
        '1221',
        '1109'
    ];
    for (var i = 0; i < numrows; i++) {
        rows.push(
            <div className="payment">
                <h3>{type}</h3>
                <p>Card Number: **** **** **** {number[i]}</p>
                <span>Valid Through: {expdate[i].slice(0,2)}/20{expdate[i].slice(2)}</span>
            </div>
        );
    }

    return rows;
}

function PaymentMethods() {
    return (
        <div>
            <NavBar2/>

            <UserLinks/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <tbody>
                        {PaymentMethod()}
                    </tbody>
                </div>
            </div>

            {/* <PaymentMethod/>
            <PaymentMethod/>
            <PaymentMethod/> */}

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/user/paymentmethods/add"><button className="btn btn-primary">+ Add a new payment method</button></Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethods;
