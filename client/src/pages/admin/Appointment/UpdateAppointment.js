import React, { useState, useEffect } from 'react';
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


const UpdateAppointment = () => {
    const [appointment, setAppointment] = useState(null);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

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

    const updateStatus = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/appointment/updateStatus/${id}`, { status }, config);
            console.log('Updated appointment:', data.appointment);
            navigate('/admin/appointments');
        } catch (error) {
            console.error('Error updating appointment status:', error.response.data.message);
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

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
                                <Col md={10}>
                                    <Row className="mb-4">
                                        <div className="container">
                                            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                            <img src="./assets/images/logoBIchor.png" alt="logotup" id="tuplogo" style={{width: '20%', height: '20%', borderRadius: '50%'}} />
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
                                                        <p>Blood Group: {appointment.bloodGroup}</p>
                                                        <p>Quantity: {appointment.quantity}</p>
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

                                        <p>Status:</p>
                                        <select value={status} onChange={handleStatusChange}>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <button onClick={updateStatus}>Submit</button>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default UpdateAppointment;
