import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getASubContractor } from "../../managers/userManager"

const SubDetails = () => {
    const { subId } = useParams()
    const [sub, setSub] = useState([])

    useEffect(() => {
        getASubContractor(subId)
            .then((user) => setSub(user))
    }, [])

    return (
        <>
        <h1>{sub.company_name}</h1>
        <p>{sub.user.first_name}</p>
        <p>{sub.user.last_name}</p>
        <p>{sub.phone_number}</p>
        </>
    )
}


export default SubDetails