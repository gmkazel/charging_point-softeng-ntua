import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from '../components/NavBar2';
import ParkingOwnerLinks from './ParkingOwnerLinks';

function MyReview() {
    var rows = [];
    let numrows = 3;
    let stationname=[
        'Station1',
        'Station2',
        'Station3'
    ];
    let clientname=[
        'Konstantinos Rizavas',
        'Mpampis Fesatoglou',
        'Oresths Makrhs'
    ];
    let date=[
        '27/02/2021',
        '03/08/2020',
        '20/06/2020'
    ];
    let rating=[
        5,
        10,
        3
    ];
    let comment=[
        'E trollarete',
        'Test',
        'Gia na doume'
    ]

    for (var i = 0; i < numrows; i++) {
        rows.push(
            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <div className="reviewstation">
                        <h4>{stationname[i]}</h4>
                        <h5>{clientname[i]}</h5>
                        <h6>{date[i]}</h6>
                        <h6>Rating: {rating[i]}</h6>
                        <span>{comment[i]}</span>
                    </div>
                </div>
            </div>
        );
    }    
    return rows;
}

function ParkingOwnerReview() {
    return (
        <div>
            <NavBar2/>

            <ParkingOwnerLinks/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <tbody>
                        {MyReview()}
                    </tbody>
                </div>
            </div>
        </div>
    );
}

export default ParkingOwnerReview;
