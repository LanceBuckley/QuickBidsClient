import React, { useEffect, useState } from "react"
import { getBidsForJob, updateBid } from "../../managers/bidManager"
import { Navbar } from "../../components/nav/NavBar"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import { Link } from "gatsby"
import { getJob, updateJob } from "../../managers/jobManager"
import { getCurrentUser } from "../../managers/userManager"

const BidsList = (request, response) => {
    const id = parseInt(request.params.id)
    const [bids, setBids] = useState([])
    const [job, setJob] = useState({})
    const [currentUser, setCurrentUser] = useState([{ id: 0 }])
    const isPrimary = localStorage.getItem("is_primary")

    useEffect(() => {
        getBidsForJob(id)
            .then((jobBids) => setBids(jobBids))

        getJob(id)
            .then((job) => setJob(job))
    }, [])

    useEffect(() => {
        getCurrentUser()
            .then((user) => setCurrentUser(user))
    }, [])
    
    const handleAccept = (bid) => {
        const bidPutBody = {
            id: bid.id,
            job: bid.job.id,
            primary: currentUser.id,
            sub: bid.sub_contractor.id,
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
                    <h1>{bid.sub_contractor.company_name}</h1>
                    <h2>{bid.rate}</h2>
                    {isPrimary === "true" && bid.is_request === false ? <Link to="/"><button onClick={() => {handleAccept(bid)}}>Accept</button></Link> : ""}
                </div>
            )) : <h1>No Bids</h1>}
        </>
    )
}

export default BidsList