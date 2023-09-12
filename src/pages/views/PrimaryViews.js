import React from "react"
import { Route, Routes } from "react-router-dom"
import JobList from "../jobs/JobList"
import NewJob from "../jobs/NewJob"


const PrimaryViews = () => {
    return (
        <>
            <Routes>
                <Route index element={<JobList />} />
                <Route path="/jobForm" element={<NewJob />} />
            </Routes>
        </>
    )
}

export default PrimaryViews