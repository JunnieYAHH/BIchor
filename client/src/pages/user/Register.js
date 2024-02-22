import React from 'react';
import Form from '../../components/Shared/Form/Form';
import Header from '../../components/Layouts/Header';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Shared/Spinner';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Register = () => {
    const { loading, error } = useSelector(state => state.user);

    return (
        <>
            {error && <span>{toast.error(error)}</span>}
            {loading ? (<Spinner />) : (
                <>
                    <Header />
                    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
                        <MDBRow className='justify-content-center align-items-center'>
                            <MDBCol md='9' className='text-center text-md-start d-flex flex-column justify-content-center'>
                                {/* Content on the left side, if needed */}
                            </MDBCol>
                            <MDBCol md='9' className='position-relative'>
                                {/* Optional: Decorative elements on the right side */}
                                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                                {/* Centered registration form */}
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="card my-3 bg-glass">
                                        <div className="card-body p-5">
                                            <Form formTitle={'Register'} submitBtn={'Register'} formType={'register'} />
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

export default Register;
