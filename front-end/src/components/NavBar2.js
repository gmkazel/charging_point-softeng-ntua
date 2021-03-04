import { Link } from 'react-router-dom';
import './NavBar2.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './images/logo.png';
import personicon from './images/personicon.png';
import settings from './images/settings.jpg';
import exit from './images/exit.png';

let name="Marios Mitropoulos";
let page="/user";

function NavBar2() {
    return (
        <div className="NavBar2">
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to={page}><img src={logo} alt="logo" width="200px" height="25%"/></Link>
                    <img className="person" src={personicon} alt="personicon" width="18px" height="1%"/>
                    <h6 className="navbar-text username">{name}</h6>
                    <input type="image" className="gear" alt="gear" src={settings} name="gear" width="18px" height="1.5%"/>
                    <Link to="/"><img src={exit} className="exit" alt="exit" width="20px" height="27%"/></Link>
                </div>
            </nav>
        </div>
    );
}

export default NavBar2;
