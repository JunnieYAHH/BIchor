import React, { useState } from 'react';
import InputType from '../../../components/Shared/Form/InputType';
import { Link, useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBCardTitle as CardTitle, MDBInputGroup, MDBTextArea } from 'mdb-react-ui-kit';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios'

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [images, setImage] = useState([]);
    const [clinic, setClinic] = useState('65cef1342062882dd7f8f2da');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('token')

    const navigate = useNavigate();

    const onChange = (e) => {
        setImage(e.target.files);
    };


    const addEvent = async (evenDetails) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}/event/create-event`, evenDetails, config);
            toast.success(data.message);
            setSuccess(data.success);
            navigate('/admin/events')
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const createEvent = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('place', place);
        formData.append('details', details);
        formData.append('date', date);
        formData.append('eventType', eventType);
        formData.append('clinic', clinic);
        formData.append('images', images[0]);

        addEvent(formData);

    };

    return (
        <div>
            <Header sticky />
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar />
                            </div>
                            <div className="col-md-10 my-3">
                                <center>
                                    <Card style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px', width: '960px' }}>
                                        <Row>
                                            <center>
                                                <button type="submit" className="btn btn-success" onClick={createEvent}>Add Event</button>
                                            </center>
                                        </Row>
                                        <Row>
                                            <MDBContainer style={{ width: '950px' }}>
                                                <Card className='my-3' style={{ backgroundColor: 'black', color: 'white' }}>
                                                    <center>
                                                        <Row>
                                                            <Col>
                                                                Create Event Form
                                                                <Row style={{ backgroundColor: 'black', color: 'white' }}>
                                                                    <form encType="multipart/form-data">
                                                                        <center>
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
                                                                        </center>
                                                                    </form>
                                                                </Row>
                                                            </Col>
                                                            <Col>
                                                                <img src="../../assets/images/systemLOGOMAIN.png" alt="TUP" id='tup' style={{ borderRadius: '50px' }} />
                                                            </Col>
                                                        </Row>
                                                    </center>
                                                </Card>
                                            </MDBContainer>
                                        </Row>
                                    </Card>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent