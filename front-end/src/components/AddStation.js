import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from './NavBar2';
import './AddStation.css'; 
import { Link } from 'react-router-dom';

function AddStation() {
    return (
        <div>
            <NavBar2/>

            <br/>

            <div className="container-fluid">
                <div className="row justify-content-around align-items-center">
                    <div className="card">
                        <div className="card-header">
                            <h4>Enter station details</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input className="form-control" id="name" type="text" placeholder="Enter station name"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="ccnumber">Address</label>
                                        <div className="input-group">
                                            <input className="form-control" type="text" placeholder="Example 19"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="container-fluid">
                                <div className="row justify-content-around align-items-center">
                                    <button className="btn btn-sm btn-success" type="submit">Submit</button>
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
