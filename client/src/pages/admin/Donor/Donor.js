import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBRow as Row,
    MDBCol as Col,
} from 'mdb-react-ui-kit';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import '../../../index.css'

const Donor = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
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


    const formatUsersForDataTable = () => {
        const filteredUsers = users.filter(user => !['clinic', 'organisation'].includes(user.role));

        return {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc',
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc',
                },
                {
                    label: 'Phone',
                    field: 'phone',
                    sort: 'asc',
                },
                {
                    field: 'actions',
                },
            ],
            rows: filteredUsers.map(user => ({
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                phone: user.phone,
                actions: (
                    <>
                        <Link to={`/admin/update/donor/${user._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link>
                            <i className="fa-regular fa-eye"></i>
                        </Link>
                    </>
                ),
            }))
        };
    };

    return (
        <>
            <Header sticky />
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
                                            <img src="../../assets/images/systemLOGOMAIN.png" alt="logotup" id='tuplogo' style={{ width: "20%", height: "20%" }} />
                                            <p style={{ margin: '0', fontWeight: 'bold' }}>USERS LIST</p>
                                            <h6 style={{ margin: '0', fontWeight: 'lighter' }}>Technological University of the Philippines, Taguig City</h6>
                                            <Link to={'/admin/create/donor'} className="btn btn-success" style={{width:'50%'}}>
                                                <i class="fa-solid fa-circle-plus"></i> Create
                                            </Link>
                                        </div>
                                    </div>
                                    <Col>
                                        <Row style={{ backgroundColor: 'black', borderRadius: '20px' }} className='my-1' >
                                            <MDBDataTable
                                                data={formatUsersForDataTable()}
                                                className="user-datatable"
                                                bordered
                                                striped
                                                hover
                                                btn
                                                displayEntries={false}
                                                entriesOptions={[5, 10, 15, 20]}
                                                entries={10}
                                                paginationLabel={['Previous', 'Next']}
                                                searchLabel="Search"
                                                responsive
                                                responsiveSm
                                                responsiveMd
                                                responsiveLg
                                                responsiveXl
                                                scrollX
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Donor;