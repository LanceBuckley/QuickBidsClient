import { Routes, Route } from "react-router-dom" // Make sure to import Routes and Route
import QuickBidsProvider from "./QuickBidsContext"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { Navbar } from "src/components/nav/NavBar.js"

const QuickBids = () => {
  return (
    <Routes>
      <QuickBidsProvider>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Authorized>
              <>
                <Navbar />
                <ApplicationViews />
              </>
            </Authorized>
          }
        />
      </QuickBidsProvider>
    </Routes>
  )
}

export default QuickBids // Export the default component