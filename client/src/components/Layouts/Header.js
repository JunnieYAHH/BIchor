import React from 'react';
import '../../App.css';
import '../../index.css';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                <div className="container-fluid">
                    <img src="./assets/images/tuplogo.png" alt="logotup" id='tuplogo'/>
                    <a className="navbar-brand" href="http://localhost:3000/" style={{ color: 'black' }} >
                        Blood Donation
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </ul>
                        <ul className="navbar-nav mb- mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/register">Register</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Latest News</a></li>
                                    <li><a className="dropdown-item" href="#">Awareness</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">About</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
