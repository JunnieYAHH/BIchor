import React, { useState } from 'react';
import InputType from '../../../components/Shared/Form/InputType';
import { MDBContainer, MDBRow as Row, MDBCol as Col, MDBCard as Card, MDBCardBody as CardBody, MDBCardTitle as CardTitle, MDBInputGroup, MDBTextArea } from 'mdb-react-ui-kit';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import axios from 'axios'

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [images, setImage] = useState([]);
    const [clinic, setClinic] = useState('65cef1342062882dd7f8f2da');

    const onChange = (e) => {
        setImage(e.target.files);
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
                            <p></p>
                            <p></p>
                            <Card style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px' }}>
                                <Row className='my-3'>
                                    <Row>
                                        <center>
                                            Add Event Page
                                        </center>
                                    </Row>
                                    <Row>
                                        <Card className='my-3' style={{ backgroundColor: 'black', color: 'white' }}>
                                            <center>
                                                <Row>
                                                    <Col>
                                                        Create Event Form
                                                        <Row style={{ backgroundColor: 'black', color: 'white' }}>
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
                                                                <InputType 
                                                                 labelText="Event Type"
                                                                 labelFor="forType"
                                                                 name="type"
                                                                 value={eventType}
                                                                 onChange={(e) => setEventType(e.target.value)}
                                                                />
                                                                Input Image
                                                                <MDBInputGroup
                                                                    className='mb-3 my-4'
                                                                    textAfter='Upload'
                                                                    textTag='label'
                                                                    textProps={{ htmlFor: 'avatarFileInput' }}
                                                                >
                                                                    <input className='form-control' type='file' id='avatarFileInput' />
                                                                </MDBInputGroup>
                                                            </center>
                                                        </Row>
                                                    </Col>
                                                    <Col>
                                                        <img src="../../assets/images/systemLOGOMAIN.png" alt="TUP" id='tup' style={{ borderRadius: '50px' }} />
                                                    </Col>
                                                </Row>
                                            </center>
                                        </Card>
                                    </Row>
                                </Row>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent