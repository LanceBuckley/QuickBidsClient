import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getMyJobs, getOpenJobs } from "../../managers/jobManager"
import { Link } from "gatsby"
import { getJobAcceptedBids } from "../../managers/bidManager"

const JobList = () => {
    const [jobs, setJobs] = useState([])
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])
    const [subs, setSubs] = useState([])

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

    useEffect(() => {
        if (jobs.length !== 0) {
            const copy = [...subs]
            jobs.map(async (job) => await getJobAcceptedBids(job.id).then((sub) => copy.push(sub)))
            setSubs(copy)
        }
    }, [jobs])

    const SubOnJob = (job) => {
        if (subs.length !== 0) {
            const actualSubs = subs.filter((sub) => sub !== null)
            if (actualSubs.length !== 0) {
                const subOnJob = actualSubs.find((sub) => sub !== null ? sub[0].job.id === job.id : "")
                return `${subOnJob[0].contractor.company_name}`
            }
        }
    }


    return (
        <>
            {currentUser[0].primary_contractor ? <h1>My Jobs</h1> : <h1>Open Jobs</h1>}
            <ul>{jobs.map((job) => (
                <li key={job.id}>
                    <p>{job.name}</p>
                    <p>{job.address}</p>
                    <p>SqFt: {job.square_footage}</p>
                    <p>{job.blueprint}</p>
                    <p>Needed:</p>
                    <ul>{job.fields.map((field) => (
                        <li key={field.id}>
                            <p>{field.job_title}</p>
                        </li>
                    ))}</ul>
                    <Link to={`/bids/${job.id}`}>Bids</Link>
                    <p>Status: {job.open ? 'Open' : 'Closed'}</p>
                    {!job.open ? <p>{SubOnJob(job)}</p> : ""}
                    <p>-----------------------------------</p>
                </li>
            ))}</ul>
        </>
    )
}


export default JobList