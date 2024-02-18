import React from 'react'
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

const Dashboard = () => {
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
              {/* <Col md={10}>
                <Row className="mb-4">
                  <Col md={6} className="custom-card-column">
                    <Card>
                      <CardBody>
                        <CardTitle className="custom-card-title">Donate</CardTitle>
                        <p className="custom-card-description">Support a cause by donating today.</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md={6} className="custom-card-column">
                    <Card>
                      <CardBody>
                        <CardTitle className="custom-card-title">Register</CardTitle>
                        <p className="custom-card-description">Join our community by registering now.</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className='container-fluid my-1'>
                  <Col md={12}>
                    <img src="./assets/images/login.jpg" className="img-fluid rounded custom-image" alt="Login" style={{ width: '50%' }} />
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Dashboard
