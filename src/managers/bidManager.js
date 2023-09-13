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
    if (res.status !== 404) {
        return await res.json()
    }
    return null
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