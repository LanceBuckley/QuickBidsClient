import React from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useQuickBids } from "../../context/QuickBidsContext"
import { Logo } from "../../images/Logo.png"
import { Link } from "gatsby"

export const SubNav = () => {
    const { token, setToken } = useQuickBids()
    const navigate = useNavigate()
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
                    <img src={Logo} height="3rem" alt="Quick Logo" />{" "}
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
                        </>
                    ) : (
                        ""
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {token ? (
                                <button
                                    className="button is-outlined"
                                    onClick={() => {
                                        setToken("")
                                        localStorage.removeItem("primary_contractor")
                                        navigate("/login")
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/register" className="button is-link">
                                        Register
                                    </Link>
                                    <Link to="/login" className="button is-outlined">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
