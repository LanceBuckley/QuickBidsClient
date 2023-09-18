import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useLogin } from "../../context/LoginContext.js"

const Login = () => {

  const { isUnsuccessful, handleLogin, username, password } = useLogin()

  /*--------------------------------------------------------------------*/
    // Autofill Username/Password by default streamline devolopment process 
    useEffect(
      () => {
        username.current.value = "bryannilson"
        password.current.value = "nilson"
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
            <Link to="/register">
              <button className="button is-link is-light">Register</button>
              </Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}

export default Login
