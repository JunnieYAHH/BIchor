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

const HowToDonate = () => {
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
    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                    <div className="container-fluid">
                        <img src="../../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
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
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-warning" type="submit">Search</button>
                                </form>
                            </ul>
                            {!isRegisterPage && !isLoginPage && user && (
                                <ul className="navbar-nav mb- mb-lg-0">
                                    <li className='nav-item mx-3'>
                                        <p className='nav-link' style={{ color: 'white' }}> <i className='fa fa-user'></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{user.role}</span></p>
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
                                    <p>___ How To <a style={{ color: 'orange', fontWeight: 'bold', fontSize: '30px' }}>Donate</a> __________________________________________________________________________________________________________</p>
                                    <Card style={{ backgroundColor: 'gray', color: 'white', width: '90%' }}>
                                        <Row>
                                            <Col style={{ width: 'auto' }}>
                                                <ul className='my-1' style={{ listStyleType: 'none', padding: 0, backgroundColor: 'orange', width: '300px', borderBottomRightRadius: '50px', borderTopRightRadius: '50px' }}>
                                                    <center>
                                                        <div style={{ marginLeft: '40px' }}>
                                                            <Card className='badge bg-white' style={{ fontSize: '20px' }}>
                                                                <img src="../../../assets/images/systemLOGOMAIN.png" classname="img-fluid my-3" alt="banner" style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '60px' }} />
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
                                                        Here in how to <a style={{ color: 'Orange' }}>Donate</a>, here we can see how is the process of the current blood donation is.
                                                    </p>    
                                                </Card> */}
                                                <div className="card" style={{ width: '25rem' }}>
                                                    <img src="../../../assets/images/htdonatebg.png" className="card-img-top" alt="Sunset Over the Sea" />
                                                    <div className="card-body">
                                                        <center>
                                                            <p className="card-text" style={{ textAlign: 'justify' }}>A healthy individual can donate blood every three months without experiencing weakness or ill effects.
                                                                Donating 450cc of blood does not cause weakness as the body compensates and stimulates bone marrow to produce new blood cells.
                                                                Individuals with tattoos, body piercings, acupuncture, or other needle procedures done a year ago can donate blood.
                                                                The blood donation process takes around 30 minutes, with blood extraction lasting 5-10 minutes.
                                                                Blood volume replenishes within 24 hours, and the body returns to its pre-donation blood status within a month.
                                                                Disease transmission through blood donation is prevented by using sterile, disposable needles and syringes.
                                                            </p>
                                                        </center>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div>
                                            <style dangerouslySetInnerHTML={{ __html: "\n    .move-right {\n        margin-left: 110px;\n        font-weight: bold;\n        color: maroon;\n    }\n" }} />
                                            <h2 className="move-right">Blood Donation Process</h2>
                                        </div>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/jmhiHKsEUXU" allowFullScreen width="750" height="450"></iframe>
                                            </center>
                                        </div>

                                        <hr></hr>
                                        <div>
                                            <style dangerouslySetInnerHTML={{ __html: "\n    .move-right {\n        margin-left: 110px;\n        font-weight: bold;\n        color: maroon;\n    }\n" }} />
                                            <h2 className="move-right">What Happens After Donating Blood</h2>
                                        </div>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/Q55LrC7vijM" allowFullScreen width="750" height="450"></iframe>
                                            </center>
                                        </div>

                                        <hr></hr>
                                        <div>
                                            <style dangerouslySetInnerHTML={{ __html: "\n    .move-right {\n        margin-left: 110px;\n        font-weight: bold;\n        color: maroon;\n    }\n" }} />
                                            <h2 className="move-right">Benefits of Donating Blood</h2>
                                        </div>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/F4fiWZyVsTE" allowFullScreen width="750" height="450"></iframe>
                                            </center>
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

export default HowToDonate
