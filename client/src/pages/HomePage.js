import React, { useState, useEffect } from 'react';
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
  MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBTextArea,
} from 'mdb-react-ui-kit';
import Header from '../components/Layouts/Header';
import Sidebar from '../components/Layouts/Sidebar';
import InputType from '../components/Shared/Form/InputType'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import axios from 'axios'
import 'mdb-react-ui-kit'
import '../index.css';
import Spinner from '../components/Shared/Spinner';


const HomePage = () => {
  const [eventID, setEventId] = useState('');
  const [donateModal, setDonateModal] = useState(false);

  const toogleAdd = (eventId) => {
    setEventId(eventId);
    setDonateModal(!donateModal);
  };

  const { user } = useSelector(state => state.user)

  const [appointmentType, setAppointmentType] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const [history, setHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [record, setRecord] = useState('');
  const [allergy, setAllergy] = useState('');
  const [weight, setWeight] = useState('');
  const [reason, setReason] = useState('');
  const [userID, setUserID] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData && userData._id ? userData._id : '';
  });

  const [email, setEmail] = useState('');
  const [events, setEvents] = useState([]);
  const { loading } = useSelector(state => state.user);
  const [clinic, setClinic] = useState('65cef1342062882dd7f8f2da');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')

  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
    if (isNaN(newWeight)) {
      setWeight('');
    } else if (parseFloat(newWeight) < 45) {
      toast.error('Weight should be at least 45.');
    }
  };

  const [showMedicationInput, setShowMedicationInput] = useState(false);
  const handleRadioChange = (e) => {
    setShowMedicationInput(!showMedicationInput);
  };
  const [showRecordInput, setRecordInput] = useState(false);
  const handleRecordYes = (e) => {
    setRecordInput(!showRecordInput);
  };
  const [showAllergyInput, setAllergyInput] = useState(false);
  const handleRadioChangeAlergy = (e) => {
    setAllergyInput(!showAllergyInput);
  };

  const token = localStorage.getItem('token')
  const getAllEvents = async () => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config)
      setEvents(data.data);
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    getAllEvents();
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData._id) {
      setUserID(userData._id);
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
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  console.log(userID)

  const createApointment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('appointmentType', appointmentType);
    formData.append('event', eventID);
    formData.append('clinic', clinic);
    formData.append('bloodGroup', bloodGroup);
    formData.append('email', email);
    formData.append('history', history);
    formData.append('medication', medication);
    formData.append('weight', weight);
    formData.append('allergy', allergy);
    formData.append('record', record);
    formData.append('reason', reason);
    // formData.append('quantity', quantity);
    formData.append('userID', userID);
    formData.append('status', 'pending');

    createNewAppointment(formData);
  };

  const donationEvent = events.find(event => event._id === eventID && event.eventType === 'donation');
  const transfusionEvent = events.find(event => event._id === eventID && event.eventType === 'transfusion');

  return (
    <>
      {loading ? (<Spinner />) : (
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
                        <img src="./assets/images/logoBIchor.png" alt="logotup" id="tuplogo" style={{width: '200px', height: '180px', borderRadius: '50%'}} />
                          <div style={{ marginLeft: '20px', padding: '20px', background: '#f0f0f0', border: '5px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>Technological University of the Philippines, Taguig City</p>
                            <p style={{ textAlign: 'center' }}>Sustaining Lifelines: Enhancing the Blood Donation System for Improved Access, Efficiency, and Awareness </p>
                            <p style={{ textAlign: 'center' }}>- A Comprehensive Study</p>
                          </div>
                        </div>
                      </div>
                    </Row>
                    {user && (user.role === 'donor' || user.role === 'admin') && (
                      <Row className="mb-4">
                        <div className="container">
                          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <p style={{ margin: '0' }}>DONATIONS</p>
                          </div>
                        </div>
                        <div style={{ width: '83vw', height: '70vh', position: 'relative' }}>
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
                            <img src="./assets/images/donatebg.png" alt="donatebg" />
                            <div className="mask">
                            </div>
                          </div>
                        </div>
                        {events && events.map(event => (
                          event.eventType === 'donation' && (
                            <Col md={6} sm={12} className="custom-card-column my-2" key={event._id}>
                              <Card style={{ height: '450px', width: '100%' }}>
                                <CardBody>
                                  <CardTitle className="custom-card-title" onClick={() => toogleAdd(event._id)}>
                                    {user && user.description && user.description.length > 0 && (
                                      <>
                                        <i className="fa-solid fa-plus" style={{ cursor: "pointer" }}></i>
                                        <a>
                                          Donate
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
                    )}
                    {user && (user.role === 'user' || user.role === 'admin') && (
                      <Row className="mb-4">
                        <div className="container">
                          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <p style={{ margin: '0' }}>TRANSFUSIONS</p>
                          </div>
                        </div>
                        <div style={{ width: '83vw', height: '70vh', position: 'relative' }}>
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
                            <img src="./assets/images/transfusionbg.png" alt="transfusionbg" />
                            <div className="mask">
                            </div>
                          </div>
                        </div>
                        {events && events.map(event => (
                          event.eventType === 'transfusion' && (
                            <Col md={6} sm={12} className="custom-card-column my-2" key={event._id}>
                              <Card style={{ height: '450px', width: '100%' }}>
                                <CardBody>
                                  <CardTitle className="custom-card-title" onClick={() => toogleAdd(event._id)} >
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
                    )}
                    <Row className="mb-4">
                      <div className="container">
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                          <p style={{ margin: '0' }}>CAMPAIGNS</p>
                        </div>
                      </div>
                      <div style={{ width: '83vw', height: '70vh', position: 'relative' }}>
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
                          <img src="./assets/images/campainbg.png" alt="campainbg" />
                          <div className="mask">
                          </div>
                        </div>
                      </div>
                      {events && events.map(event => (
                        event.eventType === 'campaign' && (
                          <Col md={6} sm={12} className="custom-card-column my-2" key={event._id}>
                            <Card style={{ height: '450px', width: '100%' }}>
                              <CardBody>
                                <CardTitle className="custom-card-title" onClick={(e) => toogleAdd(event._id)}>
                                  {user && user.description && user.description.length > 0 && (
                                    <>
                                      <i className="fa-solid fa-plus" style={{ cursor: "pointer" }}></i>
                                      <a>
                                        Apply
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
                      {donationEvent && (
                        <>
                          <MDBModalHeader style={{ backgroundColor: '#970707', color: 'white' }}>
                            <MDBModalTitle >Donate</MDBModalTitle>
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={toogleAdd}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody style={{ backgroundColor: '#bd440c', color: 'white' }}>
                            <form >
                              <>
                                <div className="d-flex">
                                  <div name='eventID' value={eventID}></div>
                                  <div name='clinicID' value={clinic}></div>
                                  <div className='form-check ms-3'>
                                    <input type='radio'
                                      name='inRadio'
                                      value={'out'}
                                      onChange={(e) => setAppointmentType(e.target.value)}
                                      className='form-check-input' />
                                    <label htmlFor='out' className='form-check-label'>
                                      Donate
                                    </label>
                                  </div>
                                </div>
                                {user && (
                                  <>
                                    <InputType labelText="Email"
                                      labelFor={'email'}
                                      inputType={'email'}
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    What is Your Blood Type: &nbsp;
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
                                    <InputType
                                      labelText={'What is Your Weight?'}
                                      labelFor={'forWeight'}
                                      name={'weight'}
                                      value={weight}
                                      onChange={handleWeightChange}
                                    />
                                    <p>Have you ever Donated Before?</p>
                                    <div className='form-check ms-3'>
                                      <input type='radio'
                                        name='historyRadio'
                                        value={'donated'}
                                        onChange={(e) => setHistory(e.target.value)}
                                        className='form-check-input' />
                                      <label htmlFor='out' className='form-check-label'>
                                        Yes
                                      </label>
                                    </div>
                                    <div className='form-check ms-3'>
                                      <input type='radio'
                                        name='historyRadio'
                                        value={'no'}
                                        onChange={(e) => setHistory(e.target.value)}
                                        className='form-check-input' />
                                      <label htmlFor='out' className='form-check-label'>
                                        No
                                      </label>
                                    </div>
                                    <p>Are you currently taking some medication?</p>
                                    <div className='form-check ms-3'>
                                      <Row>
                                        <Col>
                                          <input
                                            type='radio'
                                            name='medicationRadio'
                                            value='yes'
                                            onChange={handleRadioChange}
                                            className='form-check-input'
                                          />
                                          <label htmlFor='yes' className='form-check-label'>
                                            Yes
                                          </label>
                                        </Col>
                                        <Col>
                                          <input type='radio'
                                            name='medicationRadio'
                                            value={'no'}
                                            onChange={(e) => setMedication(e.target.value)}
                                            className='form-check-input' />
                                          <label htmlFor='out' className='form-check-label'>
                                            No
                                          </label>
                                        </Col>
                                        {showMedicationInput && (
                                          <InputType labelText='Specify What are you taking'
                                            labelFor={'medication'}
                                            inputType={'text'}
                                            value={medication}
                                            onChange={(e) => setMedication(e.target.value)}
                                          />
                                        )}
                                      </Row>
                                    </div>
                                    <p>Any known allergies?</p>
                                    <div className='form-check ms-3'>
                                      <Row>
                                        <Col>
                                          <input
                                            type='radio'
                                            name='allergyRadio'
                                            onChange={handleRadioChangeAlergy}
                                            className='form-check-input'
                                          />
                                          <label htmlFor='yes' className='form-check-label'>
                                            Yes
                                          </label>
                                        </Col>
                                        <Col>
                                          <input type='radio'
                                            name='allergyRadio'
                                            value={'no'}
                                            onChange={(e) => setAllergy(e.target.value)}
                                            className='form-check-input' />
                                          <label htmlFor='out' className='form-check-label'>
                                            No
                                          </label>
                                        </Col>
                                        {showAllergyInput && (
                                          <InputType labelText='What known allergy?'
                                            labelFor={'allergy'}
                                            inputType={'text'}
                                            value={allergy}
                                            onChange={(e) => setAllergy(e.target.value)}
                                          />
                                        )}
                                      </Row>
                                    </div>
                                    <p>Did you have any record/s of illness in the past 3 months?</p>
                                    <Row>
                                      <Col>
                                        <input
                                          type='radio'
                                          name='recordRadio'
                                          value='recordYes'
                                          onChange={handleRecordYes}
                                          className='form-check-input'
                                        />
                                        <label htmlFor='yes' className='form-check-label'>
                                          Yes
                                        </label>
                                      </Col>
                                      <Col>
                                        <input type='radio'
                                          name='recordRadio'
                                          value={'no'}
                                          onChange={(e) => setRecord(e.target.value)}
                                          className='form-check-input' />
                                        <label htmlFor='out' className='form-check-label'>
                                          No
                                        </label>
                                      </Col>
                                      {showRecordInput && (
                                        <InputType labelText="Like What?"
                                          labelFor={'record'}
                                          inputType={'record'}
                                          value={record}
                                          onChange={(e) => setRecord(e.target.value)}
                                        />
                                      )}
                                    </Row>
                                    <Row>
                                      <Col>
                                        Reasons for Donation:
                                        <MDBTextArea rows={5}
                                          value={reason}
                                          onChange={(e) => setReason(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </>
                                )}
                              </>
                            </form>
                          </MDBModalBody>
                          <MDBModalFooter style={{ backgroundColor: '#970707', color: 'white' }}>
                            <h6 style={{ fontSize: '9px' }}>This data will be protected and not be used to any activity other than this.</h6>
                            <button type='button' className="btn btn-secondary" onClick={toogleAdd}>
                              Close
                            </button>
                            <button type="submit" className="btn btn-success" onClick={createApointment}>
                              Submit
                            </button>
                          </MDBModalFooter>
                        </>
                      )}
                      {transfusionEvent && (
                        <>
                          <MDBModalHeader style={{ backgroundColor: '#970707', color: 'white' }}>
                            <MDBModalTitle >Transfusion</MDBModalTitle>
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={toogleAdd}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody style={{ backgroundColor: '#bd440c', color: 'white' }}>
                            <form >
                              <>
                                <div className="d-flex">
                                  <div name='eventID' value={eventID}></div>
                                  <div name='clinicID' value={clinic}></div>
                                  <div className='form-check ms-3'>
                                    <input type='radio'
                                      name='inRadio'
                                      value={'in'}
                                      onChange={(e) => setAppointmentType(e.target.value)}
                                      className='form-check-input' />
                                    <label htmlFor='in' className='form-check-label'>
                                      Transfuse
                                    </label>
                                  </div>
                                </div>
                                {user && (
                                  <>
                                    <InputType labelText="Email"
                                      labelFor={'email'}
                                      inputType={'email'}
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    What is Your Blood Type: &nbsp;
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
                                    <InputType
                                      labelText={'What is Your Weight?'}
                                      labelFor={'forWeight'}
                                      name={'weight'}
                                      value={weight}
                                      onChange={(e) => setWeight(e.target.value)}
                                      />
                                    <p>Have you ever been Transfused Before?</p>
                                    <div className='form-check ms-3'>
                                      <input type='radio'
                                        name='historyRadio'
                                        value={'transfused'}
                                        onChange={(e) => setHistory(e.target.value)}
                                        className='form-check-input' />
                                      <label htmlFor='out' className='form-check-label'>
                                        Yes
                                      </label>
                                    </div>
                                    <div className='form-check ms-3'>
                                      <input type='radio'
                                        name='historyRadio'
                                        value={'no'}
                                        onChange={(e) => setHistory(e.target.value)}
                                        className='form-check-input' />
                                      <label htmlFor='out' className='form-check-label'>
                                        No
                                      </label>
                                    </div>
                                    <p>Are you currently taking some medication?</p>
                                    <div className='form-check ms-3'>
                                      <Row>
                                        <Col>
                                          <input
                                            type='radio'
                                            name='medicationRadio'
                                            value='yes'
                                            onChange={handleRadioChange}
                                            className='form-check-input'
                                          />
                                          <label htmlFor='yes' className='form-check-label'>
                                            Yes
                                          </label>
                                        </Col>
                                        <Col>
                                          <input type='radio'
                                            name='medicationRadio'
                                            value={'no'}
                                            onChange={(e) => setMedication(e.target.value)}
                                            className='form-check-input' />
                                          <label htmlFor='out' className='form-check-label'>
                                            No
                                          </label>
                                        </Col>
                                        {showMedicationInput && (
                                          <InputType labelText='Specify What are you taking'
                                            labelFor={'medication'}
                                            inputType={'text'}
                                            value={medication}
                                            onChange={(e) => setMedication(e.target.value)}
                                          />
                                        )}
                                      </Row>
                                    </div>
                                    <p>Any known allergies?</p>
                                    <div className='form-check ms-3'>
                                      <Row>
                                        <Col>
                                          <input
                                            type='radio'
                                            name='allergyRadio'
                                            onChange={handleRadioChangeAlergy}
                                            className='form-check-input'
                                          />
                                          <label htmlFor='yes' className='form-check-label'>
                                            Yes
                                          </label>
                                        </Col>
                                        <Col>
                                          <input type='radio'
                                            name='allergyRadio'
                                            value={'no'}
                                            onChange={(e) => setAllergy(e.target.value)}
                                            className='form-check-input' />
                                          <label htmlFor='out' className='form-check-label'>
                                            No
                                          </label>
                                        </Col>
                                        {showAllergyInput && (
                                          <InputType labelText='What known allergy?'
                                            labelFor={'allergy'}
                                            inputType={'text'}
                                            value={allergy}
                                            onChange={(e) => setAllergy(e.target.value)}
                                          />
                                        )}
                                      </Row>
                                    </div>
                                    <p>Did you have any record/s of illness in the past 3 months?</p>
                                    <Row>
                                      <Col>
                                        <input
                                          type='radio'
                                          name='recordRadio'
                                          value='recordYes'
                                          onChange={handleRecordYes}
                                          className='form-check-input'
                                        />
                                        <label htmlFor='yes' className='form-check-label'>
                                          Yes
                                        </label>
                                      </Col>
                                      <Col>
                                        <input type='radio'
                                          name='recordRadio'
                                          value={'no'}
                                          onChange={(e) => setRecord(e.target.value)}
                                          className='form-check-input' />
                                        <label htmlFor='out' className='form-check-label'>
                                          No
                                        </label>
                                      </Col>
                                      {showRecordInput && (
                                        <InputType labelText="Like What?"
                                          labelFor={'record'}
                                          inputType={'record'}
                                          value={record}
                                          onChange={(e) => setRecord(e.target.value)}
                                        />
                                      )}
                                    </Row>
                                    <Row>
                                      <Col>
                                        Reasons for Transfusion:
                                        <MDBTextArea rows={5}
                                          value={reason}
                                          onChange={(e) => setReason(e.target.value)}
                                        />
                                      </Col>
                                    </Row>
                                  </>
                                )}
                              </>
                            </form>
                          </MDBModalBody>
                          <MDBModalFooter style={{ backgroundColor: '#970707', color: 'white' }}>
                            <h6 style={{ fontSize: '9px' }}>This data will be protected and not be used to any activity other than this.</h6>
                            <button type='button' className="btn btn-secondary" onClick={toogleAdd}>
                              Close
                            </button>
                            <button type="submit" className="btn btn-success" onClick={createApointment}>
                              Submit
                            </button>
                          </MDBModalFooter>
                        </>
                      )}
                      {!donationEvent && !transfusionEvent && (
                        <>
                          <MDBModalHeader style={{ backgroundColor: '#970707', color: 'white' }}>
                            <MDBModalTitle >Campain</MDBModalTitle>
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={toogleAdd}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody style={{ backgroundColor: '#bd440c', color: 'white' }}>
                            <form >
                              <>
                                <div className="d-flex">
                                  <div name='eventID' value={eventID}></div>
                                  <div name='clinicID' value={clinic}></div>
                                  <div className='form-check ms-3'>
                                    <input type='radio'
                                      name='inRadio'
                                      value={'apply'}
                                      onChange={(e) => setAppointmentType(e.target.value)}
                                      className='form-check-input' />
                                    <label htmlFor='apply' className='form-check-label'>
                                      Apply
                                    </label>
                                  </div>
                                </div>
                                {user && (
                                  <>
                                    <InputType labelText="Email"
                                      labelFor={'email'}
                                      inputType={'email'}
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </>
                                )}
                              </>
                            </form>
                          </MDBModalBody>
                          <MDBModalFooter style={{ backgroundColor: '#970707', color: 'white' }}>
                            <h6 style={{ fontSize: '9px' }}>This data will be protected and not be used to any activity other than this.</h6>
                            <button type='button' className="btn btn-secondary" onClick={toogleAdd}>
                              Close
                            </button>
                            <button type="submit" className="btn btn-success" onClick={createApointment}>
                              Submit
                            </button>
                          </MDBModalFooter>
                        </>
                      )}
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </Container>
            </div >
          </div >
        </>
      )}
    </>
  );
};

export default HomePage;
