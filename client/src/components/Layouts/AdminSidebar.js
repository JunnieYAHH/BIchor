import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import '../../index.css'

const AdminSidebar = () => {
    return (
        <div className="sidebar" style={{ color: 'black' }}>
            <div className='menu'>
                <Link to={'/dashboard'}>
                    <h2>
                        Admin
                    </h2>
                </Link>
                <ul>
                    <li>
                        <Link to='/admin/appointments'><i class="fa-solid fa-droplet"></i> Appointments</Link>
                    </li>
                    <li>
                        <Link to="/admin/donors"><i class="fa fa-user"></i> Donors</Link>
                    </li>
                    <li>
                        <Link to="/admin/events"><i class="fa-solid fa-bullhorn"></i> Events</Link>
                    </li>
                    <li>
                        <a href="/#">Maps</a>
                    </li>
                </ul>
            </div>
            {/* <MDBModal
                tabIndex="-1"
                open={centredModal}
                setOpen={setCentredModal}
            >
                <MDBModalDialog centered size="">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Information</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleOpen}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p>
                                <div className="clearfix">
                                    <img
                                        src="../assets/images/bloodonate.jpg"
                                        className="col-md-6 float-md-end mb-3 ms-md-3"
                                        alt="..."
                                        style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                    Volunteering your time to help out in charities and foundations is highly admirable. But if you wish to do more, or perhaps you're trying to work around your packed schedule, donating your blood is a great option. By donating blood, you're helping secure the lives of people who may have gotten into accidents, are undergoing surgeries, or are fighting cancer and other diseases.

                                    Every day, many people need blood transfusions within and outside of your community. However, due to restrictions brought by COVID-19, hospitals experienced more blood shortages which could negatively affect emergency transfusions. Switching to online classes and remote work meant fewer people were encouraged to volunteer in blood donation drives.
                                </div>
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal
                tabIndex="-1"
                open={centredModal1}
                setOpen={setCentredModal1}
            >
                <MDBModalDialog centered size="">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Description</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleOpen1}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p>
                                <div className="clearfix">
                                    <img
                                        src="../assets/images/bloodonate.jpg"
                                        className="col-md-6 float-md-end mb-3 ms-md-3"
                                        alt="..."
                                        style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                    Donating blood remains the most important role in the medical field,
                                    yet there are still a global shortage of blood donors and it has a
                                    major impact on the medical field (Dorle, Gajbe, Singh, Noman, &
                                    Dawande, 2023). The Researchers used the Input Process Output model
                                    (IPO) to understand the flow of the research study "Sustaining
                                    Lifelines in Western Bicutan: Enhancing the Blood Donation System
                                    for Improved Access, Efficiency, and Awareness - A Comprehensive
                                    Study". The IPO model elaborates the process of the study and also
                                    gives the possible results.

                                </div>
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleOpen1}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal> */}
        </div>
    );
}

export default AdminSidebar
