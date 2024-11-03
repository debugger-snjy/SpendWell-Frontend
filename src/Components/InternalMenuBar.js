import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../Context/MyContext';

function InternalMenuBar() {

    const contextData = useContext(MyContext)

    let user = "";

    if (sessionStorage.getItem("user")) {
        user = JSON.parse(sessionStorage.getItem("user"))
        // console.log("Internal : ", user)
    }
    else {
        // console.log("Logout User !!")
        navigateTo("/")
    }

    // Function to call when the user clicks on the logout button
    const logoutUser = () => {
        sessionStorage.clear()
    }

    return (
        <>
            <div className="row mt-3 menuBar">
                <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-5 col-xl-6 col-xxl-3 mt-2">
                    <h1 id='userName' className='menutextStyle'>Welcome {user.username} {user.role === "faculty" ? user.gender === "female" ? "Mam" : "Sir" : ""} 👋</h1>
                </div>
                <div className="col-xsm-12 col-sm-12 col-md-12 col-lg-7 col-xl-6 col-xxl-9 text-left" >
                    <div className="row flex-row-reverse">
                        <div className={`col-md-12 col-lg-2 menutextStyle mt-2`}><Link to="/" onClick={logoutUser}>Logout</Link></div>
                        <div className={`col-md-12 col-lg-2 menutextStyle mt-2`}><Link to={`/dashboard/${sessionStorage.getItem("role")}/profile`}>View Profile</Link></div>
                        <div className={`col-md-12 col-lg-3 menutextStyle mt-2`}><Link to={`/dashboard/${sessionStorage.getItem("role")}/profile`}>Manage Accounts</Link></div>
                        <div className={`col-md-12 col-lg-3 menutextStyle mt-2`}><Link to={`/dashboard/${sessionStorage.getItem("role")}/profile`}>Manage Categories</Link></div>
                        <div className={`col-md-12 col-lg-2 menutextStyle mt-2`}><Link to={`/dashboard/${sessionStorage.getItem("role")}/profile`}>Statistics</Link></div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default InternalMenuBar
