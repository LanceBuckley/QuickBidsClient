import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getMyJobs, getOpenJobs } from "../../managers/jobManager"

const JobList = () => {
    const [myJobs, setMyJobs] = useState([])
    const [openJobs, setOpenJobs] = useState([])
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])

    useEffect(() => {
        getCurrentUser()
            .then((user) => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (currentUser[0].id !== 0 && currentUser[0].primary_contractor) {
            getMyJobs(currentUser[0].id)
                .then((jobs) => setMyJobs(jobs))
        }
        else if (currentUser[0].id !== 0) {
            getOpenJobs()
                .then((jobs) => setOpenJobs(jobs))
        }
    }, [currentUser])


    return (
        <>
            <p>{myJobs.map((job) => (
                <li key={job.id}>
                    {job.name}
                </li>
            ))}</p>
        </>
    )
}


export default JobList