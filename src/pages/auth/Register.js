import React from "react"
import { Link } from "react-router-dom"
import { useRegister } from "../../context/RegisterContext.js"
import "./Auth.css"

const Register = () => {

  const { username, firstName, lastName, companyName, phoneNumber, primaryContractor, email, password, showPasswordDialog, handleRegister, verifyPassword } = useRegister()

  return (
    <main className="register-container">
      <section className="columns is-centered">
        <form className="box is-two-thirds" onSubmit={handleRegister}>
          <h1 className="title">QuickBids</h1>
          <p className="subtitle">Create an account</p>
          <div className="field">
            <label className="label" htmlFor="firstName">First Name</label>
            <div className="control">
              <input className="input" type="text" ref={firstName} id="firstName" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="lastName">Last Name</label>
            <div className="control">
              <input className="input" type="text" ref={lastName} id="lastName" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="companyName">Company Name</label>
            <div className="control">
              <input className="input" type="text" ref={companyName} id="companyName" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="phoneNumber">Phone Number</label>
            <div className="control">
              <input className="input" type="text" ref={phoneNumber} id="phoneNumber" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control">
              <input className="input" type="email" ref={email} id="email" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="username">Username</label>
            <div className="control">
              <input className="input" type="text" ref={username} id="username" />
            </div>
          </div>
          
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="password" placeholder="Password" ref={password} id="password" />
                </p>
              </div>

              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} id="verifyPassword" />
                </p>
              </div>
            </div>
          </div>

          {
            showPasswordDialog &&
            <div className="has-text-danger">
              Password fields must be matching
            </div>
          }

          <div className="field">
            <label className="checkbox" htmlFor="primaryContractor">Primary Contractor</label>
            <div className="control">
              <input className="checkbox" type="checkbox" ref={primaryContractor} id="primaryContractor" />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">Submit</button>
            </div>
            <div className="control">
              <Link to="/login" ><button className="button is-link is-light">Cancel</button></Link>
            </div>
          </div>

        </form>
      </section>
    </main>
  )
}

export default Register
