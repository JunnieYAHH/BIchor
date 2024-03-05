import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
    MDBRow as Row,
    MDBCol as Col,
} from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import '../../../index.css'

const Event = () => {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    console.log(events)


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

    const EventsDataTable = () => {
        return {
            columns: [
                {
                    field: 'images',
                    sort: 'asc',
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                },
                {
                    label: 'Place',
                    field: 'place',
                    sort: 'asc',
                },
                {
                    label: 'Details',
                    field: 'details',
                    sort: 'asc',
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc',
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Action',
                    sort: 'asc',
                    field: 'actions',
                },
            ],
            rows: events.map(event => ({
                images: (
                    <Fragment>
                        {event.images && event.images.length > 0 && (
                            <p>
                                <img src={event.images[0].url} alt={event.title} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            </p>
                        )}
                    </Fragment>
                ),
                title: event.title,
                place: event.place,
                details: event.details,
                date: event.date,
                type: event.eventType,
                status: event.status,
                actions: (
                    <>
                        <Link to={`/admin/update-event/${event._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        {/* <Link>
                            <i className="fa-regular fa-eye"></i>
                        </Link> */}
                    </>
                ),
            }))
        };
    };

    return (
        <>
            <Header sticky />
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar />
                            </div>
                            <Col md={10}>
                                <Row className="mb-4">
                                    <div className="container">
                                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                            <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                            <p style={{ margin: '0', fontWeight: 'bold' }}>EVENTS LIST</p>
                                            <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                            <Link to={'/admin/create/event'} className="btn btn-success" style={{ width: '50%' }}>
                                                <i class="fa-solid fa-circle-plus"></i> Create
                                            </Link>
                                        </div>
                                    </div>
                                    <Col>
                                        <Row style={{ backgroundColor: 'black' }} className='my-1' >
                                            <MDBDataTable
                                                data={EventsDataTable()}
                                                className="user-datatable"
                                                bordered
                                                striped
                                                style={{ color: "black", fontWeight: "bold" }}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Event