import 'bootstrap/dist/css/bootstrap.css';
import './UserReview.css';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';

function ReviewStation() {
    var rows = [];
    let numrows = 3;
    let stationname=[
        'Station1',
        'Station2',
        'Station3'
    ];
    let address=[
        'Dimitriadou 13',
        'Olympou 15',
        'Argirokastrou 19B'
    ];
    let name=[
        'group1',
        'group2',
        'group3'
    ];
    for (var i = 0; i < numrows; i++) {
        rows.push(
            <div className="reviewstation">
                <h3>{stationname[i]}</h3>
                <span>Address: {address[i]}</span>
                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center">
                        <fieldset>
                            <span>1- </span>
                            <input type="radio" id="1" name={name[i]} value="1"/>
                            <small> </small>
                            <input type="radio" id="2" name={name[i]} value="2"/>
                            <small> </small>
                            <input type="radio" id="3" name={name[i]} value="3"/>
                            <small> </small>
                            <input type="radio" id="4" name={name[i]} value="4"/>
                            <small> </small>
                            <input type="radio" id="5" name={name[i]} value="5"/>
                            <small> </small>
                            <input type="radio" id="6" name={name[i]} value="6"/>
                            <small> </small>
                            <input type="radio" id="7" name={name[i]} value="7"/>
                            <small> </small>
                            <input type="radio" id="8" name={name[i]} value="8"/>
                            <small> </small>
                            <input type="radio" id="9" name={name[i]} value="9"/>
                            <small> </small>
                            <input type="radio" id="10" name={name[i]} value="10"/>
                            <span> -10</span>
                        </fieldset>
                    </div>
                </div>
                <p>Comments (optional):</p>
                <div class="input-group">
                    <textarea class="form-control"></textarea>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </div>
        );
    }

    return rows;
}

function UserReview() {
    return (
        <div>
            <NavBar2/>

            <UserLinks/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <h4>Last 5 stations you visited</h4>
                </div>
                <div className="row justify-content-around align-items-center">
                    <tbody>
                        {ReviewStation()}
                    </tbody>
                </div>
            </div>

            {/* <ReviewStation/>
            <ReviewStation/>
            <ReviewStation/> */}
        </div>
    );
}

export default UserReview;
