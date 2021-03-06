import 'bootstrap/dist/css/bootstrap.css';
import './PaymentMethods.css';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class PaymentMethods extends Component {
    constructor() {
        super();

        this.state={
            payment_card: null,
            length: null,
            render: null
        }
    }

    componentDidMount() {
        this.PaymentMethod();
    }

    async PaymentMethod() {
        let userID = jwt.decode(JSON.parse(localStorage.getItem('login')).token)._id;

        try {
            let res = await axios.get('http://localhost:8765/evcharge/api/queries/userCards/' + userID);
            this.setState({
                payment_card: res.data[0].payment_card,
                length: res.data[0].payment_card.length
            });

            var rows = [];
            for (var i = 0; i < this.state.length; i++) {
                rows.push(
                    <div className="row justify-content-around align-items-center" key={i}>
                        <div className="payment">
                            <h3>Credit Card</h3>
                            <p>Card Number: **** **** **** {this.state.payment_card[i].number.slice(this.state.payment_card[i].number.length - 4)}</p>
                            <p>Valid Through: {this.state.payment_card[i].exp_date.slice(0, 2)}/20{this.state.payment_card[i].exp_date.slice(3)}</p>
                            <span>Owner: {this.state.payment_card[i].owner}</span>
                        </div>
                    </div>
                );
            }
            this.setState({
                render: rows
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <NavBar2/>

                <UserLinks/>

                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center">
                        {this.state.render}
                    </div>

                    <div className="row justify-content-around align-items-center">
                        <Link to="/user/paymentmethods/add"><button className="btn btn-primary">+ Add a new payment method</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default PaymentMethods;
