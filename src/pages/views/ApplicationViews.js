import React from "react"
import { useQuickBids } from "../../context/QuickBidsContext"
import PrimaryViews from "./PrimaryViews"
import SubViews from "./SubViews"

const ApplicationViews = () => {

    const { isPrimary } = useQuickBids()

    if (isPrimary) {
        return <PrimaryViews />
    }

    return <SubViews />
}

export default ApplicationViews