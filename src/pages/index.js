import React from "react"
import { BrowserRouter } from "react-router-dom"
import QuickBids from "./QuickBids"
import "./index.css"

const IndexPage = () => {
    return (
        <BrowserRouter>
            <QuickBids />
        </BrowserRouter>
    )
}

export default IndexPage