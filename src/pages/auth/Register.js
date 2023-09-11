import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../components/managers/authManager.js"
import { useQuickBids } from "../../context/QuickBidsContext.js"

const Register = () => {

  const { setToken, setIsAdmin, setIsPrimary } = useQuickBids()

  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const company_name = useRef()
  const phone_number = useRef()
  const primary_contractor = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const [showPasswordDialog, setShowDialog] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        company_name: company_name.current.value,
        phone_number: phone_number.current.value,
        primary_contractor: primary_contractor.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      registerUser(newUser)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
            setIsAdmin(res.staff)
            setIsPrimary(res.primary)
            navigate("/")
          }
        })
    } else {
      setShowDialog(true)
    }
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
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
          <label className="label" htmlFor="username">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} id="username" />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="company_name">Company Name</label>
          <div className="control">
            <input className="input" type="text" ref={company_name} id="company_name" />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="phone_number">Phone Number</label>
          <div className="control">
            <input className="input" type="text" ref={phone_number} id="phone_number" />
          </div>
        </div>

        <div className="field">
          <label className="checkbox" htmlFor="primary_contractor">Primary Contractor</label>
          <div className="control">
            <input className="checkbox" type="checkbox" ref={primary_contractor} id="primary_contractor" />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} id="email" />
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

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>
    </section>
  )
}

export default Register
