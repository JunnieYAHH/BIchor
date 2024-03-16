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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from '../../../components/Layouts/AdminHeader';

const Appointment = () => {
    const [outAppointments, setOutAppointments] = useState([]);
    const [inAppointments, setInAppointments] = useState([]);
    const [applyAppointments, setApplyAppointments] = useState([]);
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
                const outAppts = data.data.filter(appt => appt.appointmentType === 'out');
                const inAppts = data.data.filter(appt => appt.appointmentType === 'in');
                const applyAppts = data.data.filter(appt => appt.appointmentType === 'apply');

                // Set state for each type of appointments
                setOutAppointments(outAppts);
                setInAppointments(inAppts);
                setApplyAppointments(applyAppts);
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

    const completeAppointmentStatus = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `${process.env.REACT_APP_BASEURL}/appointment/appointment-status-complete/${id}`,
                config
            );
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const completeAppointment = (id) => {
        completeAppointmentStatus(id);
    };

    const formatOutAppointments = () => {
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
                    label: 'Weight',
                    field: 'weight',
                    sort: 'asc',
                },
                {
                    label: 'History',
                    field: 'history',
                    sort: 'asc',
                },
                {
                    label: 'Medication/s',
                    field: 'medication',
                    sort: 'asc',
                },
                {
                    label: 'Record/s',
                    field: 'record',
                    sort: 'asc',
                },
                {
                    label: 'Allergy',
                    field: 'allergy',
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
            rows: outAppointments.map(appointment => {
                const user = users.find(user => user._id === appointment.userID) || {};
                const event = events.find(event => event._id === appointment.event) || {};
                const avatarUrl = user.description && user.description.length > 0 && user.description[0]?.avatar && user.description[0]?.avatar.length > 0 ? user.description[0]?.avatar[0]?.url : null;
                const appointmentTypeMap = {
                    'out': 'Donation',
                };
                return {
                    appointmentType: appointmentTypeMap[appointment.appointmentType],
                    bloodGroup: appointment.bloodGroup,
                    weight: appointment.weight,
                    history: appointment.history,
                    medication: appointment.medication,
                    record: appointment.record,
                    allergy: appointment.allergy,
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
                            {appointment && appointment.status === 'pending' && (
                                <button onClick={() => completeAppointment(appointment._id)} className="btn btn-primary py-1 px-2">
                                    <i className="fa fa-pencil"></i>
                                </button>
                            )}
                            {appointment && appointment.status === 'confirmed' && (
                                <Link to={`/appointment/print/${appointment._id}`} className="btn btn-danger py-1 px-2">
                                    <i class="fa-solid fa-print"></i>
                                </Link>
                            )}
                        </Fragment>
                    ),
                };
            }),
        };
    };

    const formatInAppointments = () => {
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
                    label: 'Weight',
                    field: 'weight',
                    sort: 'asc',
                },
                {
                    label: 'History',
                    field: 'history',
                    sort: 'asc',
                },
                {
                    label: 'Medication/s',
                    field: 'medication',
                    sort: 'asc',
                },
                {
                    label: 'Record/s',
                    field: 'record',
                    sort: 'asc',
                },
                {
                    label: 'Allergy',
                    field: 'allergy',
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
            rows: inAppointments.map(appointment => {
                const user = users.find(user => user._id === appointment.userID) || {};
                const event = events.find(event => event._id === appointment.event) || {};
                const avatarUrl = user.description && user.description.length > 0 && user.description[0]?.avatar && user.description[0]?.avatar.length > 0 ? user.description[0]?.avatar[0]?.url : null;
                const appointmentTypeMap = {
                    'in': 'Transfusion',
                };
                return {
                    appointmentType: appointmentTypeMap[appointment.appointmentType],
                    bloodGroup: appointment.bloodGroup,
                    weight: appointment.weight,
                    history: appointment.history,
                    medication: appointment.medication,
                    record: appointment.record,
                    allergy: appointment.allergy,
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
                            {appointment && appointment.status === 'pending' && (
                                <button onClick={() => completeAppointment(appointment._id)} className="btn btn-primary py-1 px-2">
                                    <i className="fa fa-pencil"></i>
                                </button>
                            )}
                            {appointment && appointment.status === 'confirmed' && (
                                <Link to={`/appointment/print/${appointment._id}`} className="btn btn-danger py-1 px-2">
                                    <i class="fa-solid fa-print"></i>
                                </Link>
                            )}
                        </Fragment>
                    ),
                };
            }),
        };
    };

    const formatApplyAppointments = () => {
        return {
            columns: [
                {
                    label: 'Type',
                    field: 'appointmentType',
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
            rows: applyAppointments.map(appointment => {
                const user = users.find(user => user._id === appointment.userID) || {};
                const event = events.find(event => event._id === appointment.event) || {};
                const avatarUrl = user.description && user.description.length > 0 && user.description[0]?.avatar && user.description[0]?.avatar.length > 0 ? user.description[0]?.avatar[0]?.url : null;
                const appointmentTypeMap = {
                    'apply': 'Campaign',
                };
                return {
                    appointmentType: appointmentTypeMap[appointment.appointmentType],
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
                            {appointment && appointment.status === 'pending' && (
                                <button onClick={() => completeAppointment(appointment._id)} className="btn btn-primary py-1 px-2">
                                    <i className="fa fa-pencil"></i>
                                </button>
                            )}
                            {appointment && appointment.status === 'confirmed' && (
                                <Link to={`/appointment/print/${appointment._id}`} className="btn btn-danger py-1 px-2">
                                    <i class="fa-solid fa-print"></i>
                                </Link>
                            )}
                        </Fragment>
                    ),
                };
            }),
        };
    };

    const [selectedAppointmentType, setSelectedAppointmentType] = useState('');

    const handleButtonClick = (type) => {
        setSelectedAppointmentType(type);
    };


    return (
        <>
            <AdminHeader sticky />
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
                                    <center>
                                        <div>
                                            <Row>
                                                <Col>
                                                    <button className="btn d-block" style={{ backgroundColor: 'gray' }} onClick={() => handleButtonClick('out')}>Donate</button>
                                                </Col>
                                                <Col>
                                                    <button className="btn d-block" style={{ backgroundColor: 'gray' }} onClick={() => handleButtonClick('in')}>Transfuse</button>
                                                </Col>
                                                <Col>
                                                    <button className="btn d-block" style={{ backgroundColor: 'gray' }} onClick={() => handleButtonClick('apply')}>Campaign</button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </center>
                                    {(selectedAppointmentType === 'out' || !selectedAppointmentType) && (
                                        <Col className='my-3'>
                                            <Row style={{ backgroundColor: 'black', borderRadius: '30px' }}>
                                                <MDBDataTable
                                                    data={formatOutAppointments()}
                                                    className="appointment-datatable"
                                                    bordered
                                                    striped
                                                    paginationLabel={['Previous', 'Next']}
                                                    searchLabel="Search"
                                                    style={{ borderRadius: '30px' }}
                                                />
                                            </Row>
                                        </Col>
                                    )}
                                    {selectedAppointmentType === 'in' && (
                                        <Col className='my-3'>
                                            <Row style={{ backgroundColor: 'black', borderRadius: '30px' }}>
                                                <MDBDataTable
                                                    data={formatInAppointments()}
                                                    className="appointment-datatable"
                                                    bordered
                                                    striped
                                                    paginationLabel={['Previous', 'Next']}
                                                    searchLabel="Search"
                                                    style={{ borderRadius: '30px' }}
                                                />
                                            </Row>
                                        </Col>
                                    )}
                                    {selectedAppointmentType === 'apply' && (
                                        <Col className='my-3'>
                                            <Row style={{ backgroundColor: 'black', borderRadius: '30px' }}>
                                                <MDBDataTable
                                                    data={formatApplyAppointments()}
                                                    className="appointment-datatable"
                                                    bordered
                                                    striped
                                                    paginationLabel={['Previous', 'Next']}
                                                    searchLabel="Search"
                                                    style={{ borderRadius: '30px' }}
                                                />
                                            </Row>
                                        </Col>
                                    )}
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