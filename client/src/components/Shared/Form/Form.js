import React, { useState } from 'react';
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin } from '../../../services/authService';
import { handleRegister } from '../../../services/authService';


const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [website, setWebsite] = useState('N/A');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div>
      <form onSubmit={(e) => {
        if (formType === 'login') return handleLogin(
          e,
          email,
          password,
          role
        )
        else if (formType === 'register') return handleRegister(
          e,
          name,
          role,
          email,
          password,
          organisationName,
          address,
          hospitalName,
          website,
          phone
        )
      }}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donorRadio"
              value={"donor"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="userRadio" className="form-check-label">
              Donor
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="userRadio"
              value={"user"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="userRadio" className="form-check-label">
              User
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
        </div>
        {/* switch element */}
        {(() => {
          switch (true) {
            case formType === 'login':
              return (
                <div>
                  <InputType
                    labelText={'Email'}
                    labelFor={'forEmail'}
                    inputType={'email'}
                    name={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={'Password'}
                    labelFor={'forPassword'}
                    inputType={'password'}
                    name={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              );
            case formType === 'register':
              return (
                <>
                  <InputType
                    labelText={"Name"}
                    labelFor={"forName"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputType
                    labelText={'Email'}
                    labelFor={'forEmail'}
                    inputType={'email'}
                    name={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={'Password'}
                    labelFor={'forPassword'}
                    inputType={'password'}
                    name={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputType
                    inputType={'hidden'}  
                    labelFor={'forWebsite'}
                    name={'website'}
                    value={'N/A'}
                    onChange={(e) => setWebsite(e.target.value)}
                  />

                  <InputType
                    labelText={'Address'}
                    labelFor={'forAddress'}
                    inputType={'text'}
                    name={'address'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={'Phone'}
                    labelFor={'forPhone'}
                    inputType={'text'}
                    name={'phone'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            default:
              return null;
          }
        })()}
        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registerd yet ? Register
              <Link to="/register"> Here !</Link>
            </p>
          ) : (
            <p>
              Already User Please
              <Link to="/login"> Login !</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form;
