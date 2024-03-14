import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBInput
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Shared/Spinner';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PrintPDFAppointment = () => {
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
        html2canvas(input).then((canvas) => {
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
            <Header sticky />
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
                                                <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                                <p style={{ margin: '0', fontWeight: 'bold' }}>APPOINTMENT RECEIPT</p>
                                                <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        {appointment && (
                                            <center>
                                                <Container>
                                                    <Col md={10}>
                                                        <div>
                                                            <div>
                                                                <p>Appointment Type: {appointment.appointmentType} </p>
                                                                {users && (
                                                                    <div>
                                                                        <p>User: {users.find(user => user._id === appointment.userID)?.name}  </p>
                                                                        <p>Email: {users.find(user => user._id === appointment.userID)?.email}</p>
                                                                    </div>
                                                                )}

                                                                {appointment.appointmentType !== "apply" && (
                                                                    <>
                                                                        <p>Blood Group: {appointment.bloodGroup}</p>
                                                                        <p>Quantity: {appointment.quantity}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={10}>
                                                        {appointment.event && (
                                                            <>
                                                                <p>Event:
                                                                    <p>{events.find(event => event._id === appointment.event)?.title}</p>
                                                                    <p>{events.find(event => event._id === appointment.event)?.details}</p>
                                                                    <p>{events.find(event => event._id === appointment.event)?.place}</p>
                                                                    <p>{events.find(event => event._id === appointment.event)?.date}</p>
                                                                </p>
                                                            </>
                                                        )}

                                                        <p>Status:</p>
                                                        <p>{appointment.status}</p>
                                                    </Col>
                                                </Container>
                                                <div md={10}>
                                                    <button className="btn btn-primary" style={{ height: '10%', width: '20%' }} onClick={downloadPDF}>Download PDF</button>
                                                </div>
                                            </center>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                            {/* {appointment && (
                                <center>
                                    <Container ref={pdfRef}>
                                        <Col md={10} style={{marginLeft:'200px'}}>
                                            <div>
                                                <div>
                                                    <p>Appointment Type: {appointment.appointmentType} </p>
                                                    {users && (
                                                        <div>
                                                            <p>User: {users.find(user => user._id === appointment.userID)?.name}  </p>
                                                            <p>Email: {users.find(user => user._id === appointment.userID)?.email}</p>
                                                        </div>
                                                    )}

                                                    {appointment.appointmentType !== "apply" && (
                                                        <>
                                                            <p>Blood Group: {appointment.bloodGroup}</p>
                                                            <p>Quantity: {appointment.quantity}</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={10} style={{marginLeft:'200px'}}>
                                            {appointment.event && (
                                                <>
                                                    <p>Event:
                                                        <p>{events.find(event => event._id === appointment.event)?.title}</p>
                                                        <p>{events.find(event => event._id === appointment.event)?.details}</p>
                                                        <p>{events.find(event => event._id === appointment.event)?.place}</p>
                                                        <p>{events.find(event => event._id === appointment.event)?.date}</p>
                                                    </p>
                                                </>
                                            )}

                                            <p>Status:</p>
                                            <p>{appointment.status}</p>
                                        </Col>
                                    </Container>
                                    <div md={10} style={{marginLeft:'200px'}}>
                                        <button className="btn btn-primary" style={{ height: '10%', width: '20%' }} onClick={downloadPDF}>Download PDF</button>
                                    </div>
                                </center>
                            )} */}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default PrintPDFAppointment
