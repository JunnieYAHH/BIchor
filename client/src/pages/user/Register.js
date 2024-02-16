import React from 'react'
import Form from '../../components/Shared/Form/Form'
import Header from '../../components/Layouts/Header'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Shared/Spinner'

const Register = () => {
  const { loading, error } = useSelector(state => state.user)
  return (
    <>
        {error && <span>{toast.error(error)}</span>}
      {loading ? (<Spinner />) : (
        <>
          <Header />
          <div className="row g-0">
            <div className="col-md-8 form-banner" >
              <img src="./assets/images/register.jpg" alt="loginImage" />
            </div>
            <div className='col-md-4 form-container'>
              <Form formTitle={'Register'} submitBtn={'Register'} formType={'register'} />
            </div>
          </div>
        </>
      )
      }
    </>
  )
}

export default Register