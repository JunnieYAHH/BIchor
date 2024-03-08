import React, { useState, useEffect, Fragment } from 'react'
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Layouts/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import '../../index.css';
import '../../App.css';
import axios from 'axios'

const Forum = () => {
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

    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    // console.log(events)


    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
                setEvents(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getAllEvents();
    }, [token]);



    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                    <div className="container-fluid">
                        <img src="../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
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
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar />
                            </div>
                            <Col md={10} className='my-3'>
                                <Card style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'white', backgroundColor: 'black', borderRadius: '20px' }}>
                                    <img src="../assets/images/TUP1.jpg" classname="img-fluid my-3" alt="banner" style={{ width: '90%', height: '50%', objectFit: 'cover' }} />
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
                                                                    <Link to='/blood/forum/the-pad' style={{ textDecoration: 'none', color: 'white' }}>
                                                                        The
                                                                        <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Pad</h4>
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
                                                            <Row>
                                                                <Col>
                                                                    <i class="fa-regular fa-calendar-days" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                </Col>
                                                                <Col>
                                                                    The
                                                                    <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Schedules</h4>
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
                                                            <Row>
                                                                <Col>
                                                                    <i class="fa-solid fa-user-tie" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                </Col>
                                                                <Col>
                                                                    About
                                                                    <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Us</h4>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </center>
                                    <p>___ <a style={{ color: 'red', fontWeight: 'bold' }}>Latest</a> New's _______________________________________________________________________________________________________________</p>
                                    <Card style={{ backgroundColor: 'gray', color: 'white', width: '90%' }}>
                                        <Row>
                                            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                                <Row>
                                                    <Col>
                                                        <Row className='my-4'>
                                                            <Col>
                                                                <img src="../assets/images/imgDef.png" classname="img-fluid my-3" alt="banner" style={{ width: '40%', height: '100%', objectFit: 'cover', borderRadius: '40px' }} />
                                                            </Col>
                                                            <Col>
                                                                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>User1@gmail.com</p>
                                                                <p style={{ fontSize: '11px', fontWeight: 'lighter' }}>comment: <a>Here we GO!!</a></p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='my-4'>
                                                            <Col>
                                                                <img src="../assets/images/imgDef.png" classname="img-fluid my-3" alt="banner" style={{ width: '40%', height: '100%', objectFit: 'cover', borderRadius: '40px' }} />
                                                            </Col>
                                                            <Col>
                                                                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>User1@gmail.com</p>
                                                                <p style={{ fontSize: '11px', fontWeight: 'lighter' }}>comment: <a>Here we GO!!</a></p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='my-4'>
                                                            <Col>
                                                                <img src="../assets/images/imgDef.png" classname="img-fluid my-3" alt="banner" style={{ width: '40%', height: '100%', objectFit: 'cover', borderRadius: '40px' }} />
                                                            </Col>
                                                            <Col>
                                                                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>User1@gmail.com</p>
                                                                <p style={{ fontSize: '11px', fontWeight: 'lighter' }}>comment: <a>Here we GO!!</a></p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='my-4'>
                                                            <Col>
                                                                <img src="../assets/images/imgDef.png" classname="img-fluid my-3" alt="banner" style={{ width: '40%', height: '100%', objectFit: 'cover', borderRadius: '40px' }} />
                                                            </Col>
                                                            <Col>
                                                                <p style={{ fontSize: '12px', fontWeight: 'bold' }}>User1@gmail.com</p>
                                                                <p style={{ fontSize: '11px', fontWeight: 'lighter' }}>comment: <a>Here we GO!!</a></p>
                                                            </Col>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                                <Card style={{ color: 'white', width: '90%' }}>
                                                    <Row>
                                                        <Col style={{ backgroundColor: 'gray' }}>
                                                            <Row style={{ backgroundColor: 'gray' }}>
                                                                <img src="../assets/images/systemLOGOMAIN.png" classname="img-fluid my-3" alt="banner" style={{ width: '90%', height: '50%', objectFit: 'cover', borderRadius: '40px' }} />
                                                            </Row>
                                                            <Row className='my-3' style={{ backgroundColor: 'gray' }}>
                                                                <Card>
                                                                    Look at yourself and feel the thing that is flowing within. The component of life that continuously runs through your vines, giving us energy and life. There was a day when public health was encouraged to donate blood and help the other people who were in need regarding what they needed. Blood is a critical component that is required in healthcare institutions to save lives, yet there is still a global shortage of blood donors which has a major impact on the medical field.
                                                                </Card>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Card>
                            </Col>
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}

export default Forum
