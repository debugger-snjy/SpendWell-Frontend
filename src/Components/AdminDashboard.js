import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import MyContext from '../Context/MyContext'
import manage_users from "../assests/manage_users.png"
import manage_user from "../assests/manage_user.png"
import all_transaction from "../assests/transactions_2.png"
import statistics from "../assests/statistics.png"
import remainderImg from "../assests/remainder.png"
import AdminHeader from './Items/AdminHeader'

function AdminDashboardPage() {

    const contextData = useContext(MyContext)
    const navigateTo = useNavigate()

    let location = useLocation()

    // Function to Open the Manage User Page
    const openManageUserPage = () => {
        navigateTo(`${location.pathname}/users`)
    }

    // Function to open All the Transactions
    const openAllTransactionPage = () => {
        navigateTo(`${location.pathname}/transactions`)
    }

    // Function to open Statistics Page
    const openStatisticsPage = () => {
        navigateTo(`${location.pathname}/statistics`)
    }

    // Function to open notes page
    const openNotes = () => {
        console.log("This is a Notes Pages")
        navigateTo(`${location.pathname}/notes`)
    }


    useEffect(() => {

        console.log("testing")

        if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token")) {

            sessionStorage.clear()

            contextData.showAlert("Failed", "Your Are Not Logged In, Kindly Log In into Your Account", "alert-danger")
            navigateTo("/");

        }
        else if (sessionStorage.getItem("role").toLowerCase() !== "admin") {
            contextData.showAlert("Unauthorize", "You Are Not Allowed to Access this Page", "alert-danger")
            navigateTo("/");
        }
        else {
            console.log("User Logged in !!");

            // Fetch account balance only when the component mounts
            contextData.FetchSumUpBalance(sessionStorage.getItem("token"));

            // Fetch all Transactions only when the component mounts
            contextData.FetchAllTransactions(sessionStorage.getItem("token"));

            // Fetch all Categories of the User
            contextData.FetchAllCategories(sessionStorage.getItem("token"));

            // Function to fetch all the Income Account Names
            contextData.FetchAllAccounts(sessionStorage.getItem("token"));

            // Function to fetch all the User Data
            contextData.FetchAllUsers(sessionStorage.getItem("token"));
        }
        
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <>
            <AdminHeader contextData={contextData} />

            {/* <hr className='hrStyleNeeded' /> */}

            <h3 className='text-white my-2 mx-2'>Quick Tasks</h3>

            {
                // #region All Operations
            }
            <div className="d-flex my-2 flex-wrap">
                <button type="button" className="btn btn-light my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openManageUserPage}>
                    <img alt='allAccountsIcons Icon' src={manage_user} height="90px" />
                    <div className='my-1 fs-5'><strong>Manage Users</strong></div>
                </button>
                <button type="button" className="btn btn-light my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openAllTransactionPage}>
                    <img alt='allAccountsIcons Icon' src={all_transaction} height="90px" />
                    <div className='my-1 fs-5'><strong>All Transactions</strong></div>
                </button>
                <button type="button" className="btn btn-light my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openStatisticsPage}>
                    <img alt='allAccountsIcons Icon' src={statistics} height="90px" />
                    <div className='my-1 fs-5'><strong>Statistics</strong></div>
                </button>
                <button type="button" className="btn btn-light my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openNotes}>
                    <img alt='allAccountsIcons Icon' src={remainderImg} height="90px" />
                    <div className='my-1 fs-5'><strong>Notes</strong></div>
                </button>
            </div>
        </>
    )
}

export default AdminDashboardPage
