import React, { useState, useEffect } from 'react';
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
  MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput,
} from 'mdb-react-ui-kit';
import InputType from '../../../components/Shared/Form/InputType';
import Header from '../../../components/Layouts/Header';
import Sidebar from '../../../components/Layouts/Sidebar';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../../../index.css';
import axios from 'axios';

const TransfusionPage = () => {
  const navigate = useNavigate();
  const [eventID, setEventId] = useState('');
  const [donateModal, setDonateModal] = useState(false);
  const toggleOpen = (eventId) => {
    setEventId(eventId);
    setDonateModal(!donateModal);
  };
  const { user } = useSelector(state => state.user)
  const [appointmentType, setAppointmentType] = useState('out');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState('');
  const [clinic, setClinic] = useState('65cef1342062882dd7f8f2da');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')

  const token = localStorage.getItem('token');

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

  useEffect(() => {
    getAllEvents();
    if (user && user._id) {
      setUserID(user._id);
    }
  }, [error]);


  const createNewAppointment = async (newAppointment) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}/appointment/create-appointment`, newAppointment, config);
      toast.success(data.message);
      setSuccess(data.success);
      navigate('/')
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const createAppointment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('appointmentType', appointmentType);
    formData.append('event', eventID);
    formData.append('clinic', clinic);
    formData.append('bloodGroup', bloodGroup);
    formData.append('email', email);
    formData.append('quantity', quantity);
    formData.append('userID', userID);
    formData.append('status', 'pending');

    createNewAppointment(formData);
  };

  return (
    <>
      <Header sticky />
      <Sidebar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '60vh' }}>
        <img src="./assets/images/TRANSFUSION.png" classname="img-fluid" alt="banner" style={{ width: '750%', height: '75%', objectFit: 'cover' }} />
      </div>
      <Container>
        <Row>
          <Col md={8} className="offset-md-1">
            <div>
              <hr className="hr" style={{ height: 4, width: 1250, backgroundColor: 'black' }} />
              <hr className="hr" style={{ height: 4, width: 1250, backgroundColor: 'black' }} />
            </div>
            <p className="fw-bold" style={{ fontSize: 45, textAlign: 'start', color: 'maroon', paddingLeft: '30px' }}>Need For Blood?</p>

            <div style={{ width: '83vw', height: '60vh', position: 'relative' }}>
              {/* Zoom effect */}
              <style dangerouslySetInnerHTML={{
                __html: `
                .zoom-effect {
                  overflow: hidden;
                  position: relative;
                  width: 100%;
                  height: 100%;
                }

                .zoom-effect img {
                  transition: transform 0.3s ease;
                  width: 100%;
                  height: 100%;
                  object-fit: cover; /* Maintain aspect ratio and cover the entire container */
                }

                .zoom-effect:hover img {
                  transform: scale(1.2); /* Zoom effect on hover */
                }

                .mask {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }

                .mask p {
                  color: black;
                  font-size: 24px;
                }
              `}} />
              <div className="zoom-effect">
                <img src="./assets/images/bg2.png" alt="bg2" />
                <div className="mask">
                </div>
              </div>
            </div>
            <Row className="mt-5 card-container">
              {events && events.map(event => (
                event.eventType === 'transfusion' && (
                  <Col md={6} sm={12} className="custom-card-column my-2" key={event._id}>
                    <Card style={{ height: '450px', width: '100%' }}>
                      <CardBody>
                        <CardTitle className="custom-card-title" onClick={() => toggleOpen(event._id)} >
                          {user && user.description && user.description.length > 0 && (
                            <>
                              <i className="fa-solid fa-plus" style={{ cursor: "pointer" }}></i>
                              <a>
                                Transfuse
                              </a>
                            </>
                          )}
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
                <MDBModalTitle ><span className="badge bg-secondary" style={{ fontSize: '18px' }}>
                  Transfusion
                </span></MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form >
                  <div className="d-flex">
                    <div name='eventID' value={eventID}></div>
                    <div name='clinicID' value={clinic}></div>
                    <span className="badge bg-secondary" style={{ fontSize: '15px' }}>
                      BloodType:
                    </span>
                    <Row style={{ marginLeft: '50%' }}>
                      <div className='form-check ms-3'>
                        <input type='radio'
                          name='inRadio'
                          value={'in'}
                          onChange={(e) => setAppointmentType(e.target.value)}
                          className='form-check-input'
                          style={{
                            width: '20px',
                            height: '20px',
                            marginRight: '5px',
                            border: '2px solid #007bff',
                            borderRadius: '50%'
                          }} />
                        <span className="badge bg-secondary" style={{ fontSize: '15px' }}>
                          Transfuse
                        </span>
                      </div>
                    </Row>
                  </div>
                  {user && (
                    <>
                      <select className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setBloodGroup(e.target.value)}
                      >
                        {user && user.description && user.description.length > 0 ? (
                          <>
                            <option selected>Select</option>
                            <option value={user.description[0].bloodType}>{user.description[0].bloodType} </option>
                          </>
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
                            <option value={'K'}>K-</option>
                          </>
                        )}
                      </select>
                      <br />
                      <span className="badge bg-secondary" style={{ fontSize: '15px' }}>
                        Email:
                      </span>
                      <InputType
                        labelFor={'email'}
                        inputType={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <br />
                      <span className="badge bg-secondary" style={{ fontSize: '15px', display: 'inline-flex' }}>
                        Quantity:
                      </span>
                      <InputType
                        labelFor={'quantity'}
                        inputType={'Number'}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </>
                  )}
                </form>
              </MDBModalBody>
              <MDBModalFooter>
                <button type='button' className="btn btn-secondary" onClick={toggleOpen}>
                  Close
                </button>
                <button type="submit" className="btn btn-success" onClick={createAppointment}>
                  Submit
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Container>
    </>
  );
};

export default TransfusionPage;
