import React, { useContext, useEffect } from 'react'

import MyContext from '../Context/MyContext'
import AccountItem from './Items/AccountItems';
import AdminHeader from './Items/AdminHeader';
import CustomerHeader from './Items/CustomerHeader';
import { useNavigate } from 'react-router-dom';

function AccountPage() {

    const contextData = useContext(MyContext)
    
    const navigateTo = useNavigate()

    const FetchSumUpAgain = () => {
        console.log("Category Item Deleted !!");
        contextData.FetchSumUpBalance(sessionStorage.getItem("token"));
    }
    const FetchCategoryAgain = () => {
        console.log("Category Item Deleted !!");
        contextData.FetchAllCategories(sessionStorage.getItem("token"));
    }
    const FetchTransactionsAgain = () => {
        contextData.FetchAllTransactions(sessionStorage.getItem("token"));
    }

    useEffect(() => {

        if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token")) {

            sessionStorage.clear()

            contextData.showAlert("Failed", "Your Are Not Logged In, Kindly Log In into Your Account", "alert-danger")
            navigateTo("/");

        }
        else if (sessionStorage.getItem("role").toLowerCase() !== "customer") {   
            contextData.showAlert("Unauthorize", "You Are Not Allowed to Access this Page", "alert-danger")
            navigateTo("/");
        }
        else {
        // Fetch account balance only when the component mounts
        contextData.FetchSumUpBalance(sessionStorage.getItem("token"));

        // Fetch all Transactions only when the component mounts
        contextData.FetchAllAccounts(sessionStorage.getItem("token"));

        console.log(contextData.allAccounts)
        }

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <>
            {
                sessionStorage.getItem("role")!==null && sessionStorage.getItem("role").toLowerCase() === "admin" ?
                    <AdminHeader contextData={contextData} /> :
                    <CustomerHeader contextData={contextData} />
            }

            <h3 className='text-white my-2 mx-3'>Your Accounts</h3>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-3">
                {
                    contextData.allAccounts && contextData.allAccounts["accounts"].map(
                        (account, index) => {
                            return <AccountItem key={index} data={account} itemNo={index}  updateFetchSumUp={FetchSumUpAgain} updateCategories={FetchCategoryAgain} updateTransactions={FetchTransactionsAgain} />
                        }
                    )

                }
            </div>
        </>
    )
}

export default AccountPage
