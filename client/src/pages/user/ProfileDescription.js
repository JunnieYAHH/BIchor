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
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const ProfileDescription = () => {
    const [sex, setSex] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [weight, setWeight] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setErrorReview] = useState('')

    const { user } = useSelector(state => state.user)

    if (!user) {
            return null;
        }

    const addDescription = async (descriptionData) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            console.log(descriptionData)

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/user/add-description-user`, descriptionData, config)
            console.log('Description:', data)
            setSuccess(data.success)

        } catch (error) {
            setErrorReview(error.response.data.message)
        }
    }

    // console.log(user._id)

    const addUserDetailHandler = () => {
        const formData = new FormData();
        formData.set('user', user._id); // Set the user ID directly

        // Append other form fields
        formData.set('sex', sex);
        formData.set('birthDate', birthDate);
        formData.set('bloodType', bloodType);
        formData.set('yearLevel', yearLevel);
        formData.set('course', course);
        formData.set('weight', weight);

        addDescription(formData)

    };


    return (
        <>
            <div className="custom-homepage">
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
                                                <h1>Description</h1>
                                                {user.description && user.description.length > 0 ? (
                                                    <div>Hello</div>
                                                ) : (
                                                    <>
                                                        <form >
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
