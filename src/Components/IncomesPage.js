import React, { useContext, useEffect } from 'react'
import MyContext from '../Context/MyContext'
import TransactionOperationRecordItem from './Items/TransactionOperationRecord';
import AdminHeader from './Items/AdminHeader';
import CustomerHeader from './Items/CustomerHeader';
import { useNavigate } from 'react-router-dom';

function IncomePage() {

    const contextData = useContext(MyContext)
    const navigateTo = useNavigate()

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
            contextData.FetchAllTransactions(sessionStorage.getItem("token"));

            contextData.FetchAllCategories(sessionStorage.getItem("token"));
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

            <h3 className='text-white my-2 mx-3'>Your Income Transactions</h3>

            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-3'>
                {
                    contextData.allTransactions && contextData.allTransactions["allTransactions"].map((transaction, index) => {
                        if (transaction.type.toLowerCase() === "income") {
                            return (
                                <TransactionOperationRecordItem itemNo={index} data={transaction} key={index} />
                            )
                        }
                    })
                }
            </div>
        </>
    )
}

export default IncomePage
