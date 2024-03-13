import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../../components/Layouts/Sidebar'
import '../../../index.css';
import '../../../App.css';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardImage,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios'

const DownloadAppointment = () => {
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
        <>
            <div className="custom-homepage my-5">
                <header className='header'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                        <div className="container-fluid">
                            <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
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
                                        <button className="btn btn-outline-warning" type="submit">Search</button>
                                    </form>
                                </ul>
                                {!isRegisterPage && !isLoginPage && user && (
                                    <ul className="navbar-nav mb- mb-lg-0">
                                        <li className='nav-item mx-3'>
                                            <p className='nav-link' style={{ color: 'white' }}> <i className='fa fa-user'></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{user.role}</span></p>
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
                <div className="custom-content">
                    <Container fluid>
                        <Row>
                            <Col md={2}>
                                <Sidebar />
                            </Col>
                            <Col md={10}>
                                <>
                                    dsadsads
                                </>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        </>
    )
}

export default DownloadAppointment
