import React, { useState, useEffect, Fragment } from 'react'
import Header from '../../components/Layouts/Header';
import Sidebar from '../../components/Layouts/Sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Barcode from 'react-barcode';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios'

const Incentives = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    // const { user } = useSelector(state => state.user)
    const user = JSON.parse(localStorage.getItem('user'));
    const [events, setEvents] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout Success')
        navigate('/login')
    }
    console.log(appointments)
    console.log(user)



    const sampleclick = () => {
        console.log('here1')
    }

    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const userId = user._id; 
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/appointment/getAllAppointments`, config);
                const filteredAppointments = data.data.filter(appointment => appointment.userID === userId);
                setAppointments(filteredAppointments);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        const getAllEvents = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
                setEvents(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getAllAppointments();
        getAllEvents();
    }, []);


    const formatAppointments = () => {
        return {
            columns: [
                {
                    label: 'Type',
                    field: 'appointmentType',
                    sort: 'asc',
                },
                {
                    label: 'Blood',
                    field: 'bloodGroup',
                    sort: 'asc',
                },
                {
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                },
                {
                    label: 'Event',
                    field: 'event',
                    sort: 'asc',
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    field: 'actions',
                },
            ],
            rows: appointments.map(appointment => {
                const currentUser = user; // Assuming user is a single user object
                const event = events.find(event => event._id === appointment.event) || {};
                const avatarUrl = currentUser.description && currentUser.description.length > 0 && currentUser.description[0]?.avatar && currentUser.description[0]?.avatar.length > 0 ? currentUser.description[0]?.avatar[0]?.url : null;
                return {
                    appointmentType: appointment.appointmentType,
                    bloodGroup: appointment.bloodGroup,
                    quantity: appointment.quantity,
                    email: currentUser.email || 'N/A',
                    event: (
                        <Fragment>
                            {event.images && event.images.length > 0 && (
                                <p>
                                    <img src={event.images[0].url} alt={event.title} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                </p>
                            )}
                            <p>{event.title || 'N/A'}</p>
                        </Fragment>
                    ),
                    user: (
                        <Fragment>
                            <p>
                                <img src={avatarUrl} alt={currentUser.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            </p>
                            <span>{currentUser.name || 'N/A'}</span>
                        </Fragment>
                    ),
                    status: appointment.status,
                    actions: (
                        <Fragment>
                            {appointment.status !== 'confirmed' && (
                                <Link to={`/user/appointment-edit/${appointment._id}`} className="py-1 px-2">
                                    <i class="fa-regular fa-pen-to-square" style={{ cursor: 'pointer' }}></i>
                                </Link>
                            )}
                            {appointment.status === 'confirmed' && (
                                <Link to={'/user/appointment-download'} className="py-1 px-2">
                                    <i className="fa-solid fa-print" style={{ cursor: 'pointer' }} ></i>
                                    {/* <i class="fa-regular fa-print"></i> */}
                                </Link>
                            )}
                        </Fragment>
                    ),
                };
            }),
        };
    };

    return (
        <>
            <div className="custom-homepage my-5">
                <header className='header'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                        <div className="container-fluid">
                            <img src="../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
                            <Link to="/" className="navbar-brand" style={{ color: 'black' }}>
                                Blood Donation
                            </Link>
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
                <div className="custom-content">
                    <Container fluid>
                        <Row>
                            <Col md={2}>
                                <Sidebar />
                            </Col>
                            <Col md={10}>
                                <center>
                                    <Card className='container'>
                                        <h3>Get the sticker for you get the benefits of a donor </h3>
                                        <Row className='my-3'>
                                            <Col>
                                                <Card style={{ backgroundColor: '#0f0177', width: '80%', borderRadius: '20px' }}>
                                                    <div style={{ color: 'white' }}>
                                                        <p style={{ width: '70%', height: '2%', fontSize: '12px' }}>
                                                            Republic of the Philippines
                                                        </p>
                                                    </div>
                                                    <div style={{ backgroundColor: '#0f0082', color: 'white' }}><p style={{ width: '70%', height: '2%', fontSize: '12px' }}>
                                                        TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                                                        Taguig Campus
                                                    </p></div>
                                                    <div style={{ backgroundColor: '#10008a', color: 'white' }}><p style={{ width: '70%', height: '2%', fontSize: '12px' }}>
                                                        Kim 14 East Service Road Western Bicutan Taguig City 1630
                                                        Tel. No. 823-2457
                                                    </p></div>
                                                    <div style={{ backgroundColor: '#110096' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#1604a2' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#1b09a4' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#2210ae' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#2a18b5' }}>
                                                        {user.description && user.description.length > 0 && user.description[0].avatar && user.description[0].avatar.length > 0 && (
                                                            <Row style={{ backgroundColor: '#2a18b5', width: '70%' }}>
                                                                {/* Move this Col to the most left side */}
                                                                <Col style={{ backgroundColor: '#2a18b5' }}>
                                                                    <img src="../assets/images/tuplogo.png" alt="logotup" style={{ width: '100%', height: '100%', borderRadius: '50px' }} />
                                                                </Col>
                                                                {/* Rest of the content */}
                                                                <Col className='responsive' style={{ backgroundColor: '#2a18b5' }}>
                                                                    {user.description[0].avatar.map((avatar, index) => (
                                                                        <MDBCardImage key={index} src={`https://res.cloudinary.com/ds7jufrxl/image/upload/${avatar.public_id}`} position='top' alt='...' />
                                                                    ))}
                                                                </Col>
                                                            </Row>
                                                        )}
                                                    </div>
                                                    {/* <div style={{ backgroundColor: '#3520cf' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#3923e1' }}><p></p></div> */}
                                                    <div style={{ backgroundColor: '#412af2' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#4d36fa', color: 'black' }}>
                                                        <a style={{ width: '100%', height: '20px', fontSize: '12px' }}>
                                                            The Technological University of the Philippines shall be a premier state
                                                        </a>
                                                        <a style={{ backgroundColor: '#563fff', color: 'black', fontSize: '12px' }}>
                                                            . university with recognize excellence in engineering and technology education
                                                        </a>
                                                        <a style={{ backgroundColor: '#634ffc', color: 'black', fontSize: '12px' }}>
                                                            {' '} at par with the leading universities in the ASEAN region.
                                                        </a>
                                                    </div>
                                                    <div style={{ backgroundColor: '#6d5af8' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#7f6ffa' }}><p></p></div>
                                                    <div style={{ backgroundColor: '#8a7bfc' }}>
                                                        {user.description && user.description.length > 0 && user.description[0].course && (
                                                            <Card style={{ backgroundColor: '#0c015f', color: 'white', width: '60%' }}>
                                                                <i className="fa-solid fa-hand-holding-medical" style={{ fontSize: '12px' }}></i>{user.name}
                                                                <br />
                                                                {user.description[0].course}
                                                            </Card>
                                                        )}
                                                    </div>
                                                    {user && (
                                                        <>
                                                            <div style={{ backgroundColor: '#9385fc' }}><p style={{ color: 'black' }}> ID. NO.: {user._id}</p></div>
                                                            <div style={{ backgroundColor: '#a69bfc' }}><p></p></div>
                                                            <div style={{ backgroundColor: '#b2a8fc' }}><p> <Barcode value={user._id} height={30} width={1} displayValue={false} /></p></div>
                                                            <div style={{ backgroundColor: '#beb6fc' }}><p></p></div>
                                                            <div style={{ backgroundColor: '#c6bff8', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}><p></p></div>
                                                        </>
                                                    )}

                                                </Card>
                                            </Col>
                                            <Col>
                                                <Card>
                                                    <p className='my-3' style={{ fontWeight: 'bold' }}>
                                                        Your Appointments
                                                    </p>
                                                    <Card>

                                                        <Row style={{ borderRadius: '30px' }}>
                                                            <MDBDataTable
                                                                data={formatAppointments()}
                                                                paginationLabel={['Previous', 'Next']}
                                                                searchLabel="Search"
                                                                scrollY
                                                                style={{ borderRadius: '30px', width: '10%', maxHeight: '100px' }}
                                                            />
                                                        </Row>
                                                    </Card>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Card>
                                </center>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div >
        </>
    )
}

export default Incentives
