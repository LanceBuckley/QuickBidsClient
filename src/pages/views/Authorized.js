import React from "react"
import { Navigate } from "react-router-dom"
import { useQuickBids } from "../../context/QuickBidsContext"
import ApplicationViews from "./ApplicationViews"
import { Navbar } from "../../components/nav/NavBar.js"

const Authorized = () => {

  const { token } = useQuickBids()

  if (token) {
    return <>
      <Navbar />
      <ApplicationViews />
    </>
  }
  return <Navigate to='/login' replace />
}

export default Authorized
