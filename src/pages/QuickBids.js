import React from "react"
import { Routes, Route } from "react-router-dom" // Make sure to import Routes and Route
import { QuickBidsProvider } from "../context/QuickBidsContext"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Authorized from "./views/Authorized"


const QuickBids = () => {
  return (
    <QuickBidsProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
          <Authorized>

          </Authorized>
        } />
      </Routes>
    </QuickBidsProvider>
  )
}

export default QuickBids // Export the default component