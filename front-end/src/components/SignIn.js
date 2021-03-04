import './SignIn.css';
import 'bootstrap/dist/css/bootstrap.css';

function SignIn() {
    return (
        <div className="container-fluid bg">
            <div className="row justify-content-around align-items-center no-gutters">
                <div className="col-md-5 letters">
                    <div className="form-container">
                        <h2 className="title">Welcome to Charging Point!</h2>
                        <p className="paragraph">Charging Point lays the foundations for a future of smarter, reliable, and emission-free mobility, accessible by everyone, everywhere. Charging Point offers a total ev charging solution from compact, high quality AC wallboxes, reliable DC fast charging stations with robust connectivity, to innovative on-demand electric bus charging systems, we deploy infrastructure that meet the needs of the next generation of smarter mobility.</p>
                        {/* <p className="paragraph">
                            Giortzis Giannis (<a href="#">giortzis.giannis@gmail.com</a>)<br/>
                            Kazelidis Giannis (<a href="#">gkazelid@gmail.com</a>)<br/>
                            Kerasiotis Marios (<a href="#">marioskerasiotis@gmail.com</a>)<br/>
                            Mitropoulos Marios (<a href="#">marios.mitropoulos@yahoo.gr</a>)<br/>
                            Panagiotidis Kiriakos (<a href="#">kyriakos.8p@gmail.com</a>)<br/>
                            Rizavas Konstantinos (<a href="#">rizavask@gmail.com</a>)
                        </p> */}
                    </div>
                </div>
                <div className="col-md-3">
                    <form className="form-container">
                        <h4>Sign In</h4>
                        <br/>
                        <div className="form-group">
                            <label for="username">Username:</label><br/>
                            <input type="text" className="form-control" id="username" name="username" required/><br/>
                            <label for="password">Password:</label><br/>
                            <input type="password" className="form-control" id="password" name="password" required/><br/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
