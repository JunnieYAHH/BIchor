import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MDBRow as Row, MDBCol as Col, MDBCard as Card } from 'mdb-react-ui-kit';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import Header from '../../../components/Layouts/Header'
import Sidebar from '../../../components/Layouts/Sidebar';
import axios from 'axios'

const Schedule = () => {

    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isHomePage = location.pathname === '/';
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout Success')
        navigate('/login')
    }
    const { user } = useSelector(state => state.user);
    const [events, setEvents] = useState([]);

    console.log(events)
    const token = localStorage.getItem('token');

    // Set Error and success
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
                const pendingEvents = response.data.data.filter(event => event.status === 'pending');
                const eventData = pendingEvents.map(event => ({
                    title: event.title,
                    start: event.date,
                    description: event.details
                }));
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchData()
    }, [token]);

    useEffect(() => {
        const calendarEl = document.getElementById('calendar');
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialView: 'dayGridMonth',
            weekends: false,
            events: events
        });

        calendar.render();

        return () => {
            calendar.destroy();
        };
    }, [events]);

    const roleMap = {
        'donor': 'Donor',
        'user': 'Recipient',
        'admin': 'Admin'
    };

    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                    <div className="container-fluid">
                    <img src="../../../assets/images/logoBIchor.png" alt="logotup" id='tuplogo' style={{width: '100px', height: '80px'}}/>
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
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-warning" type="submit">Search</button>
                                </form>
                            </ul>
                            {!isRegisterPage && !isLoginPage && user && (
                                <ul className="navbar-nav mb- mb-lg-0">
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
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar />
                            </div>
                            <Col md={10}>
                                <Card style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'white', backgroundColor: 'black', borderRadius: '20px' }}>
                                    <img src="../../../../assets/images/tup.png" classname="img-fluid my-3" alt="banner" style={{ width: '90%', height: '50%', objectFit: 'cover' }} />
                                    <center>
                                        <Row className='my-4'>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col>
                                                                    <i class="fa-solid fa-book-medical" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                </Col>
                                                                <Col>
                                                                    <Link to={'/blood/forum'} style={{ textDecoration: 'none', color: 'white' }}>
                                                                        The
                                                                        <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Forum</h4>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
                                                            <Link to='/blood/forum/schedule' style={{ textDecoration: 'none', color: 'white' }}>
                                                                <Row>
                                                                    <Col>
                                                                        <i class="fa-regular fa-calendar-days" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to={'/blood/forum/schedule'} style={{ textDecoration: 'none', color: 'white' }}>
                                                                            The
                                                                            <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Schedules</h4>
                                                                        </Link>
                                                                    </Col>
                                                                </Row>
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
                                                            <Link to='/blood/forum/about-us' style={{ textDecoration: 'none', color: 'white' }}>
                                                                <Row>
                                                                    <Col>
                                                                        <i class="fa-solid fa-user-tie" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to={'/blood/forum/about-us'} style={{ textDecoration: 'none', color: 'white' }}>
                                                                            About
                                                                            <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Us</h4>
                                                                        </Link>
                                                                    </Col>
                                                                </Row>
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </center>
                                    <Card className='px-4' style={{ backgroundColor: 'white', color: 'white', width: '90%' }}>
                                        <section className="py-3 py-md-5 py-xl-8">
                                            <h1 classname="display-4" style={{ color: 'red', fontWeight: 'bold' }}>Events Schedules</h1>
                                            <Card className='px-4' style={{ width: '90%', height: '90%' }}>
                                                <div style={{ color: 'black', backgroundColor: 'white' }} id='calendar'></div>
                                            </Card>
                                        </section>
                                    </Card>
                                </Card>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Schedule;
