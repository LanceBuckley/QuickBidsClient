export const getMyJobs = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs?contractor=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}

export const getOpenJobs = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs?open=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}

export const createJob = async (jobBody) => {
    const res = await fetch(`http://localhost:8000/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(jobBody)
    })
    return await res.json()
}