import React, { useState, useEffect } from 'react';
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCarousel,
  MDBCarouselItem,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import Header from '../../../components/Layouts/Header';
import Sidebar from '../../../components/Layouts/Sidebar';
import '../../../index.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Campain = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const { user } = useSelector(state => state.user);

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
  }, []);

  return (
    <>
      <Header sticky />
      <Sidebar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '75vh' }}>
        <img src="./assets/images/DONATION.png" classname="img-fluid" alt="banner" style={{ width: '750%', height: '75%', objectFit: 'cover' }} />
      </div>
      <Container>
        <Row>
          <Col md={8} className="offset-md-1">
            <div>
              <hr className="hr" style={{ height: 4, width: 1250, backgroundColor: 'black' }} />
              <hr className="hr" style={{ height: 4, width: 1250, backgroundColor: 'black' }} />
            </div>

            <div style={{ textAlign: 'right', marginLeft: 300 }}>
              <img src="./assets/images/donateicon.png" classname="img-fluid" alt="Wild Landscape" />
            </div>

            <p className="fw-bold" style={{ fontSize: 45, textAlign: 'start', color: 'maroon', paddingLeft: '30px' }}>Donate Now</p>

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
                <img src="./assets/images/person1.png" alt="person1" />
                <div className="mask">
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 card-container">
          <Col md={4} className="order-md-first" style={{ marginLeft: '200px', marginRight: '500px' }}>
            <MDBCard>
              <MDBCardImage
                src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                alt='...'
                position='top'
              />
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a longer card with supporting text below as a natural lead-in to additional content.
                  This content is a little bit longer.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </Col>
        </Row>



      </Container>
    </>
  );
};

export default Campain;