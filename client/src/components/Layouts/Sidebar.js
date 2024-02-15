import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";

const Sidebar = () => {

    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);
    const [centredModal1, setCentredModal1] = useState(false);

    const toggleOpen1 = () => setCentredModal1(!centredModal1);
    return (
        <div className="sidebar" style={{ color: 'black' }}>
            <h2>BIchor</h2>
            <ul>
                <li>
                    <a onClick={toggleOpen}>Information</a>
                </li>
                <li>
                    <a onClick={toggleOpen1}>Description</a>
                </li>
                <li>
                    <a href="/#">About Us</a>
                </li>
                <li>
                    <a href="/#">Donation</a>
                </li>
                <li>
                    <a href="/#">Hostpitals</a>
                </li>
                <li>
                    <a href="/#">Maps</a>
                </li>
            </ul>
            <MDBModal
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
                                <div class="clearfix">
                                    <img
                                        src="../assets/images/bloodonate.jpg"
                                        class="col-md-6 float-md-end mb-3 ms-md-3"
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
                                <div class="clearfix">
                                    <img
                                        src="../assets/images/bloodonate.jpg"
                                        class="col-md-6 float-md-end mb-3 ms-md-3"
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
            </MDBModal>
        </div>
    );
};

export default Sidebar;
