import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputType from '../../../components/Shared/Form/InputType';
import axios from 'axios';
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBInputGroup,
    MDBInput,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import '../../../index.css'

const UpdateEvent = () => {

    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [images, setImage] = useState([]);
    const [clinic, setClinic] = useState('65cef1342062882dd7f8f2da');
    const navigate = useNavigate();

    // console.log(event)
    const token = localStorage.getItem('token');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    const onChange = (e) => {
        setImage(e.target.files);
    };


    useEffect(() => {
        const getSingleEvent = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/get-single-event/${id}`, config);
                // console.log(data)
                setEvent(data.event);
            } catch (error) {
                setError(error.response.data.message);
            }
        };
        getSingleEvent();
    }, [id]);

    const updateNewEvent = async (formData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/event/update-event/${id}`, formData, config);
            // console.log(data)
            toast.success(data.message)
            setSuccess(data.success);
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('Error: ' + error.response.data.message);
            } else {
                setError('Error: Failed to update user profile');
            }
        }
    };

    const updateEvent = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (title) formData.append('title', title);
        if (place) formData.append('place', place);
        if (details) formData.append('details', details);
        if (date) formData.append('date', date);
        if (eventType) formData.append('eventType', eventType);
        if (clinic) formData.append('clinic', clinic);
        if (images) formData.append('images', images[0]);

        updateNewEvent(formData);

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
                            {event && (
                                <div className="col-md-10" style={{ color: 'white', backgroundColor: 'black', borderRadius: '20px' }}>
                                    <>
                                        <center>
                                            <h2>{event.title}</h2>
                                        </center>
                                        <Card style={{ color: 'white', backgroundColor: 'black' }}>
                                            <Row>
                                                <Col>

                                                    <div className="event-container">
                                                        {event.images && event.images.length > 0 && (
                                                            <div className="updateEventImage" style={{ backgroundImage: `url(${event.images[0].url})` }}>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Card>
                                                        <p style={{ color: 'orange' }}>{formatDate(event.date)}</p>
                                                        <h3 style={{ color: 'orange' }}>{(event.title)}</h3>
                                                        <p>{event.details}</p>
                                                        {/* <p>{event.eventType}</p> */}
                                                        {event.eventType === 'donation' && <p>Donation</p>}
                                                        {event.eventType === 'transfusion' && <p>Transfusion</p>}
                                                        {event.eventType === 'campain' && <p>Campain</p>}

                                                        <p style={{ color: 'orange' }}>Place: <a>{(event.place)}</a></p>
                                                        <p style={{ color: 'orange' }}>Status: <a>{(event.status)}</a></p>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </>
                                    <div className='row' style={{ color: 'white', backgroundColor: 'black', borderRadius: '20px' }}>
                                        <center>
                                            <button type="submit" className="btn btn-success my-5" onClick={updateEvent}>Update Event</button>
                                            <Card style={{ width: '860px' }}>
                                                <Row>
                                                    <Col>
                                                        <form encType="multipart/form-data">
                                                            <InputType labelText={'Title'}
                                                                labelFor={'forTitle'}
                                                                name={'title'}
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}
                                                            />
                                                            <InputType
                                                                labelText={'Place'}
                                                                labelFor={'forPlace'}
                                                                name={'place'}
                                                                value={place}
                                                                onChange={(e) => setPlace(e.target.value)}
                                                            />
                                                            Details:
                                                            <MDBTextArea id='textAreaExample' rows={4}
                                                                name={'details'}
                                                                value={details}
                                                                onChange={(e) => setDetails(e.target.value)}
                                                            />
                                                            <InputType
                                                                labelText="Event Date"
                                                                labelFor="forEventDate"
                                                                inputType="date"
                                                                name="date"
                                                                value={date}
                                                                onChange={(e) => setDate(e.target.value)}
                                                            />
                                                            Event Type:
                                                            <div className="d-flex mb-3 my-2">
                                                                <select
                                                                    className="form-select"
                                                                    name="eventType"
                                                                    value={eventType}
                                                                    onChange={(e) => setEventType(e.target.value)}
                                                                >
                                                                    <option selected>Type: Select</option>
                                                                    <option value="donation">Donation</option>
                                                                    <option value="transfusion">Transfusion</option>
                                                                    <option value="campaign">Campaign</option>
                                                                </select>
                                                            </div>
                                                            Input Image
                                                            <MDBInputGroup
                                                                className='mb-3 my-4'
                                                                textAfter='Upload'
                                                                textTag='label'
                                                                textProps={{ htmlFor: 'avatarFileInput' }}
                                                            >
                                                                <input className='form-control' type='file' id='avatarFileInput' onChange={onChange} />
                                                            </MDBInputGroup>
                                                        </form>
                                                    </Col>
                                                    <Col>

                                                    </Col>
                                                </Row>
                                            </Card>
                                        </center>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEvent
