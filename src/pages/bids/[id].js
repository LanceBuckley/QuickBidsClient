import React, { useEffect, useState } from "react"
import { getBidsForJob, updateBid } from "../../managers/bidManager"
import { Navbar } from "../../components/nav/NavBar"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import { Link } from "gatsby"
import { getJob, updateJob } from "../../managers/jobManager"

const BidsList = (request, response) => {
    const id = parseInt(request.params.id)
    const [bids, setBids] = useState([])
    const [job, setJob] = useState({})

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
            contractor: bid.contractor.id,
            rate: bid.rate,
            accepted: true,
            is_request: false
        }

        const jobCopy = {...job}
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
            {bids.length !== 0 ? bids.map((bid) => (
                <div key={bid.id}>
                    <h1>{bid.contractor.company_name}</h1>
                    <h2>{bid.rate}</h2>
                    <Link to="/"><button onClick={() => {handleAccept(bid)}}>Accept</button></Link>
                </div>
            )) : <h1>No Bids</h1>}
        </>
    )
}

export default BidsList