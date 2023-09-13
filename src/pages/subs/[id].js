import React, { useEffect, useState } from "react"
import { getASubContractor, getCurrentUser } from "../../managers/userManager"
import { createBid, getAcceptedSubBids } from "../../managers/bidManager"
import { getACompleteJob, getMyJobs } from "../../managers/jobManager"
import "./RequestModal.css"

const SubDetails = (request, response) => {
    const id = parseInt(request.params.id)
    const [sub, setSub] = useState({})
    const [bids, setBids] = useState([])
    const [jobs, setJobs] = useState([])
    const [myJobs, setMyJobs] = useState([])
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])
    const [modalVisible, setModalVisible] = useState(false)
    const [bidRequest, setBidRequest] = useState({
        rate: 0,
        job_id: 0
    })

    useEffect(() => {
        if (id) {
            getASubContractor(id)
                .then((user) => setSub(user))
        }

        getCurrentUser()
            .then((user) => setCurrentUser(user))

    }, [id])

    useEffect(() => {
        if (sub.id) {
            getAcceptedSubBids(id)
                .then((subBids) => setBids(subBids))
        }
    }, [sub, id])

    useEffect(() => {
        if (bids.length !== 0) {
            bids.map((bid) => getACompleteJob(bid.job.id)
                .then((job) => job.id ? setCompleteJobs(job) : ""))
        }
    }, [bids])

    useEffect(() => {
        getMyJobs(currentUser[0].id)
            .then((jobs) => setMyJobs(jobs))
    }, [currentUser])

    const setCompleteJobs = (job) => {
        const copy = [...jobs]
        copy.push(job)
        setJobs(copy)
    }

    const findBidRate = (job) => {
        const currentBid = bids.filter((bid) => job.id === bid.job.id)
        return currentBid[0].rate
    }

    const completedJobJSX = () => {
        if (jobs.length !== 0) {
            return (
                <>
                    {jobs.map((job) => (
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
                            <p>Rate: {findBidRate(job)}</p>
                            <p>-----------------------------------</p>
                        </li>
                    ))}
                </>
            )
        }
        return <>No Completed Jobs</>
    }

    const handleRequest = async () => {
        const newBidRequest = {
            contractor: id,
            job: bidRequest.job_id,
            rate: bidRequest.rate,
            is_request: true
        }

        await createBid(newBidRequest)
        const copy = {...bidRequest}
        copy.rate = 0
        copy.job_id = 0
        setBidRequest(copy)
        setModalVisible(false)
        window.alert("Request Sent")
    }

    const bidRequestModalJSX = () => {
        return (
            <>
                <div className={`modal ${modalVisible ? "is-active" : ""}`}>
                    <div className="modal-container">
                        <div className="modal-content">
                            <h2 className="modal-title">Request Subcontractor</h2>
                            <input
                                required
                                type="number"
                                value={bidRequest.rate}
                                onChange={(e) =>
                                    setBidRequest({
                                        ...bidRequest,
                                        rate: parseInt(e.target.value),
                                    })
                                }
                            />
                            {myJobs.map((job) => (
                                <div key={job.id}>
                                    <input
                                        required
                                        type="radio"
                                        id={`job-${job.id}`}
                                        value={job.id}
                                        checked={bidRequest.job_id === job.id}
                                        onChange={(e) =>
                                            setBidRequest({
                                                ...bidRequest,
                                                job_id: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                    <label htmlFor={`job-${job.id}`}>{job.name}</label>
                                </div>
                            ))}
                            <button
                                className="modal-btn"
                                onClick={() => handleRequest(bidRequest.rate)}
                            >
                                Ok
                            </button>
                            <button
                                className="modal-btn"
                                onClick={() =>
                                    setModalVisible(false)
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

    return (
        <>
            <h1>{sub.company_name}</h1>
            <p>{sub.first_name}</p>
            <p>{sub.last_name}</p>
            <p>{sub.phone_number}</p>
            <h2>Completed Jobs</h2>
            <ul>{completedJobJSX()}</ul>
            <button onClick={() => setModalVisible(true)}>Request</button>
            <div>{bidRequestModalJSX()}</div>
        </>
    )
}


export default SubDetails