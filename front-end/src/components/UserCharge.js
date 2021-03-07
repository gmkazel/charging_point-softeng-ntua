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

        // this.normalHandler = this.normalHandler.bind(this)
        // this.fastHandler = this.fastHandler.bind(this)

    }

    componentDidMount() {
        this.Charge();
        this.setState();
    }

    // Handler() {
    //     console.log(this.state);
    // }

    async normalHandler(i) {
        let temp = this.state.selection;
        temp[i] = 'normal';

        try {
            let res2 = await axios.get('http://localhost:8765/evcharge/api/EstimatedTimeAndCost/' + this.state.cars[i].info + '/4.2/normal');
            // console.log(res2);
            temp = this.state.cost;
            temp[i] = res2.data.cost;
            temp = this.state.time;
            temp[i] = res2.data.time;
            // console.log(this.state);
        
        }
        catch (err) {
            console.log(err);
        }       
    }

    async fastHandler() {
        // let temp = this.state.selection;
        // temp[i] = 'fast';
        // // let res2 = await axios.get('http://localhost:8765/evcharge/api/EstimatedTimeAndCost/' + this.state.cars[i].info + '/4.2/fast');
    }

    async Charge() {
        let userID = jwt.decode(JSON.parse(localStorage.getItem('login')).token)._id;

        try {
            let res = await axios.get('http://localhost:8765/evcharge/api/queries/userCars/' + userID);
            // console.log(res);

            this.setState({
                cars: res.data,
                length: res.data.length
            });

            let temp = [];
            let temp2 = [];
            let temp3 = [];
            for (let i = 0; i < this.state.length; i++) {
                temp.push('normal');
                temp2.push('Expected cost: 0');
                temp3.push('Expected time: 0')
            }
            this.setState({
                selection: temp,
                cost: temp2,
                time: temp3
            })
            
            
            var rows = [];
            for (let i = 0; i < this.state.length; i++) {
                rows.push(
                    <div className="row justify-content-around align-items-center" key={i}>
                        <div className="reviewstation">
                            <h3>{this.state.cars[i].brand + ' ' + this.state.cars[i].model}</h3>
                            <p>Total battery capacity: {this.state.cars[i].usable_battery_size}</p>
                            <p>Current battery capacity: 4.2</p>
                            <fieldset>
                                <span>Normal </span>
                                <input type="radio" id="normal" name={i} value="normal" onChange={() => this.normalHandler(i)} defaultChecked/>
                                <span> Fast </span>
                                <input type="radio" id="fast" name={i} value="fast" onChange={() => this.fastHandler(i)}/>
                            </fieldset>
                            <br/>
                            <p>{this.state.cost[i]}</p>
                            <p>{this.state.time[i]}</p>
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
                {/* <button className="btn btn-sm btn-success" type="submit" onClick={() => this.Handler()}>Estimate</button> */}
                <div className="container-fluid">
                    {this.state.render}
                </div>
            </div>
        );
    }
}

export default UserCharge;