import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../managers/authManager.js"

export const Login = ({ setToken, setAdmin }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      if ("valid" in res && res.valid) {
        setToken(res.token)
        setAdmin(res.staff)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }
  /*--------------------------------------------------------------------*/
  // Autofill Username/Password by default streamline devolopment process 
  useEffect(
    () => {
      username.current.value = "megducharme"
      password.current.value = "ducharme"
    },
    []
  )
  /*--------------------------------------------------------------------*/
  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">QuickBids</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} id="username" />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} id="password" />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit" >Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}
