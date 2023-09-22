import React, { useEffect, useState } from "react"
import { getBidsForJob, updateBid } from "../../managers/bidManager"
import { Navbar } from "../../components/nav/NavBar"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import { Link } from "gatsby"
import { getJob, updateJob } from "../../managers/jobManager"
import "./BidList.css"

const BidsList = (request, response) => {
    const id = parseInt(request.params.id)
    const [bids, setBids] = useState([])
    const [job, setJob] = useState({})
    const isPrimary = localStorage.getItem("is_primary")

    useEffect(() => {
        getBidsForJob(id)
            .then((jobBids) => setBids(jobBids))

        getJob(id)
            .then((job) => setJob(job))
    }, [])


    const handleAccept = (bid) => {
        const bidPutBody = {
            id: bid.id,
            job: bid.job.id,
            primary: bid.primary_contractor.id,
            sub: bid.sub_contractor.id,
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
    }

    return (
        <>
            <QuickBidsProvider>
                <Navbar />
            </QuickBidsProvider>
            <div className="title">
                <div>
                    <h1 className="job-name">{job.name}</h1>
                    <h2 className="job-contractor">{job.contractor?.company_name}</h2>
                </div>
            </div>
            <div className="bid-container">
            {bids.length !== 0 ? bids.map((bid) => (
                <div key={bid.id}>
                    <h2 className="label">{bid.sub_contractor.company_name}</h2>
                    <div className="bid-rate-container">
                        <p>Rate Per Hour</p>
                        <h3 className="bid-rate">{bid.rate}</h3>
                    </div>
                    {isPrimary === "true" && bid.is_request === false ? <Link to="/"><button className="button is-primary" onClick={() => { handleAccept(bid) }}>Accept</button></Link> : ""}
                </div>
            )) : <h1>No Bids</h1>}
            </div>
        </>
    )
}

export default BidsList