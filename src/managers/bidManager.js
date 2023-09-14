export const getAcceptedSubBids = async (id) => {
    const res = await fetch(`http://localhost:8000/bids?contractor=${id}&accepted=True`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}

export const getJobAcceptedBids = async (id) => {
    const res = await fetch(`http://localhost:8000/bids?job=${id}&accepted=True`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
        return await res.json()
}

export const createBid = async (bidBody) => {
    const res = await fetch(`http://localhost:8000/bids`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(bidBody)
    })
    return await res.json()
}

export const updateBid = (bidBody) => {
    fetch(`http://localhost:8000/bids/${bidBody.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(bidBody)
    })
}

export const getBidsForJob = async (id) => {
    const res = await fetch(`http://localhost:8000/bids?job=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
        return await res.json()
}

export const getMyBidRequests = async (id) => {
    const res = await fetch(`http://localhost:8000/bids?contractor=${id}&request=True`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
        return await res.json()
}