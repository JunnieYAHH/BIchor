import React, { useState, useEffect, useRef } from 'react';
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Barcode from 'react-barcode';
import Header from '../../../components/Layouts/Header';
import Spinner from '../../../components/Shared/Spinner';

const PrintPDFAppointment = () => {
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
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const token = localStorage.getItem('token');
    const { id } = useParams();
    const { loading } = useSelector(state => state.user);


    const pdfRef = useRef();

    const downloadPDF = () => {
        const input = pdfRef.current;

        // Wait for images to load before converting to canvas
        Promise.all([
            html2canvas(input, { useCORS: true }),
            new Promise((resolve) => {
                const images = input.querySelectorAll('img');
                let loadedCount = 0;

                images.forEach((img) => {
                    if (!img.complete) {
                        img.onload = img.onerror = () => {
                            loadedCount++;
                            if (loadedCount === images.length) resolve();
                        };
                    } else {
                        loadedCount++;
                        if (loadedCount === images.length) resolve();
                    }
                });

                if (images.length === 0) resolve();
            })
        ]).then(([canvas]) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Appointment Receipt.pdf');
        });
    };


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
                setStatus(data.appointment?.status || '');
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

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header" style={{ height: '12%' }}>
                    <div className="container-fluid">
                        <img src="../../assets/images/BIchor.png" alt="logotup" id='tuplogo' />
                        <Link to="/" className="navbar-brand" style={{ color: 'black' }}>
                            Blood Donation
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {!isRegisterPage && !isLoginPage && user && (
                                <ul className="navbar-nav mb- mb-lg-0" style={{ marginLeft: '70%' }}>
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
                    <Container fluid>
                        <Row>
                            <Row>
                                <Col md={2}>
                                    <Sidebar />
                                </Col>
                                <Col md={10} ref={pdfRef}>
                                    <Row className="mb-4">
                                        <div className="container">
                                            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                <img src="../../assets/images/logoBIchor.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                                <p style={{ margin: '0', fontWeight: 'bold' }}>APPOINTMENT RECEIPT</p>
                                                <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        {appointment && (
                                            <center>
                                                <Card style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', width: '80%', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row' }}>
                                                    <Card style={{ flex: 1 }}>
                                                        <div className="image">
                                                            <p className="admit-one">
                                                                {appointment.appointmentType === 'out' && <span>Donation</span>}
                                                                {appointment.appointmentType === 'in' && <span>Transfusion</span>}
                                                                {appointment.appointmentType === 'apply' && <span>Campaign</span>}
                                                            </p>
                                                            <div className="ticket-number">
                                                                <p>
                                                                    #{appointment._id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="ticket-info">
                                                            {users && (
                                                                <>
                                                                    <p>User: {users.find(user => user._id === appointment.userID)?.name}  </p>
                                                                    {users.find(user => user._id === appointment.userID)?.description && users.find(user => user._id === appointment.userID).description[0].avatar && (
                                                                        <img src={users.find(user => user._id === appointment.userID).description[0].avatar[0].url} alt="User Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                                                    )}
                                                                    <p>Email: {users.find(user => user._id === appointment.userID)?.email}</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </Card>
                                                    <Card style={{ flex: 1 }}>
                                                        {appointment.event && (
                                                            <>
                                                                <p>Date: {events.find(event => event._id === appointment.event)?.date}</p>
                                                                <div className="right-info-container">
                                                                    <div className="show-name">
                                                                        <h1>{appointment.eventTitle}</h1>
                                                                    </div>
                                                                    <div className="time">
                                                                        <p> <span>TO</span>     </p>
                                                                        <p> {events.find(event => event._id === appointment.event)?.place}</p>
                                                                    </div>
                                                                    <div className="image">
                                                                        {events.find(event => event._id === appointment.event)?.images && (
                                                                            <img src={events.find(event => event._id === appointment.event)?.images[0].url} alt="Event Image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                                                        )}
                                                                    </div>
                                                                    <p className="ticket-title">
                                                                        <p>{events.find(event => event._id === appointment.event)?.title}</p>
                                                                    </p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Card>
                                                    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        <img src="../../assets/images/BIchor.png" alt="logotup" id='tuplogo' style={{ height: '50%', width: '60%' }} />
                                                        <p><Barcode value={appointment._id} height={30} width={0.7} displayValue={false} /></p>
                                                        <h3 style={{ margin: '0', marginBottom: '10px', color: '#333' }}>Status:</h3>
                                                        {/* <p>{appointment.status}</p> */}
                                                        {appointment.status === 'confirmed' && <p>Confirmed</p>}
                                                        <button className="btn btn-primary" style={{ height: '40px', width: '150px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={downloadPDF}>Download PDF</button>
                                                    </Card>
                                                </Card>
                                            </center>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default PrintPDFAppointment
