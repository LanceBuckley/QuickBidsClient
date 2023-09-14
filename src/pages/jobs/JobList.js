import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getMyJobs, getOpenJobs } from "../../managers/jobManager"
import { Link } from "gatsby"
import { getJobAcceptedBids } from "../../managers/bidManager"

const JobList = () => {
    const [jobs, setJobs] = useState([])
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])
    const [bids, setBids] = useState([])

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
            const promises = jobs.map((job) =>
                getJobAcceptedBids(job.id)
            );

            Promise.all(promises).then((bids) => {
                const acceptedBids = bids.reduce((acc, copy) => acc.concat(copy), []);
                setBids(acceptedBids);
            });
        }
    }, [jobs]);


    const subOnJob = (job) => {
        const actualSubs = bids.filter((sub) => sub.length !== 0)
        if (actualSubs.length !== 0) {
            const subOnJob = actualSubs.find((sub) => sub.length !== 0 ? sub.job.id === job.id : "")
            return `${subOnJob.contractor.company_name}`
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
                    <p>Status: {job.open ? 'Open' : 'Closed'}</p>
                    <Link to={`/bids/${job.id}`}>Bids</Link>
                    {!job.open ? <p>{subOnJob(job)}</p> : ""}
                    <p>-----------------------------------</p>
                </li>
            ))}</ul>
        </>
    )
}


export default JobList