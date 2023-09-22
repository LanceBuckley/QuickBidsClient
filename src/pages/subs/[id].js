import React, { useEffect, useState } from "react"
import { getASubContractor, getCurrentUser } from "../../managers/userManager"
import { createBid, getAcceptedSubBids } from "../../managers/bidManager"
import { getACompleteJob, getMyOpenJobs } from "../../managers/jobManager"
import "./SubDetails.css"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import { Navbar } from "../../components/nav/NavBar"

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
        setCompleteJobs()
    }, [bids])

    useEffect(() => {
        getMyOpenJobs(currentUser[0].id)
            .then((jobs) => setMyJobs(jobs))
    }, [currentUser])

    const setCompleteJobs = async () => {
        if (bids.length !== 0) {
            const completeJobBids = bids.filter((bid) => bid.job.complete === true)
            const jobPromises = completeJobBids.map((bid) => getACompleteJob(bid.job.id))
            const completeJobs = await Promise.all(jobPromises)
            setJobs(completeJobs)
        }
    }

    const findBidRate = (job) => {
        const currentBid = bids.filter((bid) => job.id === bid.job.id)
        return currentBid[0].rate
    }

    const completedJobJSX = () => {
        if (jobs.length !== 0) {
            return (
                <>
                    <div className="job-container">
                        <h2 className="job-title">Completed Jobs</h2>
                    </div>
                    <div className="job-container">
                        {jobs.map((job) => (
                            <div className="job-container">
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
                                    <div className="bid-rate-container">
                                        <p className="label">Rate Per Hour</p>
                                        <h3 className="bid-rate">{findBidRate(job)}</h3>
                                    </div>
                                    <img src={job.blueprint} alt="Blueprint" />
                                </li>
                            </div>
                        ))}
                    </div>
                </>
            )
        }
        return <div className="job-container">
            <div className="job-title">No Completed Jobs</div>
        </div>
    }

    const handleRequest = async () => {
        const newBidRequest = {
            primary: currentUser[0].id,
            sub: id,
            job: bidRequest.job_id,
            rate: bidRequest.rate,
            is_request: true
        }

        await createBid(newBidRequest)
        const copy = { ...bidRequest }
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
                                onClick={() => handleRequest()}
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
            <QuickBidsProvider>
                <Navbar />
            </QuickBidsProvider>
            <h1 className="title">{sub.company_name}</h1>
            <div className="container">
                <div className="contractor-container">
                    <div className="contractor">
                        <p className="label">{sub.full_name}</p>
                        <p className="label">{sub.phone_number}</p>
                    </div>
                </div>
                <ul>{completedJobJSX()}</ul>
                <div className="button-container">
                    <button className="button is-primary" onClick={() => setModalVisible(true)}>Request</button>
                </div>
                <div>{bidRequestModalJSX()}</div>
            </div>
        </>
    )
}


export default SubDetails