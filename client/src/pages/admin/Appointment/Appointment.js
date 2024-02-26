import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
    MDBCardTitle as CardTitle,
} from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/appointment/getAllAppointments`, config);
                setAppointments(data.data);
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

        const getAllEvents = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
                setEvents(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        }

        getAllAppointments();
        getAllUsers();
        getAllEvents();
    }, []);

    const formatAppointments = () => {
        return {
            columns: [
                {
                    label: 'Appointment Type',
                    field: 'appointmentType',
                    sort: 'asc',
                },
                {
                    label: 'Blood Group',
                    field: 'bloodGroup',
                    sort: 'asc',
                },
                {
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                },
                {
                    label: 'Event',
                    field: 'event',
                    sort: 'asc',
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: appointments.map(appointment => {
                const user = users.find(user => user._id === appointment.userID) || {};
                const event = events.find(event => event._id === appointment.event) || {};
                console.log(event)
                return {
                    appointmentType: appointment.appointmentType,
                    bloodGroup: appointment.bloodGroup,
                    quantity: appointment.quantity,
                    email: user.email || 'N/A',
                    event: event.title || 'N/A',
                    user: user.name || 'N/A',
                    status: appointment.status,
                    actions: (
                        <Fragment>
                            <Link to={`/appointment/update/${appointment._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            <Link>
                                <i class="fa-regular fa-eye"></i>
                            </Link>
                        </Fragment>
                    ),
                };
            }),
        };
    };

    return (
        <>
            <Header sticky />
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <Container fluid>
                        <Row>
                            <Col md={2}>
                                <Sidebar />
                            </Col>
                            <Col md={10}>
                                <Row className="mb-4">
                                    <div className="container">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                            <div style={{ marginLeft: '20px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                <p style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>Technological University of the Philippines, Taguig City</p>
                                                <p style={{ textAlign: 'center' }}>Clinical Appointments in Techonological University of the Philippines, Taguig City</p>
                                                <p style={{ textAlign: 'center' }}>- A Comprehensive Study</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Col>
                                        <center>
                                            <button className='btn btn-success'> Create Appointment </button>
                                        </center>
                                        <Row>
                                            <MDBDataTable
                                                data={formatAppointments()}
                                                className="px-3"
                                                bordered
                                                striped
                                                hover
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Appointment;
