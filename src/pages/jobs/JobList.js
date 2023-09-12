import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getMyJobs, getOpenJobs } from "../../managers/jobManager"

const JobList = () => {
    const [Jobs, setJobs] = useState([])
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])

    useEffect(() => {
        getCurrentUser()
            .then((user) => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (currentUser[0].id !== 0 && currentUser[0].primary_contractor) {
            getMyJobs(currentUser[0].id)
                .then((jobs) => setJobs(jobs))
        }
        else if (currentUser[0].id !== 0) {
            getOpenJobs()
                .then((jobs) => setJobs(jobs))
        }
    }, [currentUser])


    return (
        <>
        {currentUser[0].primary_contractor ? <h1>My Jobs</h1> : <h1>Open Jobs</h1>}
            <ul>{Jobs.map((job) => (
                <li key={job.id}>
                    <p>{job.name}</p>
                    <p>{job.address}</p>
                    <p>SqFt: {job.square_footage}</p>
                    <p>Blueprint goes here</p>
                    <p>Needed:</p>
                    <ul>{job.fields.map((field) => (
                        <li key = {field.id}>
                            <p>{field.job_title}</p>
                        </li>
                    ))}</ul>
                    <p>Bids Link</p>
                    <p>Status: {job.open ? 'Open' : 'Closed'}</p>
                    <p>If Closed Show Chosen Subcontractor</p>
                    <p>-----------------------------------</p>
                </li>
            ))}</ul>
        </>
    )
}


export default JobList