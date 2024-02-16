import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../App.css';
import '../../index.css';

const Header = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isHomePage = location.pathname === '/';
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout Success')
        navigate('/login')
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                <div className="container-fluid">
                    <img src="./assets/images/tuplogo.png" alt="logotup" id='tuplogo' />
                    <Link to="/" className="navbar-brand" style={{ color: 'black' }}>
                        Blood Donation
                    </Link>
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
                        {isHomePage ? null : (
                            <ul className="navbar-nav mb- mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle " style={{ color: 'white' }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className='fa fa-user' style={{ color: 'white' }}></i>Options
                                    </a>
                                    <ul className="dropdown-menu">
                                        {!isLoginPage && (
                                            <li className="nav-item">
                                                <Link to="/login" className="nav-link">Login</Link>
                                            </li>
                                        )}
                                        {!isRegisterPage && (
                                            <li className="nav-item">
                                                <Link to="/register" className="nav-link">Register</Link>
                                            </li>
                                        )}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">About</a></li>
                                    </ul>
                                </li>
                            </ul>
                        )}
                        {isHomePage && user && (
                            <ul className="navbar-nav mb- mb-lg-0">
                                <li className='nav-item mx-3'>
                                    <p className='nav-link' style={{ color: 'white' }}> <i className="fa fa-user"></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{user.role}</span></p>
                                    
                                </li>
                                <li className='nav-item mx-3'>
                                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
