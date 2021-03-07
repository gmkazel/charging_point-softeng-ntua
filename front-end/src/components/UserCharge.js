import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class UserCharge extends Component {
    constructor() {
        super();

        this.state={
            cars: null,
            selection: null,
            cost: null,
            time: null,
            length: null,
            render: null
        }
    }

    componentDidMount() {
        this.Charge();
    }

    async Charge() {
        let userID = jwt.decode(JSON.parse(localStorage.getItem('login')).token)._id;

        try {
            let res = await axios.get('http://localhost:8765/evcharge/api/queries/userCars/' + userID);
            console.log(res);

            this.setState({
                charge: res.data,
                length: res.data.length
            });

            let temp = [];
            let temp2 = [];
            for (let i = 0; i < this.state.length; i++) {
                temp.push('normal');
                temp2.push(0);
            }
            this.setState({
                selection: temp,
                cost: temp2,
                time: temp2
            })

            var rows = [];
            for (let i = 0; i < this.state.length; i++) {
                rows.push(
                    <div className="row justify-content-around align-items-center" key={i}>
                        <div className="reviewstation">
                            <h3>{this.state.charge[i].model}</h3>
                            <p>Total battery capacity: {}</p>
                            <p>Current battery capacity: 4.217</p>
                            <fieldset>
                                <span>Normal </span>
                                <input type="radio" id="normal" name={i} value="normal" defaultChecked/>
                                <span> Fast </span>
                                <input type="radio" id="fast" name={i} value="fast"/>
                            </fieldset>
                            <br/>
                            <p>Expected cost: </p>
                            <p>Expected time: </p>
                            <button className="btn btn-sm btn-success" type="submit">Begin charge</button>
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
                    {this.state.render}
                </div>
            </div>
        );
    }
}

export default UserCharge;