import React from "react"
import { useRef } from "react"
import "./NavBar.css"
import Logo from "../../images/Logo.png"
import { useQuickBids } from "../../context/QuickBidsContext"
import { Link } from "gatsby"

export const PrimaryNav = () => {
    const { token, setToken } = useQuickBids()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle("is-active");
        navbar.current.classList.toggle("is-active");
    };

    return (
        <nav
            className="navbar is-success mb-3"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={Logo} height="45rem" alt="Quick Logo" />{" "}
                    <h1 className="title is-4">QuickBids</h1>
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={showMobileNavbar}
                    ref={hamburger}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {token ? (
                        <>
                            <Link to="/jobs/NewJob">New Job</Link>
                            <Link to="/subs/SubsList">Sub Contractors</Link>
                        </>
                    ) : (
                        ""
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/">
                                <button
                                    className="button is-outlined"
                                    onClick={() => {
                                        setToken("")
                                        localStorage.removeItem("primary_contractor")
                                    }}
                                >Logout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
