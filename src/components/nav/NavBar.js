import React from "react"
import { useQuickBids } from "../../context/QuickBidsContext"
import { PrimaryNav } from "./PrimaryNav"
import { SubNav } from "./SubNav"

export const Navbar = () => {

    const { isPrimary } = useQuickBids()

    if (isPrimary) {
        return <PrimaryNav />
    }

    return <SubNav />
}
