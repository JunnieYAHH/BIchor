import React, { useState } from 'react';
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
  MDBCard as Card,
  MDBCardBody as CardBody,
  MDBCardTitle as CardTitle,
  MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter,
} from 'mdb-react-ui-kit';
import Header from '../components/Layouts/Header';
import Sidebar from '../components/Layouts/Sidebar';
import InputType from '../components/Shared/Form/InputType'
import '../index.css';
import { useSelector } from 'react-redux'


const HomePage = () => {

  const [donateModal, setDonateModal] = useState(false);
  const toggleOpen = () => setDonateModal(!donateModal);

  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useSelector(state => state.user)


  return (
    <>
      <div className="custom-homepage">
        <Header />
        <div className="custom-content">
          <Container fluid>
            <Row>
              <Col md={2}>
                <Sidebar />
              </Col>
              <Col md={10}>
                <Row className="mb-4">
                  <Col md={6} className="custom-card-column">
                    <Card>
                      <CardBody>
                        <CardTitle className="custom-card-title" onClick={toggleOpen}><i class="fa-solid fa-plus"></i>Donate</CardTitle>
                        <p className="custom-card-description">Support a cause by donating today.</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className='container-fluid my-1'>
                  <Col md={12}>
                    <img src="./assets/images/login.jpg" className="img-fluid rounded custom-image" alt="Login" style={{ width: '50%' }} />
                  </Col>
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
                            <option selected value={user.description[0].bloodType}>{user.description[0].bloodType}</option>
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
                          value={user.email}
                          onChange={(e) => setDonorEmail(e.target.value)}
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
