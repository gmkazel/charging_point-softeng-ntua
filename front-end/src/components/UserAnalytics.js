import 'bootstrap/dist/css/bootstrap.css';
import './UserAnalytics.css';
import NavBar2 from '../components/NavBar2';
import { Line } from 'react-chartjs-2';
import UserLinks from './UserLinks';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';

let carsData = [
    { value: 'All Cars' },
    { value: 'Tesla' },
    { value: 'Mercedes' }
];

let label_km='Kilometers (in thousands) done';
let label_kW='kWatts consumed';
let label_money='Money spent';

class UserAnalytics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data1: [5, 2, 1, 3, 3, 6, 9],
            data2: [56, 13, 6, 19, 29, 19, 12],
            data3: [63, 10, 8, 31, 15, 42, 17],
            selectValue2: 'lastweek',
            xaxis: [
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sun'
            ]
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.changeHandler2 = this.changeHandler2.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8765/evcharge/api/SessionsPerPoint/6041303d0bd42e0dc486c62e/20190112/20191020')
        .then(res => {
            console.log(res.data.ChargingSessionsList);
        })
    }

    /*async*/ clickHandler() {
        if (this.state.selectValue2 === 'lastweek') {
            this.setState({
                xaxis: [
                    'Day 1',
                    'Day 2',
                    'Day 3',
                    'Day 4',
                    'Day 5',
                    'Day 6',
                    'Day 7'
                ]
            })
        }
        else if (this.state.selectValue2 === 'lastmonth') {
            this.setState({
                xaxis: [
                    'Week 1',
                    'Week 2',
                    'Week 3',
                    'Week 4'
                ]
            })
        }
        else if (this.state.selectValue2 === 'last3months') {
            this.setState({
                xaxis: [
                    'Week 1',
                    'Week 2',
                    'Week 3',
                    'Week 4',
                    'Week 5',
                    'Week 6',
                    'Week 7',
                    'Week 8',
                    'Week 9',
                    'Week 10',
                    'Week 11',
                    'Week 12'
                ]
            })
        }
        else if (this.state.selectValue2 === 'last6months') {
            this.setState({
                xaxis: [
                    'Month 1',
                    'Month 2',
                    'Month 3',
                    'Month 4',
                    'Month 5',
                    'Month 6'
                ]
            })
        }
        else if (this.state.selectValue2 === 'lastyear') {
            this.setState({
                xaxis: [
                    'Month 1',
                    'Month 2',
                    'Month 3',
                    'Month 4',
                    'Month 5',
                    'Month 6',
                    'Month 7',
                    'Month 8',
                    'Month 9',
                    'Month 10',
                    'Month 11',
                    'Month 12'
                ]
            })
        }

        this.setState({
            data1: [
                42,
                42,
                42,
                42,
                42,
                42,
                42
            ]
        })
        // await setTimeout(() => {}, 1)
        // console.log(this.state)
    }

    LineChart() {
        return (
            <Line data={
                {labels: this.state.xaxis,
                datasets: [
                    {
                        label: label_km,
                        data: this.state.data1,
                        backgroundColor: 'rgba(255, 69, 0, 0.6)',
                        borderColor: 'rgba(0, 0, 139)',
                        pointBackgroundColor: 'rgba(0, 0, 139)'
                    },
                    {
                        label: label_kW,
                        data: this.state.data2,
                        backgroundColor: 'rgba(255, 69, 0, 0.6)',
                        borderColor: 'rgba(0, 0, 139)',
                        pointBackgroundColor: 'rgba(0, 0, 139)'
                    },
                    {
                        label: label_money,
                        data: this.state.data3,
                        backgroundColor: 'rgba(255, 69, 0, 0.6)',
                        borderColor: 'rgba(0, 0, 139)',
                        pointBackgroundColor: 'rgba(0, 0, 139)'
                    }
                ]}
            }/>
        )
    }

    changeHandler2(e) {
        this.setState({
            selectValue2: e.target.value
        })
    }

    render() {
        return (
            <div>
                <NavBar2/>

                <UserLinks/>

                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center no-gutters">
                        <select id="cars" name="cars" value={carsData.value} className="dropdownmargin">
                            {carsData.map((e, key) => {return <option key={key} value={e.value}>{e.value}</option>;})}
                        </select>

                        <select id="timeperiod" name="timeperiod" onChange={this.changeHandler2}>
                            <option value="lastweek">Last Week</option>
                            <option value="lastmonth">Last Month</option>
                            <option value="last3months">Last 3 Months</option>
                            <option value="last6months">Last 6 Months</option>
                            <option value="lastyear">Last Year</option>
                        </select>

                        <button className="btn btn-primary buttonmargin" onClick={this.clickHandler}>Apply</button>
                    </div>
                </div>
                <br/>
                <div className="container-fluid chart">
                    {this.LineChart()}
                </div>
                <br/>
                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center">
                        <Link to="/user/analytics/history"><button className="btn btn-primary">See full charge history</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserAnalytics;
