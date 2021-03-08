import 'bootstrap/dist/css/bootstrap.css';
import './ParkingOwnerManage.css';
import NavBar2 from '../components/NavBar2';
import ParkingOwnerLinks from './ParkingOwnerLinks';
import { Link } from 'react-router-dom'
import { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class ParkingOwnerManage extends Component {
    constructor() {
        super();

        this.state={
            station:null,
            lenght:null,
            render: null
        }
    }

    componentDidMount() {
        this.Station();
    }

    async Station() {
        let userID = jwt.decode(JSON.parse(localStorage.getItem('login')).token)._id;

        try {
            let res = await axios.get('http://localhost:8765/evcharge/api/queries/userStations/' + userID);
            // console.log(res);
            this.setState({
                station: res.data,
                length: res.data.length
            });
            
        // console.log(this.state);
            
        var rows = [];
        for (let i = 0; i < this.state.length; i++) {
            rows.push(
                <div className="container-fluid" key={i}>
                    <div className="row justify-content-around align-items-center">
                        <div className="parkingreviewstation">
                        <h4>{this.state.station[i].name}</h4>
                        <p>Address: {this.state.station[i].address}</p>
                        <p>Operator: {this.state.station[i].operator}</p>
                        <p>Points:</p>
                        {this.state.station[i].points.map((j, key) => {return <div key={key} value={key}>
                            <span>Point {key+1}: </span>
                            <span >{j}</span><br></br>
                            </div>;})
                            }
                        <br/>
                        <div className="container-fluid" >
                        <div className="row justify-content-around align-items-center">
                        <div className="button"><button type="submit" className="btn btn-primary btn-block">Edit</button></div>
                        <div className="button"><button type="submit" className="btn btn-danger btn-block">Delete</button></div>
                        </div>
                        </div>
                        </div>
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

    render(){
        return (
            <div>
                <NavBar2/>

                <ParkingOwnerLinks/>

                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center">
                            {this.state.render}
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center">
                        <Link to="/parkingowner/manage/add"><button className="btn btn-primary">+ Add a new station</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParkingOwnerManage;