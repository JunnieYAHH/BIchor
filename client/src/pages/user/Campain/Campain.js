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
      <Sidebar/>
      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '75vh'}}>
        <img src="./assets/images/CAMPAIN.png" classname="img-fluid" alt="banner" style={{width: '750%', height: '75%', objectFit: 'cover'}} />
      </div>
      <Container>
        <Row>
          <Col md={8} className="offset-md-1">
            {/* <MDBCarousel showControls showIndicators dark fade style={{ width: '1300px', height: '500px' }}>
              <MDBCarouselItem itemId={1}>
              <img
                  className='d-block w-50'
                  src='./assets/images/CAMPAIN.png' // Use your image as the src
                  alt='logotup' // Add alt text for accessibility
                  id='tuplogo'
                />
              </MDBCarouselItem>
              <MDBCarouselItem itemId={2}>
                <img
                  className='d-block w-100'
                  src='https://mdbootstrap.com/img/Photos/Slides/img%20(20).jpg'
                  alt='Third slide'
                />
              </MDBCarouselItem>
            </MDBCarousel> */}
            <div>
              <hr className="hr" style={{height: 4, width: 1250, backgroundColor: 'black'}} />
              <hr className="hr" style={{height: 4, width: 1250, backgroundColor: 'black'}} />
            </div>
            
            <p className="fw-bold" style={{ fontSize: 45, textAlign: 'start', color: 'maroon', paddingLeft: '30px' }}>Events, Informations, and Awareness</p>

            <div style={{ width: '83vw', height: '70vh', position: 'relative' }}>
              {/* Zoom effect */}
              <style dangerouslySetInnerHTML={{__html: `
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
                <img src="./assets/images/bg1.png" alt="bg1" />
                <div className="mask">
                </div>
              </div>
            </div>

            {/* <div classname="card" style={{textAlign: 'center'}}>
              <div classname="card-header" style={{fontWeight: 'bold'}}>RAISING AWARENESS</div>
              <div classname="card-body">
                <blockquote classname="blockquote mb-0">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer classname="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </div>
            </div> */}

            {/* <div>
              <img src="https://mdbootstrap.com/img/new/textures/small/52.jpg" className="float-none" />
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus reiciendis alias
                asperiores molestiae veniam
                nihil dolore quaerat libero voluptatibus, officia, ut ea deserunt itaque debitis assumenda, aliquid
                rerum officiis
                commodi? Nobis perspiciatis consequatur vero aut, placeat praesentium quam eveniet. A amet provident
                perferendis
                fugit, alias beatae unde qui velit dignissimos quidem architecto doloribus maiores quis ut.
                Eligendi, culpa,
                repudiandae sint quidem molestiae vero dolor cumque fugit aliquid ipsam voluptates distinctio.
                Corporis animi laborum
                nostrum labore similique ullam, optio quidem quae adipisci iste at molestiae, delectus voluptates
                deleniti sint
                molestias modi itaque deserunt officiis asperiores aliquam. Vitae nostrum autem animi assumenda!
              </p>
            </div> */}
            
          </Col>
        </Row>
        <Row className="mt-5 card-container">
          <Col md={4} className="order-md-first" style={{ marginLeft: '200px', marginRight: '500px' }}>
            <MDBCard>
              <MDBCardImage
                src='./assets/images/CAMPAIN.png'
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
        <Row className="mt-5 card-container">
          <Col md={4} className="order-md-first" style={{ marginLeft: '850px', marginRight: '500px' }}>
            <MDBCard>
              <MDBCardImage
                src='./assets/images/CAMPAIN.png'
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
        <Row className="mt-5 card-container">
          <Col md={4} className="order-md-first" style={{ marginLeft: '200px', marginRight: '500px' }}>
            <MDBCard>
              <MDBCardImage
                src='./assets/images/CAMPAIN.png'
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
