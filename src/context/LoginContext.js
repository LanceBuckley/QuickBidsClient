import React, { createContext, useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../managers/authManager.js"
import { useQuickBids } from "./QuickBidsContext"

// Create the context variable using createContext
const LoginContext = createContext()

// Code as normal, all things data related, useState, useEffect, etc. Make sure to pass children as a parameter
export const LoginProvider = ({ children }) => {


    const { setToken, setIsAdmin, setIsPrimary } = useQuickBids()

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
          setIsAdmin(res.staff)
          setIsPrimary(res.primary)
          navigate("/")
        }
        else {
          setisUnsuccessful(true)
        }
      })
    }

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <LoginContext.Provider
            value={{ isUnsuccessful, handleLogin, username, password }}
        >
            {children}
        </LoginContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useLogin = () => useContext(LoginContext)