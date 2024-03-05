import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
} from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import '../../../index.css'

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
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
                setEvents(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getAllAppointments();
        getAllUsers();
        getAllEvents();
    }, []);

    const formatAppointments = () => {
        return {
            columns: [
                {
                    label: 'Type',
                    field: 'appointmentType',
                    sort: 'asc',
                },
                {
                    label: 'Blood',
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
                    field: 'actions',
                },
            ],
            rows: appointments.map(appointment => {
                const user = users.find(user => user._id === appointment.userID) || {};
                const event = events.find(event => event._id === appointment.event) || {};
                const avatarUrl = user.description && user.description.length > 0 && user.description[0]?.avatar && user.description[0]?.avatar.length > 0 ? user.description[0]?.avatar[0]?.url : null;
                return {
                    appointmentType: appointment.appointmentType,
                    bloodGroup: appointment.bloodGroup,
                    quantity: appointment.quantity,
                    email: user.email || 'N/A',
                    event: (
                        <Fragment>
                            {event.images && event.images.length > 0 && (
                                <p>
                                    <img src={event.images[0].url} alt={event.title} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                </p>
                            )}
                            <p>{event.title || 'N/A'}</p>
                        </Fragment>
                    ),
                    user: (
                        <Fragment>
                            <p>
                                <img src={avatarUrl} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            </p>
                            <span>{user.name || 'N/A'}</span>
                        </Fragment>
                    ),
                    status: appointment.status,
                    actions: (
                        <Fragment>
                            <Link to={`/appointment/update/${appointment._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            {/* <Link>
                                <i className="fa-regular fa-eye"></i>
                            </Link> */}
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
                                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                            <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                            <p style={{ margin: '0', fontWeight: 'bold' }}>APPOINTMENTS LIST</p>
                                            <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                        </div>
                                    </div>
                                    <Col className='my-3'>
                                        <Row style={{ backgroundColor: 'black', borderRadius:'30px'}}>
                                            <MDBDataTable
                                                data={formatAppointments()}
                                                className="appointment-datatable"
                                                bordered
                                                striped
                                                paginationLabel={['Previous', 'Next']}
                                                searchLabel="Search"
                                                style={{borderRadius:'30px'}}
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
