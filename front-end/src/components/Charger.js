import 'bootstrap/dist/css/bootstrap.css';
import './Charger.css';

let chargername='Charger1';

function Charger() {
    return (
        <div className="reviewstation">
            <h3>{chargername}</h3>
            <div className="button"><button type="submit" className="btn btn-danger btn-block">Delete</button></div>
        </div>
    );
}

export default Charger;
