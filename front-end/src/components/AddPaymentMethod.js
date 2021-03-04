import './AddPaymentMethod.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from '../components/NavBar2';
import { Link } from 'react-router-dom';
import creditcard from './images/credit-card.png'

function AddPaymentMethod() {
    return (
        <div>
            <NavBar2/>

            <div class="padding">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-header">
                                <h4>Enter your card details</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input class="form-control" id="name" type="text" placeholder="Enter your name"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="ccnumber">Credit Card Number</label>
                                            <div class="input-group">
                                                <input class="form-control" type="text" placeholder="0000 0000 0000 0000" autocomplete="email"/>
                                                <div class="input-group-append">
                                                    <span class="input-group-text">
                                                        <img src={creditcard} alt="creditcard" width="23px" height="100%"/>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-sm-4">
                                        <label for="ccmonth">Month</label>
                                        <select class="form-control" id="ccmonth">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-4">
                                        <label for="ccyear">Year</label>
                                        <select class="form-control" id="ccyear">
                                            <option>2021</option>
                                            <option>2022</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="cvv">CVV/CVC</label>
                                            <input class="form-control" id="cvv" type="text" placeholder="123"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div className="container-fluid">
                                    <div className="row justify-content-around align-items-center">
                                        <button class="btn btn-sm btn-success" type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/user/paymentmethods"><button className="btn btn-primary">&#8592; Back to payment methods</button></Link>
                </div>
            </div>
        </div>
    );
}

export default AddPaymentMethod;