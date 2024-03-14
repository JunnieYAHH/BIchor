import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBInput,
    MDBCard,
    MDBCardImage,
    MDBRipple,
    MDBInputGroup,
    MDBBtn
} from 'mdb-react-ui-kit';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import '../../../index.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDonor = () => {

    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [year, setYear] = useState('')
    const [course, setCourse] = useState('')
    const [weight, setWeight] = useState('')
    const [avatar, setSelectedFiles] = useState([])

    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout Success')
        navigate('/login')
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };
    // console.log(users)

    const token = localStorage.getItem('token');
    const { id } = useParams();

    useEffect(() => {

        const getSingleUser = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/user/getSingleUser/${id}`, config);
                // console.log(data)
                setUsers(data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getSingleUser();

    }, [token, id]);

    const handleAvatarChange = (e) => {
        setSelectedFiles(e.target.files[0]);
    };

    const updateUser = async (formData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/user/updateUser/${id}`, formData, config);
            console.log(data)
            setSuccess(data.success);
            navigate('/admin/donors')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError('Error: ' + error.response.data.message);
            } else {
                setError('Error: Failed to update user profile');
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (role) formData.append('role', role);
        if (email) formData.append('email', email);
        if (name) formData.append('name', name);
        if (address) formData.append('address', address);
        if (phone) formData.append('phone', phone);
        if (sex) formData.append('sex', sex);
        if (birthDate) formData.append('birthDate', birthDate);
        if (bloodType) formData.append('bloodType', bloodType);
        if (year) formData.append('yearLevel', year);
        if (course) formData.append('course', course);
        if (weight) formData.append('weight', weight);
        if (avatar) formData.append('avatar', avatar);


        const description = users.user.description.map(desc => ({
            ...desc,
            sex: sex || desc.sex,
            birthDate: birthDate || desc.birthDate,
            bloodType: bloodType || desc.bloodType,
            year: year || desc.year,
            course: course || desc.course,
            weight: weight || desc.weight,

        }));
        formData.append('description', JSON.stringify(description));

        updateUser(formData);

    };

    const roleMap = {
        'donor': 'Donor',
        'user': 'Recipient',
        'admin': 'Admin'
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header" style={{ height: '12%' }}>
                    <div className="container-fluid">
                        <img src="../../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
                        <Link to="/dashboard" className="navbar-brand" style={{ color: 'black' }}>
                            Blood Donation
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {user && (
                                <ul className="navbar-nav mb- mb-lg-0" style={{ marginLeft: '70%' }}>
                                    <li className='nav-item mx-3'>
                                        <p className='nav-link' style={{ color: 'white' }}> <i className="fa fa-user"></i> Welcome{""} {user.name} {""} <span className="badge bg-secondary">{roleMap[user.role]}</span></p>
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
                            <Col md={10}>
                                <Row className="mb-4">
                                    <div className="container">
                                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', padding: '20px', background: '#f0f0f0', border: '2px solid #333', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                                            <img src="../../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                            <p style={{ margin: '0', fontWeight: 'bold' }}>USER UPDATE</p>
                                            <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                        </div>
                                    </div>
                                    <Col>
                                        <Row style={{ borderRadius: '20px', backgroundColor: 'black', color: 'white' }} className='my-1'>
                                            <div className="d-flex justify-content-start">
                                                <form encType="multipart/form-data" className="offset-md-5 col-md-2">
                                                    {users && users.user && (
                                                        <>

                                                            <div className='my-3'>
                                                                {users.user.description && users.user.description.map(desc => (
                                                                    <div key={desc._id}>
                                                                        {desc.avatar.map(avatar => (
                                                                            <div key={avatar.public_id} >

                                                                                <MDBCard style={{ width: '175px', height: '155px' }}>
                                                                                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                                                                        <center>
                                                                                            <MDBCardImage src={avatar.url} alt="Avatar" />
                                                                                        </center>
                                                                                    </MDBRipple>
                                                                                </MDBCard>
                                                                            </div>
                                                                        ))}

                                                                    </div>
                                                                ))}
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <p>Role:</p>
                                                                            <div className="d-flex mb-3">
                                                                                <select
                                                                                    className="form-select"
                                                                                    name="role"
                                                                                    value={role}
                                                                                    onChange={(e) => setRole(e.target.value)}
                                                                                >
                                                                                    {users.user.role === 'donor' && <option value="donor">Donor</option>}
                                                                                    {users.user.role === 'user' && <option value="user">User</option>}
                                                                                    {users.user.role === 'admin' && <option value="admin">Admin</option>}
                                                                                    {users.user.role !== 'donor' && <option value="donor">Donor</option>}
                                                                                    {users.user.role !== 'user' && <option value="user">Recipient</option>}
                                                                                    {users.user.role !== 'admin' && <option value="admin">Admin</option>}
                                                                                </select>
                                                                            </div>
                                                                            <p>Name: <span className="badge bg-secondary">{users.user.name}</span></p>
                                                                            <MDBInput value={name} type='text' name='name' onChange={(e) => setName(e.target.value)} />
                                                                            <p>Email: <span className="badge bg-secondary">{users.user.email}</span></p>
                                                                            <MDBInput value={email} name={'email'} onChange={(e) => setEmail(e.target.value)} />
                                                                            <p>Address: <span className="badge bg-secondary">{users.user.address}</span></p>
                                                                            <MDBInput value={address} name={'address'} onChange={(e) => setAddress(e.target.value)} />
                                                                            <p>Phone:<span className="badge bg-secondary">{users.user.phone}</span></p>
                                                                            <MDBInput value={phone} name={'phone'} onChange={(e) => setPhone(e.target.value)} />
                                                                            <MDBInputGroup
                                                                                className='mb-3 my-4'
                                                                                textAfter='Upload'
                                                                                textTag='label'
                                                                                textProps={{ htmlFor: 'avatarFileInput' }}
                                                                            >
                                                                                <input className='form-control' type='file' id='avatarFileInput' onChange={handleAvatarChange} />
                                                                            </MDBInputGroup>
                                                                        </Col>
                                                                        <Col>
                                                                            {users.user.description && users.user.description.map(desc => (
                                                                                <div key={desc._id}>
                                                                                    <p>Sex:<span className="badge bg-secondary">{desc.sex}</span></p>
                                                                                    <MDBInput value={sex} name={'sex'} onChange={(e) => setSex(e.target.value)} />
                                                                                    <div>
                                                                                        <p>BirthDate:<span className="badge bg-secondary">{formatDate(desc.birthDate)}</span></p>
                                                                                        <MDBInput value={birthDate} type='date' name={'birthDate'} onChange={(e) => setBirthDate(e.target.value)} style={{ width: '150px' }} />
                                                                                    </div>
                                                                                    <p>bloodType:<span className="badge bg-secondary">{desc.bloodType}</span></p>
                                                                                    <MDBInput value={bloodType} name={'bloodType'} onChange={(e) => setBloodType(e.target.value)} />
                                                                                    <p>Year:<span className="badge bg-secondary">{desc.year}</span></p>
                                                                                    <MDBInput value={year} name={'year'} onChange={(e) => setYear(e.target.value)} />
                                                                                    <p>Course:<span className="badge bg-secondary">{desc.course}</span></p>
                                                                                    <MDBInput value={course} name={'course'} onChange={(e) => setCourse(e.target.value)} />
                                                                                    <p>Weight:<span className="badge bg-secondary">{desc.weight}</span></p>
                                                                                    <MDBInput value={weight} name={'weight'} onChange={(e) => setWeight(e.target.value)} />
                                                                                </div>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button type="submit" className="btn btn-success" onClick={submitHandler}>Update</button>
                                                            </div>
                                                        </>
                                                    )}
                                                </form>
                                            </div>
                                        </Row>
                                    </Col>

                                </Row>
                            </Col>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}

export default UpdateDonor
