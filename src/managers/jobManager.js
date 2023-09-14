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

export const getMyOpenJobs = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs?contractor=${id}&open=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}

export const getJob = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs/${id}`, {
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

export const getCompleteJobs = async () => {
    const res = await fetch(`http://localhost:8000/jobs?complete=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}

export const getACompleteJob = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs/${id}?complete=true`, {
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
    return res
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

export const updateJob = (jobBody) => {
    fetch(`http://localhost:8000/jobs/${jobBody.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(jobBody)
    })
}