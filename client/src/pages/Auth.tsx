import React, { FormEvent } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux'
// import { login } from '../redux/actions';
import { Link } from 'react-router-dom';
import { login } from './../redux/slicers/auth.slice';


const Auth: React.FC = () => {
  const dispatch = useDispatch()

  const [loginEmail, setLoginEmail] = useState<string>('')
  const [loginPassword, setLoginPassword] = useState<string>('')

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({email: loginEmail, password: loginPassword}))
  }


  return (
    <>
      <Navbar activeElement='auth' />
      <div className="container">
        <main>
          <div className="row-flex">
            <div className="form-container">
              <form className="form-sign" onSubmit={loginHandler}>
                <div className="row">
                  <div className="input-field">
                    <input id="login-email" onChange={(event) => setLoginEmail(event.target.value)} type="email" className="validate" />
                    <label htmlFor="login-email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field">
                    <input id="login-password" onChange={(event) => setLoginPassword(event.target.value)} type="password" />
                    <label htmlFor="login-password">Password</label>
                  </div>
                </div>
                <button className="btn btn-login waves-effect waves-light green lighten-1" type="submit">
                  <i className="material-icons right">send</i>Sign In</button>
                <Link to="/register">create account</Link>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Auth