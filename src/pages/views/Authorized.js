import { Navigate, Outlet } from "react-router-dom"
import { useQuickBids } from "../QuickBidsContext"

export const Authorized = () => {

const { token } = useQuickBids

  if (token) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}
