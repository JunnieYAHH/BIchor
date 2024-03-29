import React, { useState, useEffect, useRef } from 'react'
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
} from 'mdb-react-ui-kit';
import '../index.css';
import { useSelector } from 'react-redux';
import Spinner from '../components/Shared/Spinner';
import AdminHeader from '../components/Layouts/AdminHeader';
import AdminSidebar from '../components/Layouts/AdminSidebar';
import axios from 'axios'
import DonorGenderPieChart from '../components/Charts/DonorGenderPieChart';
import RecipientGenderPieChart from '../components/Charts/RecipientGenderPieChart';
import MonthlyAppointmentsLineChart from '../components/Charts/MonthlyAppointmentsChart';
import ReactPaginate from 'react-paginate';
import EventsStatusBarChart from '../components/Charts/EventsStatusBarChart';
import AppointmentTypeSimpleChart from '../components/Charts/AppointmentTypeSimpleChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [eventError, setEventError] = useState('');
  const { loading } = useSelector(state => state.user);

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
      return event && (event.eventType === 'campaign' || event.eventType === 'donation');
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
      return event && (event.eventType === 'campaign' || event.eventType === 'transfusion');
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

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('Dashboard-Report.pdf');
    });
  };

  return (
    <>
      {loading ? (<Spinner />) : (
        <>
          <div className="custom-homepage my-3">
            <AdminHeader />
            <div className="custom-content">
              <Container fluid>
                <Row>
                  <Col md={2} style={{ backgroundColor: '#191C24' }}>
                    <AdminSidebar />
                  </Col>
                  <Col md={10} style={{ backgroundColor: '#191C24' }} ref={pdfRef}>
                    <Row className="mb-4 " style={{ marginTop: '35px' }}>
                      <Col md={6} className="custom-card-column" style={{ height: '559px', width: '550px' }}>
                        <Card>
                          <CardBody>
                            <Row>
                              <Col>
                                <Card style={{ backgroundColor: '#E41B17' }}>
                                  <CardBody>
                                    <CardTitle className="custom-card-title" style={{ textAlign: 'center', color: 'white' }}>Donors</CardTitle>
                                    <div style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px' }}>
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
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col>
                                <Card style={{ backgroundColor: '#E41B17' }}>
                                  <CardBody>
                                    <CardTitle className="custom-card-title" style={{ textAlign: 'center', color: 'white' }}>Recipients</CardTitle>
                                    <div style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px' }}>
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
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardBody style={{ height: '310px', width: '524px' }}>
                            <Row>
                              <Col style={{ height: '200px', width: '550 px' }}>
                                <center>
                                  <CardTitle className="custom-card-title" style={{ fontSize: '20px' }}>Genders of Donors</CardTitle>
                                </center>
                                <DonorGenderPieChart genderCounts={genderCounts} />
                              </Col>
                              <Col style={{ height: '200px', width: '550px' }}>
                                <center>
                                  <CardTitle className="custom-card-title" style={{ fontSize: '20px' }}>Genders of Recipients</CardTitle>
                                </center>
                                <RecipientGenderPieChart genderRecipientCounts={genderRecipientCounts} />
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md={6} className="custom-card-column">
                        <Card style={{ height: '559px', width: '525px' }}>
                          <CardBody >
                            <CardTitle className="custom-card-title">Donors and Recipients that Appoints Per Month</CardTitle>
                            <MonthlyAppointmentsLineChart appointments={appointments} />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row className='container-fluid my-1'>
                      <Col md={12}>
                        <center>
                          <p style={{ fontWeight: 'bold', fontSize: 50, color: '#C11B17' }}>Events Status</p>

                        </center>
                        <Row>
                          <Col md={6} style={{ height: '525px', width: '525px' }}>
                            <Card>
                              <CardBody>
                                <CardTitle className="custom-card-title">Pending and Completed Events.</CardTitle>
                                <EventsStatusBarChart />
                              </CardBody>
                            </Card>
                          </Col>
                          <Col md={6} style={{ height: '550px', width: '550px' }}>
                            <Card>
                              <CardBody>
                                <CardTitle className="custom-card-title">Appointment Types that the User Appoints.</CardTitle>
                                <AppointmentTypeSimpleChart appointments={appointments} />
                              </CardBody>

                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <center>
                    <button className="btn btn-primary" style={{ height: '100%', width: '20%' }} onClick={downloadPDF}>Download PDF</button>
                  </center>
                </Row>

              </Container>


            </div>

          </div>

        </>

      )}
    </>

  )
}

export default Dashboard
