import React, { useState, useEffect } from 'react'
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
} from 'mdb-react-ui-kit';
import '../index.css';
import AdminHeader from '../components/Layouts/AdminHeader';
import AdminSidebar from '../components/Layouts/AdminSidebar';
import axios from 'axios'
import DonorGenderPieChart from '../components/Charts/DonorGenderPieChart';
import RecipientGenderPieChart from '../components/Charts/RecipientGenderPieChart';
import MonthlyAppointmentsLineChart from '../components/Charts/MonthlyAppointmentsChart';
import EventsStatusBarChart from '../components/Charts/EventsStatusBarChart';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState('');
  const [eventError, setEventError] = useState('');
  // console.log(users)
  // console.log(appointments)
  // console.log(events)

  useEffect(() => {
    getAllEvents();
    getAllUsers();
    getAllAppointment();
  }, []);

  const token = localStorage.getItem('token');

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
      setLoading(false);
    } catch (error) {
      setEventError(error.response.data.message);
    }
  }

  const getAllUsers = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/user/getAllUsers`, config);
      // console.log(data)
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      setEventError(error.response.data.message);
    }
  }
  const getAllAppointment = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/appointment/getAllAppointments`, config);
      setAppointments(data.data);
      setLoading(false);
    } catch (error) {
      setEventError(error.response.data.message);
    }
  }

  const donorCount = users.filter(user => user.role === 'donor').length;
  const recipientCount = users.filter(user => user.role === 'user').length;

  const donorAppointments = appointments
    .filter(appointment => {
      const user = users.find(user => user._id === appointment.userID);
      return user && user.role === 'donor';
    })
    .filter(appointment => {
      const event = events.find(event => event._id === appointment.event);
      return event && event.eventType === 'donation';
    })
    .map(appointment => {
      return {
        appointmentID: appointment._id,
        appointmentData: appointment
      };
    });

  const donorAppointmentsCount = donorAppointments.length;

  const recipientAppointments = appointments
    .filter(appointment => {
      const user = users.find(user => user._id === appointment.userID);
      return user && user.role === 'user';
    })
    .filter(appointment => {
      const event = events.find(event => event._id === appointment.event);
      return event && event.eventType === 'campain';
    })
    .map(appointment => {
      return {
        appointmentID: appointment._id,
        appointmentData: appointment
      };
    });

  const recipientAppointmentsCount = recipientAppointments.length;

  // console.log("Recipients Appointments:", recipientAppointments);

  const genderCounts = users.reduce((counts, user) => {
    if (user.role === 'donor') {
      const gender = user.description && user.description.length > 0 ? user.description[0].sex : '';
      if (gender) {
        if (!counts[gender]) {
          counts[gender] = 1;
        } else {
          counts[gender]++;
        }
      }
    }
    return counts;
  }, {});

  const highestGenderCount = Math.max(...Object.values(genderCounts));
  const highestGenders = Object.keys(genderCounts).filter(gender => genderCounts[gender] === highestGenderCount);

  const genderRecipientCounts = users.reduce((counts, user) => {
    if (user.role === 'user') {
      const gender = user.description && user.description.length > 0 ? user.description[0].sex : '';
      if (gender) {
        if (!counts[gender]) {
          counts[gender] = 1;
        } else {
          counts[gender]++;
        }
      }
    }
    return counts;
  }, {});

  const highestGenderRecipientCount = Math.max(...Object.values(genderRecipientCounts));
  const recipientHighestGenders = Object.keys(genderRecipientCounts).filter(gender => genderRecipientCounts[gender] === highestGenderRecipientCount);

  /////////////////////////////
  //// EVENTS STATUSS FILTER///
  // Filter pending ///////////
  const pendingEvents = events.filter(event => event.status === 'pending');

  // Filter completed events
  const completedEvents = events.filter(event => event.status === 'completed');

  return (
    <>
      <div className="custom-homepage">
        <AdminHeader />
        <div className="custom-content">
          <Container fluid>
            <Row>
              <Col md={2}>
                <AdminSidebar />
              </Col>
              <Col md={10}>
                <Row className="mb-4 " style={{ marginTop: '35px' }}>
                  <center>
                    <p style={{ fontWeight: 'bold' }}>Admin Dashboard</p>
                  </center>
                  <Col md={6} className="custom-card-column">
                    <Card>
                      <CardBody>
                        <Row>
                          <Col>
                            <CardTitle className="custom-card-title" style={{ textAlign: 'center' }}>Donors</CardTitle>
                            <div style={{ textAlign: 'center' }}>
                              Numbers of Donors
                              <p>{donorCount}</p>
                              <div>
                                <Row>
                                  <Col>
                                    <a style={{ fontSize: 'smaller', fontWeight: 'bold' }}>Appointments</a>
                                    <p style={{ fontSize: 'smaller' }}>{donorAppointmentsCount}</p>
                                  </Col>
                                  <Col>
                                    <a style={{ fontSize: 'smaller', fontWeight: 'bold' }}>Most Gender that Donates</a>
                                    {highestGenders.includes('male') && <p>Male</p>}
                                    {highestGenders.includes('female') && <p>Female</p>}
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <CardTitle className="custom-card-title" style={{ textAlign: 'center' }}>Recipients</CardTitle>
                            <div style={{ textAlign: 'center' }}>
                              Numbers of Recipients
                              <p>{recipientCount}</p>
                              <div>
                                <Row>
                                  <Col>
                                    <a style={{ fontSize: 'smaller', fontWeight: 'bold' }}>Appointments</a>
                                    <p style={{ fontSize: 'smaller' }}>{recipientAppointmentsCount}</p>
                                  </Col>
                                  <Col>
                                    <a style={{ fontSize: 'smaller', fontWeight: 'bold' }}> Most Gender that Receive</a>
                                    {recipientHighestGenders.includes('male') && <p>Male</p>}
                                    {recipientHighestGenders.includes('female') && <p>Female</p>}
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody style={{ height: '300px', width: '550px' }}>
                        <Row>
                          <Col style={{ height: '250px', width: '550 px' }}>
                            <CardTitle className="custom-card-title">Genders of Donors</CardTitle>
                            <DonorGenderPieChart genderCounts={genderCounts} />
                          </Col>
                          <Col style={{ height: '250px', width: '550 px' }}>
                            <CardTitle className="custom-card-title">Genders of Recipients</CardTitle>
                            <RecipientGenderPieChart genderRecipientCounts={genderRecipientCounts} />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={6} className="custom-card-column">
                    <Card>
                      <CardBody>
                        <CardTitle className="custom-card-title">Donors and Recipents that Appoints Per Month</CardTitle>
                        <MonthlyAppointmentsLineChart appointments={appointments} />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className='container-fluid my-1'>
                  <Col md={12}>
                    <center>
                      <p id='importantPanimula'>Events Status</p>
                      <Col>
                        <Row>
                          <Col>
                            <EventsStatusBarChart />
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <h4>Pending Events</h4>
                                <ul>
                                  {pendingEvents.map(event => (
                                    <>
                                      <p key={event._id}>{event.title}</p>
                                      {event.images.length > 0 && (
                                        <img src={event.images[0].url} alt={event.title} className="event-image" style={{ marginRight: '10px' }} />
                                      )}
                                    </>
                                  ))}
                                </ul>
                              </Col>
                              <Col>
                                <h4>Completed Events</h4>
                                <ul>
                                  {completedEvents.map(event => (
                                    <>
                                      <p key={event._id}>{event.title}</p>
                                      {event.images.length > 0 && (
                                        <img src={event.images[0].url} alt={event.title} className="event-image" style={{ marginRight: '10px' }} />
                                      )}
                                    </>
                                  ))}
                                </ul>
                              </Col>
                            </Row>
                          </Col>
                          {/* <Col>
                            <h4>Pending Events</h4>
                            <ul>
                              {pendingEvents.map(event => (
                                <li key={event._id}>{event.title}</li>
                              ))}
                            </ul>
                          </Col>
                          <Col>
                            <h4>Completed Events</h4>
                            <ul>
                              {completedEvents.map(event => (
                                <li key={event._id}>{event.title}</li>
                              ))}
                            </ul>
                          </Col> */}
                        </Row>
                      </Col>
                    </center>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Dashboard
