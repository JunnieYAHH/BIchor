import React from 'react'
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../App.css';
import '../../../index.css';
import Sidebar from '../../../components/Layouts/Sidebar';

const HowToTransfuse = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isHomePage = location.pathname === '/';
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout Success')
        navigate('/login')
    }
    const roleMap = {
        'donor': 'Donor',
        'user': 'Recipient',
        'admin': 'Admin'
    };
    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header" style={{ height: '12%' }}>
                    <div className="container-fluid">
                    <img src="../../../assets/images/logoBIchor.png" alt="logotup" id='tuplogo' style={{width: '100px', height: '80px'}}/>
                        {user && user.role !== 'admin' && (
                            <>
                                <Link to="/" className="navbar-brand" style={{ color: 'black' }}>
                                    Blood Donation
                                </Link>
                            </>
                        )}
                        {user && user.role === 'admin' && (
                            <>
                                <Link to="/dashboard" className="navbar-brand" style={{ color: 'black' }}>
                                    Dashboard
                                </Link>
                            </>
                        )}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {!isRegisterPage && !isLoginPage && user && (
                                <ul className="navbar-nav mb- mb-lg-0" style={{ marginLeft: '70%' }}>
                                    <li className='nav-item mx-3'>
                                        <p className='nav-link' style={{ color: 'white' }}> <i className='fa fa-user'></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{roleMap[user.role]}</span></p>
                                    </li>
                                    <li className='nav-item mx-3'>
                                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <div className="custom-homepage my-5">
                <div className="custom-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar />
                            </div>
                            <Col md={10} className='my-3'>
                                <Card style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'white', backgroundColor: 'black', borderRadius: '20px' }}>
                                    <img src="../../../assets/images/tup.png" classname="img-fluid my-3" alt="banner" style={{ width: '90%', height: '50%', objectFit: 'cover' }} />
                                    <center>
                                        <Row className='my-4'>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Link to={'/blood/forum'} style={{ textDecoration: 'none', color: 'white' }}>
                                                                    <Col>
                                                                        <i class="fa-solid fa-book-medical" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                    </Col>
                                                                    <Col>
                                                                        The
                                                                        <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Forum</h4>
                                                                    </Col>
                                                                </Link>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Link to='/blood/forum/schedule' style={{ textDecoration: 'none', color: 'white' }}>
                                                                    <Row>
                                                                        <Col>
                                                                            <i class="fa-regular fa-calendar-days" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                        </Col>
                                                                        <Col>
                                                                            The
                                                                            <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Schedules</h4>
                                                                        </Col>
                                                                    </Row>
                                                                </Link>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Link to='/blood/forum/about-us' style={{ textDecoration: 'none', color: 'white' }}>
                                                                    <Row>
                                                                        <Col>
                                                                            <i class="fa-solid fa-user-tie" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                        </Col>
                                                                        <Col>
                                                                            About
                                                                            <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Us</h4>
                                                                        </Col>
                                                                    </Row>
                                                                </Link>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </center>
                                    <p>___ How To <a style={{ color: 'orange', fontWeight: 'bold', fontSize: '30px' }}>Transfuse</a> ____________________________________________________________________________________________________</p>
                                    <Card style={{ backgroundColor: 'gray', color: 'white', width: '90%' }}>
                                        <Row>
                                            <Col style={{ width: 'auto' }}>
                                                <ul className='my-1' style={{ listStyleType: 'none', padding: 0, backgroundColor: 'orange', width: '300px', borderBottomRightRadius: '50px', borderTopRightRadius: '50px' }}>
                                                    <center>
                                                        <div style={{ marginLeft: '40px' }}>
                                                            <Card className='badge bg-white' style={{ fontSize: '20px' }}>
                                                                <img src="../../../assets/images/logoBIchor.png" classname="img-fluid my-3" alt="banner" style={{ width: '30%', height: '50%', objectFit: 'cover', borderRadius: '60px' }} />
                                                                <li className='my-3'>
                                                                    <button onClick={() => { window.location.href = '/blood/forum/the-pad/how-to-donate' }} className='button-link'>How To Donate?</button>
                                                                </li>
                                                                <li className='my-3'>
                                                                    <button onClick={() => { window.location.href = '/blood/forum/the-pad/how-to-transfuse' }} className='button-link'>How To Transfuse?</button>
                                                                </li>
                                                                <li className='my-3'>
                                                                    <button onClick={() => { window.location.href = '/blood/forum/the-pad/what-is-the-incentives' }} className='button-link'>Incentives</button>
                                                                </li>
                                                            </Card>
                                                        </div>
                                                    </center>
                                                </ul>
                                            </Col>
                                            <Col className='my-5'>
                                                {/* <Card>
                                                    <p>
                                                        Here in how to <a style={{ color: 'Orange' }}>Transfuse</a>, here we can see how is the process of the current blood transfusion is.
                                                    </p>
                                                </Card> */}
                                                <div className="card" style={{ width: '25rem' }}>
                                                    <img src="../../../assets/images/httransfusebg.png" className="card-img-top" alt="Sunset Over the Sea" />
                                                    <div className="card-body">
                                                        <center>
                                                            <p className="card-text" style={{ textAlign: 'justify' }}>Transfusion involves preparing and assessing the patient's condition, ensuring blood compatibility, and accessing a vein for the IV line insertion. The appropriate blood product is selected based on the patient's needs, and the transfusion is administered at a controlled rate through the IV line. Vital signs are continuously monitored throughout the transfusion for any adverse reactions. Once the transfusion is completed, the blood product is disconnected, the IV line is removed, and the patient is monitored for stability and provided with post-transfusion care as needed. Transfusions are conducted by trained healthcare professionals in medical settings following strict protocols to ensure patient safety.
                                                            </p>                                                    </center>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div>
                                            <style dangerouslySetInnerHTML={{ __html: "\n    .move-right {\n        margin-left: 110px;\n        font-weight: bold;\n        color: maroon;\n    }\n" }} />
                                            <h2 className="move-right">Blood Transfusion Process</h2>
                                        </div>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/uLydffMNnEY" allowFullScreen width="750" height="450"></iframe>
                                            </center>
                                            <strong><p className="citation" style={{marginLeft: 120, color: 'maroon'}}>Blood transfusion: Setup and Transfusion (Primary Y Type Tubing). (Jul 11, 2023). <a href="https://www.youtube.com/watch?v=uLydffMNnEY">www.youtube.com</a>. Retrieved March 18, 2024.</p></strong>
                                        </div>
                                        <hr></hr>
                                        <div>
                                            <style dangerouslySetInnerHTML={{ __html: "\n    .move-right {\n        margin-left: 110px;\n        font-weight: bold;\n        color: maroon;\n    }\n" }} />
                                            <h2 className="move-right">Blood Transfusion Demonstration</h2>
                                        </div>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/KufB1rabAQU" allowFullScreen width="750" height="450"></iframe>
                                            </center>
                                            <strong><p className="citation" style={{marginLeft: 120, color: 'maroon'}}>What does a Blood Transfusion look Like? (Sep 7, 2017). <a href="https://www.youtube.com/watch?v=KufB1rabAQU">www.youtube.com</a>. Retrieved March 18, 2024.</p></strong>
                                        </div>
                                    </Card>
                                </Card>
                            </Col>
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}

export default HowToTransfuse
