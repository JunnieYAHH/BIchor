import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
import '../../index.css'
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const { user } = useSelector(state => state.user)

    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);
    const [centredModal1, setCentredModal1] = useState(false);

    const toggleOpen1 = () => setCentredModal1(!centredModal1);

    return (
        <>
            {user && user.description ? (
                <div className="sidebar" style={{ color: 'black' }} >
                    <center>
                        <div>
                            {user.description && user.description[0] && user.description[0].avatar && user.description[0].avatar.length > 0 ? (
                                user.description[0].avatar.map((avatar, index) => (
                                    <img key={index} src={`https://res.cloudinary.com/ds7jufrxl/image/upload/${avatar.public_id}`} alt="user" id='userAvatar' />
                                ))
                            ) : (
                                <img src="./assets/images/default.png" alt="default" id='defaultAvatar' />
                            )}
                        </div>
                    </center>
                    <ul>
                        <li style={{ cursor: 'pointer', fontWeight: "bold" }}>
                            <center>
                                <div className="dropdown">
                                    <a data-bs-toggle="dropdown" aria-expanded="false">
                                        Profile
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/profileDescription">Profile Description</Link>
                                        </li>
                                    </ul>
                                </div>
                            </center>

                        </li>
                        <li style={{ cursor: 'pointer', fontWeight: "bold" }}>
                            <div className="dropdown">
                                <a data-bs-toggle="dropdown" aria-expanded="false">
                                    Menu
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/donationPage">Donation</Link>
                                        {/* <p>Donation</p> */}
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/transfusionPage">Transfusion</Link>
                                    </li>
                                    <li>
                                        {/* <p>Campain</p> */}
                                        <Link className="dropdown-item" to="/campainPage">Campain</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="/#" style={{ fontWeight: "bold" }}>Hostpitals</a>
                        </li>
                        <li>
                            <a href="/#" style={{ cursor: 'pointer', fontWeight: "bold" }}>Maps</a>
                        </li>
                    </ul>
                    <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
                        <MDBModalDialog centered size="fullscreen">
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
                                                style={{ maxWidth: "20%", height: "20%" }}
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
                    </MDBModal>
                </div >
            ) : null}
        </>
    );
};

export default Sidebar;
