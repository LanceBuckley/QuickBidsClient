import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getJob, getMyJobs, getOpenJobs, updateJob } from "../../managers/jobManager"
import { Link } from "gatsby"
import { createBid, getJobAcceptedBids, getMyBidRequests, updateBid } from "../../managers/bidManager"
import "./JobList.css"

const JobList = () => {
    const [jobs, setJobs] = useState([])
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])
    const [bids, setBids] = useState([])
    const [bidRequests, setBidRequests] = useState([])
    const [modalVisible, setModalVisible] = useState({
        visible: false,
        associatedJob: {}
    })
    const isPrimary = localStorage.getItem("is_primary")
    const [newBid, setNewBid] = useState({
        rate: 0,
        job_id: 0
    })
    const [render, setRender] = useState(false)

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
    }, [currentUser, render])

    useEffect(() => {
        if (jobs.length !== 0) {
            const promises = jobs.map((job) =>
                getJobAcceptedBids(job.id)
            );

            Promise.all(promises).then((bids) => {
                const acceptedBids = bids.reduce((acc, copy) => acc.concat(copy), [])
                setBids(acceptedBids);
            })
        }
    }, [jobs, render])

    useEffect(() => {
        if (isPrimary !== "true") {
            getMyBidRequests(currentUser[0].id)
                .then((bidsForMe) => setBidRequests(bidsForMe))
        }
    }, [currentUser, render])


    const subOnJob = (job) => {
        const actualSubs = bids.filter((sub) => sub.length !== 0)
        if (actualSubs.length !== 0) {
            const subOnJob = actualSubs.find((sub) => sub.length !== 0 ? sub.job.id === job.id : "")
            if (subOnJob) {
                return `${subOnJob.sub_contractor.company_name}`
            }
            return "No Contractor"
        }
    }

    const handleMakeBid = async () => {
        if (newBid.rate <= 0) {
            return window.alert("Not Valid Rate")
        }

        const myNewBid = {
            primary: modalVisible.associatedJob.contractor.id,
            sub: currentUser[0].id,
            job: modalVisible.associatedJob.id,
            rate: newBid.rate,
            is_request: false
        }

        await createBid(myNewBid)
        const copy = { ...newBid }
        copy.rate = 0
        copy.job_id = 0
        setNewBid(copy)
        setModalVisible({ visible: false, associatedJob: {} })
        window.alert("Bid Sent")
    }

    const makeBidModalJSX = () => {
        return (
            <>
                <div className={`modal ${modalVisible.visible ? "is-active" : ""}`}>
                    <div className="modal-container">
                        <div className="modal-content">
                            <h2 className="modal-title">Make Bid</h2>
                            <input
                                required
                                type="number"
                                value={newBid.rate}
                                onChange={(e) =>
                                    setNewBid({
                                        ...newBid,
                                        rate: parseInt(e.target.value),
                                    })
                                }
                            />
                            <button
                                className="modal-btn"
                                onClick={() => handleMakeBid()}
                            >
                                Ok
                            </button>
                            <button
                                className="modal-btn"
                                onClick={() =>
                                    setModalVisible({ visible: false, associatedJob: {} })
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const listOfRequests = () => {
        return (
            <>
                <section className="box">
                    <div className="job-title">You Have Requests</div>
                    <div className="job-container">
                        <ul className="job-list">{bidRequests.map((bid) => (
                            <div className="requests" key={`bid--${bid.id}`}>
                                <div>
                                    <dl className="job-instance">
                                        <dt className="job-name">From:</dt>
                                        <dd className="job-detail">{bid.primary_contractor.company_name}</dd>
                                    </dl>
                                    <dl className="job-instance">
                                        <dt className="job-name">Job:</dt>
                                        <dd className="job-detail">{bid.job.name}</dd>
                                    </dl>
                                    <dl className="job-instance">
                                        <dt className="job-name">Rate:</dt>
                                        <dd className="job-detail">{bid.rate}</dd>
                                    </dl>
                                </div>
                                <button className="button is-success" onClick={() => { handleAcceptRequest(bid) }}>Accept</button>
                            </div>
                        ))}</ul>
                    </div>
                </section>
            </>
        )
    }

    const handleAcceptRequest = async (bid) => {
        const rerender = render ? false : true
        const job = await getJob(bid.job.id)

        const bidPutBody = {
            id: bid.id,
            job: bid.job.id,
            primary: bid.primary_contractor.id,
            sub: currentUser[0].id,
            rate: bid.rate,
            accepted: true,
            is_request: false
        }

        const jobCopy = { ...job }
        const fieldsCopy = []
        jobCopy.fields.map((field) => fieldsCopy.push(field.id))
        jobCopy.open = false
        jobCopy.contractor = jobCopy.contractor.id
        jobCopy.fields = fieldsCopy
        updateBid(bidPutBody)
        updateJob(jobCopy)

        setTimeout(() => {
            setRender(rerender)
        }, 50)
    }


    return (
        <>
            {currentUser[0].primary_contractor ? <h1 className="job-title">My Jobs</h1>
                : <>
                    {bidRequests.length > 0 ? listOfRequests() : ""}
                    <h1 className="job-title">Open Jobs</h1>
                </>
            }
            <div className="job-container">
                <ul className="job-list">{jobs.map((job) => (
                    <li className="job-item" key={`job--${job.id}`}>
                        <p className="job-title">{job.name}</p>
                        <dl className="job-instance">
                            <dt className="job-name">Address:</dt>
                            <dd className="job-detail">{job.address}</dd>
                        </dl>
                        <dl className="job-instance">
                            <dt className="job-name">Square Footage:</dt>
                            <dd className="job-detail">{job.square_footage}</dd>
                        </dl>
                        <dl className="job-instance">
                            <dt className="job-name">Needed:</dt>
                            <ul>{job.fields.map((field) => (
                                <li key={field.id}>
                                    <dd className="job-detail">{field.job_title}</dd>
                                </li>
                            ))}</ul>
                        </dl>
                        <div className="job-container">
                            <div>
                                <p className="job-name">Status: {job.open ? 'Open' : job.complete ? 'Complete' : 'Closed'}</p>
                                <div className="job-container">
                                    {!job.open ? <p className="job-name">{subOnJob(job)}</p> : <Link to={`/bids/${job.id}`}>Bids</Link>}
                                </div>
                                <div className="job-container">
                                    <p>{isPrimary === "false" ? <button className="button is-success" onClick={() => setModalVisible({ visible: true, associatedJob: job })}>Make Bid</button> : ""}</p>
                                </div>
                                <div className="job-container">
                                    <Link to={`/jobs/${job.id}`}>{isPrimary === "true" ? <button>Edit</button> : ""}</Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}</ul>
            </div>
            <div>{makeBidModalJSX()}</div>
        </>
    )
}


export default JobList