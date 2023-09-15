import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getJob, getMyJobs, getOpenJobs, updateJob } from "../../managers/jobManager"
import { Link } from "gatsby"
import { createBid, getJobAcceptedBids, getMyBidRequests, updateBid } from "../../managers/bidManager"
import "./BidModal.css"

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
                const acceptedBids = bids.reduce((acc, copy) => acc.concat(copy), [])
                setBids(acceptedBids);
            })
        }
    }, [jobs])

    useEffect(() => {
        if (isPrimary !== "true") {
            getMyBidRequests(currentUser[0].id)
                .then((bidsForMe) => setBidRequests(bidsForMe))
        }
    }, [currentUser])


    const subOnJob = (job) => {
        const actualSubs = bids.filter((sub) => sub.length !== 0)
        if (actualSubs.length !== 0) {
            const subOnJob = actualSubs.find((sub) => sub.length !== 0 ? sub.job.id === job.id : "")
            return `${subOnJob.sub_contractor.company_name}`
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
                <div>You Have Requests</div>
                {bidRequests.map((bid) => (
                    <div key={bid.id}>
                        <h1>{bid.primary_contractor.company_name}</h1>
                        <h2>{bid.job.name}</h2>
                        <h3>{bid.rate}</h3>
                        <button onClick={() => { handleAcceptRequest(bid) }}>Accept</button>
                    </div>
                ))}
            </>
        )
    }

    const handleAcceptRequest = async (bid) => {
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
        getMyBidRequests(currentUser[0].id)
                .then((bidsForMe) => setBidRequests(bidsForMe))
    }


    return (
        <>
            {currentUser[0].primary_contractor ? <h1>My Jobs</h1>
                : <>
                    {bidRequests ? listOfRequests() : <div>No New Requests</div>}
                    <h1>Open Jobs</h1>
                </>
            }
            <ul>{jobs.map((job) => (
                <li key={job.id}>
                    <p>{job.name}</p>
                    <p>{job.address}</p>
                    <p>SqFt: {job.square_footage}</p>
                    <img src={job.blueprint} alt="Blueprint" />
                    <p>Needed:</p>
                    <ul>{job.fields.map((field) => (
                        <li key={field.id}>
                            <p>{field.job_title}</p>
                        </li>
                    ))}</ul>
                    <p>Status: {job.open ? 'Open' : job.complete ? 'Complete' : 'Closed'}</p>
                    {!job.open ? <p>{subOnJob(job)}</p> : <Link to={`/bids/${job.id}`}>Bids</Link>}
                    <p>{isPrimary === "false" ? <button onClick={() => setModalVisible({ visible: true, associatedJob: job })}>Make Bid</button> : ""}</p>
                    <p>-----------------------------------</p>
                </li>
            ))}</ul>
            <div>{makeBidModalJSX()}</div>
        </>
    )
}


export default JobList