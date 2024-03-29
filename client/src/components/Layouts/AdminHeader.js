import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../App.css';
import '../../index.css';
const AdminHeader = () => {
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
            <nav className="navbar navbar-expand-lg bg-body-tertiary header" style={{height:'12%'}}>
                <div className="container-fluid">
                <img src="../assets/images/logoBIchor.png" alt="logotup" id="tuplogo" style={{width: '90px', height: '80px', borderRadius: '50%'}} />
                    <Link to="/dashboard" className="navbar-brand" style={{ color: 'black' }}>
                        Dashboard
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {user && (
                            <ul className="navbar-nav mb- mb-lg-0" style={{ marginLeft: '70%' }}>
                                <li className='nav-item mx-3'>
                                    <p className='nav-link' style={{ color: 'white' }}> <i className="fa fa-user"></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{roleMap[user.role]}</span></p>
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
}

export default AdminHeader