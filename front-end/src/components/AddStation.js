import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from './NavBar2';
import './AddStation.css'; 
import { Link } from 'react-router-dom';

function AddStation() {
    return (
        <div>
            <NavBar2/>

            <div class="padding">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-header">
                                <h4>Enter station details</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input class="form-control" id="name" type="text" placeholder="Enter station name"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="ccnumber">Address</label>
                                            <div class="input-group">
                                                <input class="form-control" type="text" placeholder="Example 19"/>
                                            </div>
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
                    <Link to="/parkingowner/manage"><button className="btn btn-primary">&#8592; Back to station management</button></Link>
                </div>
            </div>
        </div>
    );
}

export default AddStation;
