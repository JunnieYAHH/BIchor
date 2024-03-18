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
    const roleMap = {
        'donor': 'Donor',
        'user': 'Recipient',
        'admin': 'Admin'
    };
    return (
        <header>
            <nav className="navbar navbar-expand-lg header" style={{ height:'12%'}}> 
                <div className="container-fluid">
                <img src="../assets/images/logoBIchor.png" alt="logotup" id="tuplogo" style={{width: '90px', height: '80px', borderRadius: '50%'}} />
                    {user && user.role !== 'admin' && (
                        <>
                            <Link to="/" className="navbar-brand" style={{ color: 'black' }}>
                                Blood Donation
                            </Link>
                        </>
                    )}
                    {user && user.role === 'admin' && (
                        <>
                            <Link to="/dashboard" className="navbar-brand" style={{ color: 'black' }}>
                                Dashboard
                            </Link>
                        </>
                    )}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {!isRegisterPage && !isLoginPage && user && (
                            <ul className="navbar-nav mb- mb-lg-0" style={{marginLeft:'70%'}}>
                                <li className='nav-item mx-3'>
                                    <p className='nav-link' style={{ color: 'white' }}> <i className='fa fa-user'></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{roleMap[user.role]}</span></p>
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
