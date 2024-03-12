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
import '../../App.css';
import '../../index.css';
import Sidebar from '../../components/Layouts/Sidebar';
import '@fortawesome/fontawesome-svg-core'

const AboutUs = () => {
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
                                                                <Col>
                                                                    <i class="fa-solid fa-book-medical" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                </Col>
                                                                <Col>
                                                                    <Link to={'/blood/forum'} style={{ textDecoration: 'none', color: 'white' }}>
                                                                        The
                                                                        <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Forum</h4>
                                                                    </Link>
                                                                </Col>
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
                                                                <Col>
                                                                    <i class="fa-regular fa-calendar-days" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                </Col>
                                                                <Col>
                                                                    The
                                                                    <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Schedules</h4>
                                                                </Col>
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
                                                                <Col>
                                                                    <i class="fa-solid fa-user-tie" style={{ fontSize: '30px', marginTop: '15px' }}></i>
                                                                </Col>
                                                                <Col>
                                                                    About
                                                                    <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Us</h4>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </center>
                                    {/* <p style={{color: 'orange', fontSize: 'xx-large', fontWeight: 'bold'}}>About Us</p> */}
                                    <Card style={{ backgroundColor: 'gray', color: 'white', width: '90%' }}>
                                        <section className="py-3 py-md-5 py-xl-8">
                                            <div className="bg-light">
                                                <div className="container py-5">
                                                <div className="row h-100 align-items-center py-5">
                                                    <div className="col-lg-6">
                                                    <h1 classname="display-4" style={{color: 'red', fontWeight: 'bold'}}>About Us</h1>
                                                    <p className="lead text-muted mb-0" style={{textAlign: 'justify'}}>
                                                        <strong>Welcome to BIchor, home to an enhanced blood donation system that's changing lives one donation at a time. Meet the passionate programmers behind our innovative platform. </strong>
                                                    </p>
                                                    </div>
                                                    <div className="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt className="img-fluid" /></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="bg-light py-5">
                                                <div className="container py-5">
                                                <div className="row mb-4">
                                                    <p style={{fontSize: 'xxx-large', fontWeight: 'bold', color: 'black', textAlign: 'center'}}>OUR TEAM</p>
                                                    <div className="col-lg-5">                                                    
                                                    </div>
                                                </div>
                                                <div className="row text-center">
                                                    {/* Team item*/}
                                                    <div className="col-xl-3 col-sm-6 mb-5" style={{marginLeft: '200px'}}>
                                                    <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt width={100} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                                        <h5 classname="mb-0" style={{color: 'black'}}>Gerelito Puyos</h5>
                                                        <span className="small text-uppercase text-muted">Founder - Programmer</span>
                                                        <ul className="social mb-0 list-inline mt-3">
                                                        <ul className="social mb-0 list-inline mt-3">
                                                            <li className="list-inline-item"><a href="https://www.facebook.com" target="_blank" className="social-link"><i className="fa fa-facebook"></i></a></li>
                                                            <li className="list-inline-item"><a href="https://twitter.com" target="_blank" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                                            <li className="list-inline-item"><a href="https://www.instagram.com" target="_blank" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                                            <li className="list-inline-item"><a href="https://www.linkedin.com" target="_blank" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                                        </ul>

                                                        </ul>
                                                    </div>
                                                    </div>
                                                    {/* End*/}
                                                    {/* Team item*/}
                                                    <div className="col-xl-3 col-sm-6 mb-5" style={{marginLeft: '50px'}}>
                                                        <div className="bg-white rounded shadow-sm py-5 px-4">
                                                            <img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt width={100} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                                            <h5 className="mb-0" style={{color: 'black'}}>Karl Odevilas</h5>
                                                            <span className="small text-uppercase text-muted">Founder - Programmer</span>
                                                            <ul className="social mb-0 list-inline mt-3">
                                                                <li className="list-inline-item"><a href="https://www.facebook.com" target="_blank" className="social-link"><i className="fa fa-facebook"></i></a></li>
                                                                <li className="list-inline-item"><a href="https://twitter.com" target="_blank" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                                                <li className="list-inline-item"><a href="https://www.instagram.com" target="_blank" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                                                <li className="list-inline-item"><a href="https://www.linkedin.com" target="_blank" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* End*/}
                                                </div>
                                                </div>
                                            </div>
                                        </section>
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

export default AboutUs
