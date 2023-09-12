import React, { useEffect, useState } from "react"
import { getASubContractor } from "../../managers/userManager"

const SubDetails = (request, response) => {
    const id = parseInt(request.params.id)
    const [sub, setSub] = useState([])
    
    useEffect(() => {
        if (id) {
            getASubContractor(id)
                .then((user) => setSub(user))
        }

    }, [id])

    return (
        <>
            <h1>{sub.company_name}</h1>
            <p>{sub.first_name}</p>
            <p>{sub.last_name}</p>
            <p>{sub.phone_number}</p>
        </>
    )
}


export default SubDetails