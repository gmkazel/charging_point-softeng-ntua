import 'bootstrap/dist/css/bootstrap.css';
import NavBar2 from '../components/NavBar2';
import ParkingownerLinks from './ParkingownerLinks';
import './AddCharger.css'; 

function AddCharger() {
    return (
        <div>
        <NavBar2/>

        <ParkingownerLinks/>

        <div className="col-md-3">
        <form className="form-container">
            <div className="form-group">
                <label for="name">Name:</label><br/>
                <input type="text" className="form-control" id="name" name="name" required/><br/>
                <label for="section">Section</label><br/>
                <input type="text" className="form-control" id="section" name="section" required/><br/>
                <input type ="radio" id="type" name="type" value ="fast-Charging"/> 
                <label for="male">fast-Charging</label>
                <input type ="radio" id="type2" name="type2" value ="normal-Charging"/>
                <label for="male">normal-Charging</label><br/> 
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add new charger</button>
        </form>
        </div>
        </div>
    );
}

export default AddCharger;
