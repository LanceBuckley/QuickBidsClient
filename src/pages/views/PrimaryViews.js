import React from "react"
import { Route, Routes } from "react-router-dom"
import JobList from "../jobs/JobList"
import NewJob from "../jobs/NewJob"
import SubsList from "../subs/SubsList"
import SubDetails from "../subs/[id]"


const PrimaryViews = () => {
    return (
        <>
            <Routes>
                <Route index element={<JobList />} />
                <Route path="jobs/NewJob" element={<NewJob />} />
                <Route path="subs/SubsList" element={<SubsList />} />
                <Route path="subs/:userId" element={<SubDetails />} />
            </Routes>
        </>
    )
}

export default PrimaryViews