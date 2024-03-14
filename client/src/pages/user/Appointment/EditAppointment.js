import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../components/Layouts/Header'
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

const EditAppointment = () => {
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

    const [appointment, setAppointment] = useState(null);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState('');


    const token = localStorage.getItem('token');
    const { id } = useParams();
    const { loading } = useSelector(state => state.user);

    useEffect(() => {
        const getSingleAppointment = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };

                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/appointment/getSingleAppointment/${id}`, config);
                setAppointment(data.appointment);
                // setStatus(data.appointment?.status || '');
            } catch (error) {
                setError(error.response.data.message);
            }
        };

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

        const getAllUsers = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/user/getAllUsers`, config);
                setUsers(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getSingleAppointment();
        getAllEvents();
        getAllUsers();
    }, [token, id]);

    const updateQuantity = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const quantityValue = parseInt(quantity);

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/appointment/updateQuantity/${id}`, { quantity: quantityValue }, config);
            toast.success(data.message);
            setSuccess(data.success);
            window.location.reload();
        } catch (error) {
            console.error('Error updating appointment Quantity:', error.response.data.message);
        }
    };

    return (
        <>
            <div className="custom-homepage my-5">
                <header className='header'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary header" style={{ height:'12%'}}>
                        <div className="container-fluid">
                            <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
                            <Link to="/" className="navbar-brand" style={{ color: 'black' }}>
                                Blood Donation
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {!isRegisterPage && !isLoginPage && user && (
                                    <ul className="navbar-nav mb- mb-lg-0" style={{marginLeft:'70%'}}>
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
                                    <Card>
                                        <Container fluid>
                                            <Row>
                                                <Row>
                                                    <Col md={2}>
                                                        <Sidebar />
                                                    </Col>
                                                    <Col md={10}>
                                                        <Row className="mb-4">
                                                            <div className="container">
                                                                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                                    <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                                                    <p style={{ margin: '0', fontWeight: 'bold' }}>APPOINTMENT STATUS</p>
                                                                    <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                                                </div>
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Col md={2}>
                                                    <Sidebar />
                                                </Col>
                                                {appointment && (
                                                    <>
                                                        <Col md={6}>
                                                            <div>
                                                                <div>
                                                                    <p>Appointment Type:
                                                                        <MDBInput placeholder={appointment.appointmentType} id='formControlReadOnly' type='text' disabled />
                                                                    </p>
                                                                    {users && (
                                                                        <div>
                                                                            {users.find(user => user._id === appointment.userID)?.description.map((desc, index) => (
                                                                                desc.avatar && desc.avatar[0] && (
                                                                                    <img key={index} src={desc.avatar[0].url} alt={users.find(user => user._id === appointment.userID)?.name} />
                                                                                )
                                                                            ))}
                                                                            <p>User:
                                                                                <MDBInput placeholder={users.find(user => user._id === appointment.userID)?.name} id='formControlReadOnly' type='text' disabled />
                                                                            </p>
                                                                            <p>Email:
                                                                                <MDBInput placeholder={users.find(user => user._id === appointment.userID)?.email} id='formControlReadOnly' type='text' disabled />
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                    {appointment.appointmentType !== "apply" && (
                                                                        <>
                                                                            <p>Blood Type: {appointment.bloodGroup}</p>
                                                                            <input placeholder={appointment.quantity} type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col md={4}>
                                                            {appointment.event && (
                                                                <>
                                                                    <p>Event:
                                                                        <MDBInput placeholder={events.find(event => event._id === appointment.event)?.title} id='formControlReadOnly' type='text' disabled />
                                                                    </p>
                                                                    {events.find(event => event._id === appointment.event)?.images.map((image, index) => (
                                                                        <img key={index} src={image.url} alt={events.find(event => event._id === appointment.event)?.title} />
                                                                    ))}
                                                                </>
                                                            )}
                                                        </Col>
                                                        <button className='btn btn-primary my-2' onClick={updateQuantity}>Update</button>
                                                        {/*  */}
                                                    </>
                                                )}
                                            </Row>
                                        </Container>
                                    </Card>
                                </>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        </>
    )
}

export default EditAppointment
