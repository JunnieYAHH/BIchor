import React from 'react';
import Header from '../components/Layouts/Header';
import Sidebar from '../components/Layouts/Sidebar';
import '../index.css';

const HomePage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Header />
          <div className="main-content">
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card border-0 bg-dark text-white">
                  <img src="./assets/images/bloodonate.jpg" className="card-img-top" alt="img1" />
                  <div className="card-body">
                    <p className="card-text">Donate</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-dark text-white">
                  <img src="./assets/images/registration.jpg" className="card-img-top" alt="img2" />
                  <div className="card-body">
                    <p className="card-text">Register</p>
                  </div>
                </div>
              </div>
              {/* Add more similar columns for additional images */}
            </div>
            <div className="row">
              <div className="col-md-12">
                <img src="./assets/images/login.jpg" className="img-fluid rounded" alt="img3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
