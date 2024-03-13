import React, { useState, useEffect, Fragment } from 'react'
import {
    MDBRow as Row,
    MDBCol as Col,
    MDBCard as Card,
    MDBCardBody as CardBody,
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Layouts/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import '../../index.css';
import '../../App.css';
import axios from 'axios'

const Forum = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isHomePage = location.pathname === '/';
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout Success')
        navigate('/login')
    }
    const { user } = useSelector(state => state.user);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const loggedInUserID = user ? user._id : null;


    //Add Comment
    // const [userID, setUserID] = useState('');
    // const [eventID, setEventId] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [comments, setComments] = useState(Array(events.length).fill(''));
    const handleCommentChange = (index, value) => {
        setComments(prevComments => {
            const newComments = [...prevComments];
            newComments[index] = value;
            return newComments;
        });
    };
    // Set Error and success
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');
    // const toggleOpen = (eventId, userId) => {
    //     setEventId(eventId);
    //     setUserID(userId);
    // };

    // console.log(userID, 'this is user id')
    // console.log(events, 'this is event')
    // console.log(selectedFiles)
    // console.log(comments)

    //DATE FORMAT
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    // console.log(user)

    ///FILE HANDLING
    const [showFileInputs, setShowFileInputs] = useState(Array(events.length).fill(false));
    const toggleFileInput = (index) => {
        const updatedShowFileInputs = [...showFileInputs];
        updatedShowFileInputs[index] = !updatedShowFileInputs[index];
        setShowFileInputs(updatedShowFileInputs);
    };
    const onChange = (e) => {
        setSelectedFiles(e.target.files);
    };
    //Comment Handling
    const [showCommentInput, setShowCommentInput] = useState(Array(events.length).fill(false));
    const toggleShowComment = (index) => {
        const letShowComment = [...showCommentInput];
        letShowComment[index] = !letShowComment[index];
        setShowCommentInput(letShowComment);
    };

    //GET DATA
    useEffect(() => {
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

        getAllEvents();

        // if (user && user._id) {
        //     setUserID(user._id);
        // }

        const getAllUsers = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/user/getAllUsers`, config);
                setUsers(data.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        getAllUsers();

    }, [token]);

    /// CREATE COMMENT
    const createNewComment = async (commentData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/event/create-comment`, commentData, config);
            setSuccess(data.success);
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const createComment = (eventID) => {
        // e.preventDefault();
        // console.log(user._id)
        const formData = new FormData();

        formData.append('userID', user._id);
        formData.append('eventID', eventID);
        formData.append('detail', comments);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('image', selectedFiles[i]);
            // console.log(selectedFiles[i])
        }

        createNewComment(formData)

    };

    //DELETE COMMENT
    const deleteComment = async (eventId, commentId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.delete(`${process.env.REACT_APP_BASEURL}/event/delete-comment/${eventId}/${commentId}`, config);
            setSuccess(data.success);
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <header className='header'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary header">
                    <div className="container-fluid">
                        <img src="../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' />
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
                                    <img src="../assets/images/tup.png" classname="img-fluid my-3" alt="banner" style={{ width: '90%', height: '50%', objectFit: 'cover' }} />
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
                                                                    <Link to='/blood/forum/the-pad' style={{ textDecoration: 'none', color: 'white' }}>
                                                                        The
                                                                        <h4 style={{ color: 'orange', fontWeight: 'bold' }}>Pad</h4>
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
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                            <Col style={{ width: '300px' }}>
                                                <Card style={{ backgroundColor: 'gray', color: 'white' }}>
                                                    <Row>
                                                        <Col>
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
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </center>
                                    <p>___ <a style={{ color: 'red', fontWeight: 'bold' }}>Latest</a> New's _______________________________________________________________________________________________________________</p>
                                    <Card className='px-4' style={{ backgroundColor: 'white', color: 'white', width: '90%' }}>
                                        <img src="../assets/images/systemLOGOMAIN.png" classname="img-fluid my-3" alt="banner" style={{ width: '20%', height: '20%', objectFit: 'cover', borderRadius: '100px' }} />
                                        <Row>
                                            <Col style={{ justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                                <Row>
                                                    <Col>
                                                        {events
                                                            .filter(event => event.status === "pending")
                                                            .map((event, index) => (
                                                                <form encType="multipart/form-data" onSubmit={createComment}>
                                                                    <Card className='my-2' style={{ backgroundColor: 'red', width: '75%' }} key={index}>
                                                                        <Row className='my-4'>
                                                                            <Col>
                                                                                <Card className='px-4' style={{ backgroundColor: 'white', width: '90%', marginLeft: '30px' }}>
                                                                                    <div style={{ marginLeft: '20px' }}>
                                                                                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{event.title} <a style={{ fontSize: '10px', fontWeight: 'lighter' }}>{formatDate(event.date)}</a></p>
                                                                                        <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%' }}>
                                                                                            <img src={event.images[0].url} className="img-fluid" alt="banner" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                                                                        </div>
                                                                                        <p style={{ fontSize: '12px', fontWeight: 'lighter' }}>{event.details}</p>
                                                                                    </div>
                                                                                </Card>
                                                                            </Col>
                                                                        </Row>
                                                                        {showFileInputs[index] && (
                                                                            <input
                                                                                type='file'
                                                                                name='avaimagestar'
                                                                                className="form-control"
                                                                                id='customFile'
                                                                                style={{ fontSize: '12px', width: '90%', marginLeft: '30px' }}
                                                                                onChange={onChange}
                                                                                multiple
                                                                            />
                                                                        )}
                                                                        <div className="input-group mb-3" style={{ width: '90%', marginLeft: '30px' }}>
                                                                            <Card>
                                                                                {user && user.description && user.description.length > 0 && user.description[0].avatar && user.description[0].avatar.length > 0 && (
                                                                                    <img src={user.description[0].avatar[0].url} className="img-fluid" alt="avatar" style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }} />
                                                                                )}
                                                                            </Card>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Comment"
                                                                                aria-label="Username"
                                                                                aria-describedby="basic-addon1"
                                                                                value={comments[index]}
                                                                                onChange={(e) => handleCommentChange(index, e.target.value)}
                                                                                style={{ fontSize: '12px' }}
                                                                            />
                                                                            <span className="input-group-text" id="basic-addon1">
                                                                                <i className="fa-solid fa-file px-4" style={{ cursor: 'pointer' }} onClick={() => toggleFileInput(index)}></i>
                                                                                <i className="fa-solid fa-paper-plane" style={{ cursor: 'pointer', marginRight: '20px' }} onClick={() => createComment(event._id)}></i>
                                                                                <i class="fa-solid fa-comment" style={{ cursor: 'pointer' }} onClick={() => toggleShowComment(index)}></i>
                                                                            </span>
                                                                        </div>
                                                                        {showCommentInput[index] && (
                                                                            <>
                                                                                <p className='px-4' style={{ fontWeight: 'bolder' }}>Comments:</p>
                                                                                <Card className="mb-3 px-4" style={{ width: '90%', marginLeft: '30px', backgroundColor: 'gray' }}>
                                                                                    {event.comment && event.comment.map((comment, commentIndex) => {
                                                                                        const user = users.find(user => user._id === comment.userID);
                                                                                        console.log('loggedInUserID:', loggedInUserID);
                                                                                        const isCurrentUserComment = user && user._id === loggedInUserID;
                                                                                        // console.log('User ID:', isCurrentUserComment);
                                                                                        // console.log('Comment User ID:', comment.userID);
                                                                                        return (
                                                                                            <>
                                                                                                <div>
                                                                                                    {user && user.description && user.description[0].avatar && user.description[0].avatar[0] && (
                                                                                                        <>
                                                                                                            <Row>
                                                                                                                <Col xs={6}>
                                                                                                                    <img src={user.description[0].avatar[0].url} alt="User Avatar" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                                                                                                                    <a className='px-1' style={{ fontSize: '12px', textDecorationLine: 'none', color: 'black' }}>{user ? user.name : 'Unknown'}</a>
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                            <Row>
                                                                                                                <Col>
                                                                                                                    <p style={{ fontSize: '12px', textDecorationLine: 'none', color: 'black', width: '125px' }}>{user ? user.email : 'Unknown'}</p>
                                                                                                                    <Card className='px-2' key={commentIndex} style={{ backgroundColor: 'white', wordWrap: 'break-word', minWidth: '100px', maxWidth: '400px' }}>
                                                                                                                        <div>
                                                                                                                            <p className='my-10' style={{ fontSize: '12px' }}>{comment.detail}
                                                                                                                                {isCurrentUserComment && ( // Render trash icon only if the comment belongs to the current user
                                                                                                                                    <i className="fa-solid fa-trash " style={{ cursor: 'pointer', color: '#370e0e', marginLeft: '400px', fontSize: '12px' }} onClick={() => deleteComment(event._id, comment._id)} ></i>
                                                                                                                                )}
                                                                                                                            </p>
                                                                                                                        </div>
                                                                                                                    </Card>
                                                                                                                    {comment.image && comment.image.map((image, imageIndex) => (
                                                                                                                        <img key={imageIndex} src={image.url} className="img-fluid" alt="avatar" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                                                                                    ))}
                                                                                                                    {/* reply */}
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                            <hr style={{ borderTop: '2px solid black', margin: '20px 0' }} />
                                                                                                        </>
                                                                                                    )}
                                                                                                </div>
                                                                                            </>
                                                                                        );
                                                                                    })}
                                                                                </Card>
                                                                            </>
                                                                        )}
                                                                    </Card>
                                                                </form>
                                                            ))}
                                                    </Col >
                                                </Row>
                                            </Col>
                                        </Row>
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

export default Forum
