import React from 'react'

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const fixednavbarStyle = {
        // "position": "fixed",
        // "top": "0px",
        "width": "100%",
        "zIndex": "1",
        "boxShadow": "0px 0px 9px 5px black",
    }

    const navigateTo = useNavigate()

    const logoutUser = () => {
        sessionStorage.clear();
        navigateTo("/");
        console.log("Signing");
    }

    const aboutUser = () => {
        navigateTo("/user");
    }

    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={fixednavbarStyle}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><strong>Spend Well</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {
                            (sessionStorage.getItem("token") && sessionStorage.getItem("user")) ?
                                <>
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase()}>Home</Link>
                                    </li>
                                    {
                                        sessionStorage.getItem("role").toLowerCase() === "customer" ?
                                            <>
                                                <li className="nav-item px-lg-2 px-md-1 px-0">
                                                    <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/accounts"}>Accounts</Link>
                                                </li>
                                                <li className="nav-item px-lg-2 px-md-1 px-0">
                                                    <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/categories"}>Categories</Link>
                                                </li>
                                                <li className="nav-item px-lg-2 px-md-1 px-0">
                                                    <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/incomes"}>Incomes</Link>
                                                </li>
                                                <li className="nav-item px-lg-2 px-md-1 px-0">
                                                    <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/expenses"}>Expenses</Link>
                                                </li>
                                            </> :
                                            <>
                                                <li className="nav-item px-lg-2 px-md-1 px-0">
                                                    <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/users"}>Users</Link>
                                                </li>
                                                <li className="nav-item px-lg-2 px-md-1 px-0">
                                                    <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/statistics"}>Statistics</Link>
                                                </li>
                                            </>
                                    }
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="nav-link text-black fw-semibold" aria-current="page" to={"./dashboard/" + sessionStorage.getItem("role").toLowerCase() + "/notes"}>Notes</Link>
                                    </li>
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="nav-link text-black fw-semibold" to={"/about"}>About Us</Link>
                                    </li>
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="nav-link text-black fw-semibold" aria-current="page" to="mailto:sanjayasukhwani@gmail.com">Contact Us</Link>
                                    </li>
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="fw-semibold btn btn-danger" to="/" onClick={logoutUser}>Logout</Link>
                                    </li>
                                </> : <>
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="nav-link text-black fw-semibold" to={"/about"}>About Us</Link>
                                    </li>
                                    <li className="nav-item px-lg-2 px-md-1 px-0">
                                        <Link className="nav-link text-black fw-semibold" aria-current="page" to="mailto:sanjayasukhwani@gmail.com">Contact Us</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
