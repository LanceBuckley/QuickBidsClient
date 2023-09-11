import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useQuickBids } from "../../context/QuickBidsContext"

const Authorized = () => {

const { token } = useQuickBids

  if (token) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}

export default Authorized
