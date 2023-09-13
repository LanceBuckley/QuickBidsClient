import React, { useEffect, useState } from "react"
import { getBidsForJob } from "../../managers/bidManager"
import { Navbar } from "../../components/nav/NavBar"
import { QuickBidsProvider } from "../../context/QuickBidsContext"

const BidsList = (request, response) => {
    const id = parseInt(request.params.id)
    const [bids, setBids] = useState([])

    useEffect(() => {
        getBidsForJob(id)
            .then((jobBids) => setBids(jobBids))
    }, [])

    return (
        <>
            <QuickBidsProvider>
                <Navbar />
            </QuickBidsProvider>
            {bids.length !== 0 ? bids.map((bid) => (
                <div key={bid.id}>
                    <h1>{bid.contractor.company_name}</h1>
                    <h2>{bid.rate}</h2>
                    <button>Accept</button>
                </div>
            )) : <h1>No Bids</h1>}
        </>
    )
}

export default BidsList