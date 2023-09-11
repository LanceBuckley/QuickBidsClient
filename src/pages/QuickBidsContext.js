import React, { createContext, useContext, useState } from "react"

// Create the context variable using createContext
const QuickBidsContext = createContext()

// Code as normal, all things data related, useState, useEffect, etc. Make sure to pass children as a parameter
const QuickBidsProvider = ({ children }) => {


    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [isAdmin, setIsAdminState] = useState(localStorage.getItem('quickbids_admin'))
    const [isPrimary, setIsPrimaryState] = useState(localStorage.getItem('is_primary'))

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }

    const setIsAdmin = (isStaff) => {
        localStorage.setItem('quickbids_admin', isStaff)
        setIsAdminState(isStaff)
    }

    const setIsPrimary = (isPrimary) => {
        localStorage.setItem('is_primary', isPrimary)
        setIsPrimaryState(isPrimary)
    }

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <QuickBidsContext.Provider
            value={{ token, isAdmin, isPrimary, setToken, setIsAdmin, setIsPrimary }}
        >
            {children}
        </QuickBidsContext.Provider>
    )
}

export default QuickBidsProvider

// Export a custom hook so the child can access this component
export const useQuickBids = () => useContext(QuickBidsContext)

