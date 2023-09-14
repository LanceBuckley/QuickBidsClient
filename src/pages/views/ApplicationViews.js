import React from "react"
import { Route, Routes } from "react-router-dom"
import JobList from "../jobs/JobList"
import NewJob from "../jobs/NewJob"
import SubsList from "../subs/SubsList"
import SubDetails from "../subs/[id]"
import BidsList from "../bids/[id]"


const ApplicationViews = () => {
    return (
        <>
            <Routes>
                <Route index element={<JobList />} />
                <Route path="jobs/NewJob" element={<NewJob />} />
                <Route path="subs/SubsList" element={<SubsList />} />
                <Route path="subs/:userId" element={<SubDetails />} />
                <Route path="bids/:jobId" element={<BidsList />} />
            </Routes>
        </>
    )
}

export default ApplicationViews