import React, { useEffect, useState } from "react"
import { getSubContractors } from "../../managers/userManager"
import { Link } from "gatsby"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import { Navbar } from "../../components/nav/NavBar"

const SubsList = () => {
    const [Subs, setSubs] = useState([])

    useEffect(() => {
        getSubContractors()
            .then((users) => setSubs(users))
    }, [])

    return (
        <>
            <QuickBidsProvider>
                <Navbar />
            </QuickBidsProvider>
            <h1>Sub Contractors</h1>
            <ul>{Subs.map((sub) => (
                <li key={sub.id}>
                    <Link to={`/subs/${sub.id}`}>{sub.company_name}</Link>
                </li>
            ))}</ul>
        </>
    )
}


export default SubsList