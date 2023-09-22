import React, { useEffect, useState } from "react"
import { getSubContractors } from "../../managers/userManager"
import { Link } from "gatsby"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import { Navbar } from "../../components/nav/NavBar"
import "./SubsList.css"

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
                <h1 className="title">Sub Contractors</h1>
                <div className="contractor-container">
                    <ul className="contractor">{Subs.map((sub) => (
                        <li className="label" key={sub.id}>
                            <Link to={`/subs/${sub.id}`}>{sub.company_name}</Link>
                        </li>
                    ))}</ul>
                </div>
        </>
    )
}


export default SubsList