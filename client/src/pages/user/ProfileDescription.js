import React, { useState, useEffect } from 'react'
import Header from '../../components/Layouts/Header';
import Sidebar from '../../components/Layouts/Sidebar';
import InputType from '../../components/Shared/Form/InputType';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProfileDescription = () => {
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [course, setCourse] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setErrorReview] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState('');
    const [eventError, setEventError] = useState('');

    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            getAllEvents();
        }
    }, [user]);

    if (!user) {
        return null;
    }

    const onChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const token = localStorage.getItem('token');

    const getAllEvents = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/event/getAllEvents`, config);
            setEvents(data.data); // Set events using data.data
            setLoading(false);
        } catch (error) {
            setEventError(error.response.data.message);
        }
    }

    const addDescription = async (descriptionData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/user/add-description-user`, descriptionData, config);
            setSuccess(data.success);
            window.location.reload();
        } catch (error) {
            setErrorReview(error.response.data.message);
        }
    };

    const addUserDetailHandler = () => {
        const formData = new FormData();
        formData.append('user', user._id);
        formData.append('sex', sex);
        formData.append('birthDate', birthDate);
        formData.append('bloodType', bloodType);
        formData.append('yearLevel', yearLevel);
        formData.append('course', course);
        formData.append('weight', weight);
        formData.append('avatar', selectedFiles[0]);

        addDescription(formData);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };


    return (
        <>
            <div className="custom-homepage my-5">
                <Header />
                <div className="custom-content">
                    <Container fluid>
                        <Row>
                            <Col md={2}>
                                <Sidebar />
                            </Col>
                            <Col md={10}>
                                <Row className="mb-4">
                                    <Col md={12} className="custom-card-column">
                                        <Card>
                                            <CardBody>
                                                {user.description && user.description.length > 0 ? (
                                                    <>
                                                        <p style={{ fontWeight: 'bold' }}>
                                                            <a style={{ color: 'white' }}>....</a>User Profile Description{' '}
                                                            <a style={{ color: 'white' }}>
                                                                .........<Link to={'/'} className="fa fa-arrow-left" style={{ color: 'red' }}></Link>
                                                                .........<Link to={`/user/update-profile/${user._id}`} className="fa fa-pencil" style={{ color: 'red' }}></Link>
                                                            </a>
                                                        </p>
                                                        <Container className='descriptionCard'>
                                                            <Row>
                                                                <Col size='md'>
                                                                    <MDBCard style={{ backgroundColor: '#C24641' }}>
                                                                        <div className="d-flex">
                                                                            <div>
                                                                                {user.description[0].avatar.map((avatar, index) => (
                                                                                    <MDBCardImage key={index} src={`https://res.cloudinary.com/ds7jufrxl/image/upload/${avatar.public_id}`} position='top' alt='...' id='descriptionUserImage' />
                                                                                ))}
                                                                                <center>
                                                                                    <a id='importantPanimula'>Blood Type {user.description[0].bloodType} <i className="fa-solid fa-droplet"></i></a>
                                                                                </center>
                                                                            </div>
                                                                            <div className="ml-5" style={{ paddingLeft: '20px' }}>
                                                                                <a id='importantPanimula'>Year & Course:</a>
                                                                                <p>{user.description[0].year} Year || {user.description[0].course}</p>
                                                                                <a id='importantPanimula'>Birth Date:</a>
                                                                                {/* <p> {user.description[0].birthDate}</p> */}
                                                                                <p>{formatDate(user.description[0].birthDate)}</p>
                                                                            </div>
                                                                            <div className="ml-5" style={{ paddingLeft: '20px' }}>
                                                                                <a id='importantPanimula'>Sex:</a>
                                                                                <div>
                                                                                    {user.description[0].sex === 'male' ? (
                                                                                        <div>Male</div>
                                                                                    ) : (
                                                                                        <div>Female</div>
                                                                                    )}
                                                                                </div>
                                                                                <div className='my-3'>
                                                                                    <a id='importantPanimula'>Address:</a>
                                                                                    <p>{user.address}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <MDBCardBody>
                                                                            <MDBCardTitle style={{ color: 'white' }}>Your Photo</MDBCardTitle>
                                                                            <MDBCardText style={{ color: 'white' }}>
                                                                            </MDBCardText>
                                                                            <Link to={`/user/update-profile/${user._id}`} className='fa fa-pencil btn btn-secondary'/> <button href='#' className='btn btn-danger'>Save</button>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                    <MDBCard className='my-3' style={{ backgroundColor: '#C24641' }}>
                                                                        <MDBCardBody>
                                                                            <MDBCardTitle>Personal Information</MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <a id='importantPanimula'>Full name</a>
                                                                                <MDBCard>
                                                                                    <MDBCardBody>
                                                                                        <MDBCardText>
                                                                                            <div><i class="fa-solid fa-circle-user"></i>{user.name}</div>
                                                                                        </MDBCardText>
                                                                                    </MDBCardBody>
                                                                                </MDBCard>
                                                                                <a id='importantPanimula'>Email</a>
                                                                                <MDBCard>
                                                                                    <MDBCardBody>
                                                                                        <MDBCardText>
                                                                                            <div><i class="fa-solid fa-envelope-circle-check"></i>{user.email}</div>
                                                                                        </MDBCardText>
                                                                                    </MDBCardBody>
                                                                                </MDBCard>
                                                                                <a id='importantPanimula'>Mobile Number</a>
                                                                                <MDBCard>
                                                                                    <MDBCardBody>
                                                                                        <MDBCardText>
                                                                                            <div><i class="fa-solid fa-square-phone"></i>{user.phone}</div>
                                                                                        </MDBCardText>
                                                                                    </MDBCardBody>
                                                                                </MDBCard>
                                                                            </MDBCardText>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                </Col>
                                                                <Col size='md'>
                                                                    <MDBCard style={{ backgroundColor: '#C24641' }}>
                                                                        <MDBCardBody>
                                                                            <MDBCardText>
                                                                                <a id='importantPanimula'>Might Interest You</a>
                                                                                <Row>
                                                                                    {events && events.map(event => (
                                                                                        <>
                                                                                            <Col>
                                                                                                <Row md={6} sm={12} className="custom-card-column my-2" key={event._id}>
                                                                                                    <Col>
                                                                                                        <Card style={{ height: '200px', width: '200px' }}>
                                                                                                            <CardBody>
                                                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                                    {event.images && event.images.map(image => (
                                                                                                                        <img key={image.public_id} src={image.url} alt={event.title} className="event-image" style={{ marginRight: '10px', height: '120px', width: '190px' }} />
                                                                                                                    ))}
                                                                                                                </div>
                                                                                                                <p className="custom-card-description" style={{ fontWeight: 'bold', color: 'black' }}>{event.title}</p>
                                                                                                            </CardBody>
                                                                                                        </Card>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </Col>
                                                                                        </>
                                                                                    ))}

                                                                                </Row>

                                                                            </MDBCardText>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </>
                                                ) : (
                                                    <>
                                                        <form encType="multipart/form-data">
                                                            <div>
                                                                <InputType
                                                                    inputType={'hidden'}
                                                                    labelFor={'forUserID'}
                                                                    name={'userID'}
                                                                    value={user._id}
                                                                />
                                                                <select className="form-select" aria-label="Default select example"
                                                                    value={sex}
                                                                    onChange={(e) => setSex(e.target.value)}>
                                                                    <option selected>Gender</option>
                                                                    <option value={'male'}>Male</option>
                                                                    <option value={'female'}>Female</option>
                                                                </select>
                                                                <InputType
                                                                    labelText="Birth Date"
                                                                    labelFor="forBirthDate"
                                                                    inputType="date"
                                                                    name="birthDate"
                                                                    value={birthDate}
                                                                    onChange={(e) => setBirthDate(e.target.value)}
                                                                />
                                                                <a>Blood Type</a>
                                                                <select className="form-select"
                                                                    aria-label="Default select example"
                                                                    value={bloodType}
                                                                    onChange={(e) => setBloodType(e.target.value)}
                                                                >
                                                                    <option selected>Select</option>
                                                                    <option value={'O+'}>O+</option>
                                                                    <option value={'O-'}>O-</option>
                                                                    <option value={'A+'}>A+</option>
                                                                    <option value={'A-'}>A-</option>
                                                                    <option value={'B+'}>B+</option>
                                                                    <option value={'B-'}>B-</option>
                                                                    <option value={'AB+'}>AB+</option>
                                                                    <option value={'AB-'}>AB-</option>
                                                                    <option value={'K'}>K</option>
                                                                </select>
                                                                <a>Year Level</a>
                                                                <select className="form-select"
                                                                    aria-label="Default select example"
                                                                    value={yearLevel}
                                                                    onChange={(e) => setYearLevel(e.target.value)}
                                                                >
                                                                    <option value={'1st'}>1st Year</option>
                                                                    <option value={'2nd'}>2nd Year</option>
                                                                    <option value={'3rd'}>3rd Year</option>
                                                                    <option value={'4th'}>4th Year</option>
                                                                </select>
                                                                <a>Course</a>
                                                                <select className="form-select"
                                                                    aria-label="Default select example"
                                                                    value={course}
                                                                    onChange={(e) => setCourse(e.target.value)}
                                                                >
                                                                    <option selected>Choose Course</option>
                                                                    <option value={'BSIT-T'}>Bachelor of Science in Information Technology</option>
                                                                </select>
                                                                <InputType
                                                                    labelText={'Weight'}
                                                                    labelFor={'forWeight'}
                                                                    name={'weight'}
                                                                    value={weight}
                                                                    onChange={(e) => setWeight(e.target.value)}
                                                                />
                                                                <p className='custom-file-label' htmlFor='customFile'>
                                                                    Choose Profile Picture
                                                                </p>
                                                                <input
                                                                    type='file'
                                                                    name='avatar'
                                                                    className='custom-file-input'
                                                                    id='customFile'
                                                                    onChange={onChange}
                                                                />
                                                            </div>
                                                            <hr />
                                                        </form>
                                                        <button type="submit" className="btn btn-primary" onClick={addUserDetailHandler}>Submit</button>
                                                    </>
                                                )}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default ProfileDescription
