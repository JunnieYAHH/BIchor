import React from 'react';
import Form from '../../components/Shared/Form/Form';
import Header from '../../components/Layouts/Header';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Shared/Spinner';
import { FaUserCircle, FaLock } from "react-icons/fa";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '../../App.css';
import '../../index.css';

const Login = () => {
    const { loading } = useSelector(state => state.user);

    return (
        <>
            {loading ? (<Spinner />) : (
                <>
                    <Header />
                    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
                        <MDBRow className='justify-content-center align-items-center'>
                            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                                <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                                    BIchor <br />
                                    <span style={{ color: '#800000' }}>Enhanced Blood Donation</span>

                                </h1>
                                <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                                Sustaining Lifelines: Enhancing the Blood Donation System for Improved Access, Efficiency, and Awareness - A Comprehensive Study
                                </p>
                            </MDBCol>
                            <MDBCol md='6' className='position-relative'>
                                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="card my-5 bg-glass">
                                        <div className="card-body p-5">
                                            <Form formTitle="Login" submitBtn="Login" formType="login" />
                                        </div>
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </>
            )}
        </>
    );
};

export default Login;
