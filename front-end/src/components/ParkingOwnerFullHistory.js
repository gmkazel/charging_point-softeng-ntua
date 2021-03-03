import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from '../components/NavBar2';
import './ParkingOwnerFullHistory.css';
import { Link } from 'react-router-dom';

function Session() {
    var rows = [];
    let numrows = 6;
    let date=[
        '27/01/2020',
        '27/02/2020',
        '27/03/2020',
        '27/04/2020',
        '27/05/2020',
        '27/06/2020'
    ];
    let charger=[
        'Charger 1',
        'Charger 2',
        'Charger 1',
        'Charger 4',
        'Charger 8',
        'Charger 6'
    ];
    let KW=[
        '5',
        '10',
        '15',
        '20',
        '25',
        '30'
    ];

    for (var i = 0; i < numrows; i++) {
        rows.push(
            <div className="reviewstation">
                <h4 className="state">Done</h4>
                <span>Date: {date[i]}</span>
                <span className="time">Time: 17:00-17:22</span>
                <br/>
                <span>Charger: {charger[i]}</span>
                <br/>
                <span>Total KW: {KW[i]}</span><span className="money">Money: 10$</span>
            </div>
        );
    }

    return rows;
}

function ParkingFullHistory() {
    return (
        <div>
            <NavBar2/>

            <br/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <Link to="/user/analytics"><button className="btn btn-primary">&#8592; Back to analytics</button></Link>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <tbody>
                        {Session()}
                    </tbody>
                </div>
            </div>
        </div>
    );
}

export default ParkingFullHistory;