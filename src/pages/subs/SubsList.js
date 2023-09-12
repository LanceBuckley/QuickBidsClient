import React, { useEffect, useState } from "react"
import { getSubContractors } from "../../managers/userManager"
import { Link } from "gatsby"

const SubsList = () => {
    const [Subs, setSubs] = useState([])

    useEffect(() => {
        getSubContractors()
            .then((users) => setSubs(users))
    }, [])

    return (
        <>
        <h1>Sub Contractors</h1>
            <ul>{Subs.map((sub) => (
                <li key={sub.id}>
                    <Link to={`/${sub.id}`}>{sub.company_name}</Link>
                </li>
            ))}</ul>
        </>
    )
}


export default SubsList