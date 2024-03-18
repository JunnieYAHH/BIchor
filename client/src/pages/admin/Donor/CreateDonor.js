import React, { useState } from 'react';
import InputType from '../../../components/Shared/Form/InputType';
import { MDBContainer, MDBRow, MDBCol as Col } from 'mdb-react-ui-kit';
import Sidebar from '../../../components/Layouts/AdminSidebar';
import Header from '../../../components/Layouts/AdminHeader';
import axios from 'axios'
import '../../../index.css'


const CreateDonor = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: '',
        name: '',
        organisationName: '',
        hospitalName: '',
        website: 'N/A',
        address: '',
        phone: '',
    });

    const { email, password, role, name, organisationName, hospitalName, website, address, phone } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/userCreate`, formData);
            console.log(res.data); // Handle success response
        } catch (error) {
            console.error(error); // Handle error response
        }
    };

    return (
        <div>
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
                                    <MDBContainer fluid className='p-4 '>
                                        <MDBRow className='justify-content-center align-items-center'>
                                            <Col md='9' className='text-center text-md-start d-flex flex-column justify-content-center'>
                                                {/* Content on the left side, if needed */}
                                            </Col>
                                            <Col md='9' className='position-relative'>
                                                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <div className="card my-3 bg-glass">
                                                        <div className="card-body p-5">
                                                            <form onSubmit={handleSubmit}>
                                                                <div className="d-flex mb-3">
                                                                    <select
                                                                        className="form-select"
                                                                        name="role"
                                                                        value={role}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option selected>Create: Select</option>
                                                                        <option value="donor">Donor</option>
                                                                        <option value="user">User</option>
                                                                        <option value="admin">Admin</option>
                                                                    </select>
                                                                </div>
                                                                {/* Add other input fields */}
                                                                <InputType
                                                                    labelText={"Name"}
                                                                    labelFor={"forName"}
                                                                    inputType={"text"}
                                                                    name={"name"}
                                                                    value={name}
                                                                    onChange={handleChange}
                                                                />
                                                                <InputType
                                                                    labelText={'Email'}
                                                                    labelFor={'forEmail'}
                                                                    inputType={'email'}
                                                                    name={'email'}
                                                                    value={email}
                                                                    onChange={handleChange}
                                                                />
                                                                <InputType
                                                                    labelText={'Password'}
                                                                    labelFor={'forPassword'}
                                                                    inputType={'password'}
                                                                    name={'password'}
                                                                    value={password}
                                                                    onChange={handleChange}
                                                                />
                                                                <InputType
                                                                    labelText={"Address"}
                                                                    labelFor={"forAddress"}
                                                                    inputType={"text"}
                                                                    name={"address"}
                                                                    value={address}
                                                                    onChange={handleChange}
                                                                />
                                                                <InputType
                                                                    labelText={"Phone"}
                                                                    labelFor={"forPhone"}
                                                                    inputType={"text"}
                                                                    name={"phone"}
                                                                    value={phone}
                                                                    onChange={handleChange}
                                                                />
                                                                <button className="btn btn-danger d-block mx-auto" type="submit">
                                                                    Submit
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </MDBRow>
                                    </MDBContainer>
                                </Col>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </div >
    )
}

export default CreateDonor
