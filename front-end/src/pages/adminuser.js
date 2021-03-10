import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

const Admin = () => {
  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12">
              <div className="error-template">
                  <h2>Hello admin User!</h2>
                  <div className="error-details">
                      There are no pages for you at the website please vist out cli to access your priviliges.
                  </div>
                  <div className="error-actions">
                      <Link to="/" className="btn btn-primary btn-lg"><span classNames="glyphicon glyphicon-home"></span>Take Me Home</Link>
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
};

export default Admin;