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
import Header from '../../../components/Layouts/AdminHeader';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import InputType from '../../../components/Shared/Form/InputType'
import '../../../index.css';
import { useSelector } from 'react-redux'
import axios from 'axios'
import 'mdb-react-ui-kit'

const Appointment = () => {
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
                                                <p style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>Technological University of the Philippines, Taguig City</p>
                                                <p style={{ textAlign: 'center' }}>Clinical Appointments in Techonological University of the Philippines, Taguig City</p>
                                                <p style={{ textAlign: 'center' }}>- A Comprehensive Study</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div >
            </div >
        </>
    )
}

export default Appointment