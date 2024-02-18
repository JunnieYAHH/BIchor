import React from 'react'
import Form from '../../components/Shared/Form/Form'
import Header from '../../components/Layouts/Header'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Shared/Spinner'

const Login = () => {
    const { loading } = useSelector(state => state.user)
    return (
        <>
            {loading ? (<Spinner />) : (
                <>
                    <Header />
                    <div className="row g-0">
                        <div className="col-md-8 form-banner">
                            <img src="./assets/images/login.jpg" alt="loginImage" />
                        </div>
                        <div className="col-md-4 form-container">
                            <Form formTitle={'Login Form'} submitBtn={'Login'} formType={'login'} />
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Login