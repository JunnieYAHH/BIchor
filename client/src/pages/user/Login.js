import React from 'react'
import Form from '../../components/Shared/Form/Form'

const Login = () => {
    return (
        <div className="row g-0">
            <div className="col-md-8 form-banner" >
                <img src="./assets/images/login.jpg" alt="loginImage" />
            </div>
            <div className="col-md-4 form-container">
                <Form formTitle={'Login Form'} submitBtn={'Login'} formType={'login'}/>
            </div>
        </div>
    )
}

export default Login