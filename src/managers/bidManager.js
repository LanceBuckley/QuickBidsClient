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