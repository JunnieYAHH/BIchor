import React, { useState, useEffect } from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
    MDBCardTitle as CardTitle,
    MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter,
} from 'mdb-react-ui-kit';
// import Header from '../components/Layouts/Header';
import Header from '../../../components/Layouts/Header'
import Sidebar from '../../../components/Layouts/Sidebar';
import InputType from '../../../components/Shared/Form/InputType'
import '../../../index.css';
import { useSelector } from 'react-redux'
import axios from 'axios'
import 'mdb-react-ui-kit'

const DonationPage = () => {


    const [donateModal, setDonateModal] = useState(false);
    const toggleOpen = () => setDonateModal(!donateModal);

    const [inventoryType, setInventoryType] = useState('in');
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('')

    const { user } = useSelector(state => state.user)

    // console.log(events)

    const token = localStorage.getItem('token')
    // console.log(token)
    const getAllEvents = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config)
            // console.log(data)
            setEvents(data.data); // Set events using data.data
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        getAllEvents();
    }, [error]);

    return (
        <>
            <div className="custom-homepage my-5">
                <Header sticky />
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
                                            <img src="./assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                            <div style={{ marginLeft: '20px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                                <p style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>The Donations are HERE!</p>
                                                <p style={{ textAlign: 'center' }}>
                                                    This will be the page that handles blood donation events that the local health centers post. We will be cooperating by creating an efficient way to process the blood donation.
                                                </p>
                                                {/* <p style={{ textAlign: 'center' }}>- A Comprehensive Study</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-4">
                                    <div className="container">
                                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                            <p style={{ margin: '0' }}>DONATIONS</p>
                                        </div>
                                    </div>
                                    {events && events.map(event => (
                                        event.eventType === 'donation' && (
                                            <Col md={6} sm={12} className="custom-card-column my-2" key={event._id}>
                                                <Card style={{ height: '450px', width: '100%' }}>
                                                    <CardBody>
                                                        <CardTitle className="custom-card-title" onClick={toggleOpen}>
                                                            <i className="fa-solid fa-plus" style={{ cursor: "pointer" }}></i> Donate
                                                        </CardTitle>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            {event.images && event.images.map(image => (
                                                                <img key={image.public_id} src={image.url} alt={event.title} className="event-image" style={{ marginRight: '10px' }} />
                                                            ))}
                                                            <div>
                                                                <p className="custom-card-description" style={{ fontWeight: 'bold', color: 'black' }}>Title: <p style={{ fontWeight: 'bold', color: 'red' }}>{event.title}</p></p>
                                                                <p className="custom-card-description">{event.date}</p>
                                                                <p className="custom-card-description" style={{ fontWeight: 'bold', color: 'black' }}>Place<p style={{ fontWeight: 'bold', color: 'red' }}>{event.place}</p></p>
                                                                <p className="custom-card-description">{event.status}</p>
                                                            </div>
                                                        </div>
                                                        <p style={{ fontWeight: 'bold' }}>Details:</p>
                                                        <p className="custom-card-description">{event.details}</p>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    ))}
                                </Row>
                            </Col>
                        </Row>

                        <MDBModal tabIndex="-1" open={donateModal} setOpen={setDonateModal}>
                            <MDBModalDialog centered size="">
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>Donate</MDBModalTitle>
                                        <MDBBtn
                                            className="btn-close"
                                            color="none"
                                            onClick={toggleOpen}
                                        ></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <div className="d-flex">
                                            Blood Type: &nbsp;
                                            <div className='form-check ms-3'>
                                                <input type='radio'
                                                    name='inRadio'
                                                    defaultChecked
                                                    value={'in'}
                                                    onChange={(e) => setInventoryType(e.target.value)}
                                                    className='form-check-input' />
                                                <label htmlFor='in' className='form-check-label'>
                                                    IN
                                                </label>
                                            </div>
                                            <div className='form-check ms-3'>
                                                <input type='radio'
                                                    name='inRadio'
                                                    value={'out'}
                                                    onChange={(e) => setInventoryType(e.target.value)}
                                                    className='form-check-input' />
                                                <label htmlFor='out' className='form-check-label'>
                                                    OUT
                                                </label>
                                            </div>
                                        </div>
                                        {user && (
                                            <>
                                                <select className="form-select"
                                                    aria-label="Default select example"
                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                >
                                                    {user && user.description && user.description.length > 0 ? (
                                                        <option defaultValue value={user.description[0].bloodType}>{user.description[0].bloodType}</option>
                                                    ) : (
                                                        <>
                                                            <option selected>Select</option>
                                                            <option value={'O+'}>O+</option>
                                                            <option value={'O-'}>O-</option>
                                                            <option value={'A+'}>A+</option>
                                                            <option value={'A-'}>A-</option>
                                                            <option value={'B+'}>B+</option>
                                                            <option value={'B-'}>B-</option>
                                                            <option value={'AB+'}>AB+</option>
                                                            <option value={'AB-'}>AB-</option>
                                                        </>
                                                    )}
                                                </select>
                                                <InputType labelText="Donor Email"
                                                    labelFor={'donorEmail'}
                                                    inputType={'email'}
                                                    value={user.email}
                                                    onChange={(e) => setDonorEmail(e.target.value)}
                                                />
                                                <InputType labelText="Quantity"
                                                    labelFor={'quantity'}
                                                    inputType={'Number'}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </>
                                        )}

                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <button type='button' className="btn btn-secondary" onClick={toggleOpen}>
                                            Close
                                        </button>
                                        <button type='button' className="btn btn-primary" onClick={toggleOpen}>
                                            Submit
                                        </button>
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>

                    </Container>
                </div >
            </div >
        </>
    );
}

export default DonationPage
