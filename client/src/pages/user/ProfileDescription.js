import React, { useState } from 'react'
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
    MDBBtn,
    MDBRipple
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProfileDescription = () => {
    const [sex, setSex] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [weight, setWeight] = useState('')
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [success, setSuccess] = useState('')
    const [error, setErrorReview] = useState('')

    const { user } = useSelector(state => state.user)

    if (!user) {
        return null;
    }

    const onChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const addDescription = async (descriptionData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            console.log(descriptionData)

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/user/add-description-user`, descriptionData, config)
            console.log('Description:', data)
            setSuccess(data.success)
            window.location.reload();
        } catch (error) {
            setErrorReview(error.response.data.message);
        }
    };
    const addUserDetailHandler = () => {
        // console.log(selectedFiles)

        const formData = new FormData();
        formData.append('user', user._id);
        formData.append('sex', sex);
        formData.append('birthDate', birthDate);
        formData.append('bloodType', bloodType);
        formData.append('yearLevel', yearLevel);
        formData.append('course', course);
        formData.append('weight', weight);
        formData.append('avatar', selectedFiles[0]);

        // selectedFiles.forEach(file => {
        //     formData.append('avatar', file[0])
        // })

        // console.log('FormData:', formData);

        addDescription(formData)

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
                                                        <p style={{ fontWeight: 'bold' }}><a style={{ color: 'white' }}>....</a>This is your Profile Description <a style={{ color: 'white' }}>.........<Link to={'/'} class="fa-solid fa-right-from-bracket" style={{ color: 'blue' }}></Link></a></p>
                                                        <Container className='descriptionCard'>
                                                            <Row>
                                                                <Col size='md'>
                                                                    <MDBCard style={{ backgroundColor: '#D7395B' }}>
                                                                        {user.description[0].avatar.map((avatar, index) => (
                                                                            <MDBCardImage src={`https://res.cloudinary.com/ds7jufrxl/image/upload/${user.description[0].avatar[0].public_id}`} position='top' alt='...' id='descriptionUserImage' />
                                                                        ))}
                                                                        <MDBCardBody>
                                                                            <MDBCardTitle style={{ color: 'white' }}>Your Photo</MDBCardTitle>
                                                                            <MDBCardText style={{ color: 'white' }}>
                                                                                This is the photo that will be displayed on your Profile screen
                                                                            </MDBCardText>
                                                                            <button href='#' className='btn btn-secondary'>Upload New</button> <button href='#' className='btn btn-primary'>Save</button>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                    <MDBCard className='my-3' style={{ backgroundColor: '#D7395B' }}>
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
                                                                    <MDBCard style={{ backgroundColor: '#D7395B' }}>
                                                                        <MDBCardBody>
                                                                            <MDBCardTitle style={{ color: 'white' }}>BIO</MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <MDBCard>
                                                                                    <MDBCardBody>
                                                                                        <MDBCardText>
                                                                                            <p>THIS WILL BE MY BIO PART</p>
                                                                                        </MDBCardText>
                                                                                    </MDBCardBody>
                                                                                </MDBCard>
                                                                                <br />
                                                                                <br />
                                                                                <a id='importantPanimula'>Might Interest You</a>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <Row>
                                                                                            <p><i class="fa-solid fa-hand-holding-medical"></i></p>
                                                                                        </Row>
                                                                                        
                                                                                        <p><i class="fa-solid fa-hand-holding-droplet"></i></p>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <p><i class="fa-solid fa-hand-holding-medical"></i></p>
                                                                                        <p><i class="fa-solid fa-hand-holding-droplet"></i></p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </MDBCardText>
                                                                        </MDBCardBody>
                                                                    </MDBCard>

                                                                    <div>{user.address}</div>
                                                                    <div>{user.phone}</div>
                                                                    <div>{user.name}</div>
                                                                    <div>{user.email}</div>
                                                                    <div>{user.description[0].sex}</div>
                                                                    <div>{user.description[0].birthDate}</div>
                                                                    <div>{user.description[0].bloodType}</div>
                                                                    <div>{user.description[0].course} || {user.description[0].year}</div>
                                                                    <div>{user.description[0].weight}</div>
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
                                                                <label className='custom-file-label' htmlFor='customFile'>
                                                                    Choose Images
                                                                </label>
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
