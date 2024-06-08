import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import {registration} from "../redux/slicers/auth.slice"


const Registrate: React.FC = () => {
  const dispatch = useDispatch()
  const [email, setRegistrateEmail] = useState<string>('')
  const [password, setRegistratePassword] = useState<string>('')
  const [username, setRegistrateUserName] = useState<string>('')


  const registerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registration({email, password, username}))
  }

  return (
    <>
      <Navbar activeElement="auth" />
      <div className="form-container">
        <form className="form-sign" onSubmit={registerHandler}>
          <div className="row">
            <div className="input-field">
              <input id="register-email" onChange={(event) => setRegistrateEmail(event.target.value)} value={email} type="email" />
              <label htmlFor="register-email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input id="username" onChange={(event) => setRegistrateUserName(event.target.value)} type="text" value={username} />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input id="register-password" onChange={(event) => setRegistratePassword(event.target.value)} type="password" value={password} />
              <label htmlFor="register-password">Password</label>
            </div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light red darken-2" type="submit" >Sign Up</button>
          </div>
        </form>
      </div>
    </>
  )
}


export default Registrate