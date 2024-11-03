import React, { useContext, useEffect } from 'react'

import MyContext from '../Context/MyContext'
import CreateDoughnutChart from './DoughnutChart';
import AdminHeader from './Items/AdminHeader';
import CustomerHeader from './Items/CustomerHeader';
import { useNavigate } from 'react-router-dom';

function StatisticsPage() {

    const contextData = useContext(MyContext)
    const navigateTo = useNavigate()

    useEffect(() => {

        if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token")) {

            sessionStorage.clear()

            contextData.showAlert("Failed", "Your Are Not Logged In, Kindly Log In into Your Account", "alert-danger")
            navigateTo("/");

        }
        else {
            // Fetch account balance only when the component mounts
            contextData.FetchSumUpBalance(sessionStorage.getItem("token"));

            // Fetch all Accounts only when the component mounts
            contextData.FetchAllAccounts(sessionStorage.getItem("token"));

            // Fetch all Transactions only when the component mounts
            contextData.FetchAllTransactions(sessionStorage.getItem("token"));

            // Fetch all Catgeories only when the component mounts
            contextData.FetchAllCategories(sessionStorage.getItem("token"));
        }

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <>

            {
                sessionStorage.getItem("role")!==null && sessionStorage.getItem("role").toLowerCase() === "admin" ?
                    <AdminHeader contextData={contextData} /> :
                    <CustomerHeader contextData={contextData} />
            }

            <h3 className='text-white my-2 mx-2 mb-4'>Your Statistics Data</h3>

            <div className="allStats mx-3 pb-4">
                <div className="row">
                    <div className="statsSection col-6 px-5 py-2">
                        <h4 className='mt-3 text-white text-center'>Your Expenses Wise Data</h4>
                        <CreateDoughnutChart datatype="transaction" data={contextData.allTransactions ? contextData.allTransactions["allTransactions"].filter((transaction) => { return transaction["type"] === "expense" }) : []} />
                    </div>
                    <div className="statsSection col-6 px-5 py-2">
                        <h4 className='mt-3 text-white text-center'>Your Incomes Wise Data</h4>
                        <CreateDoughnutChart datatype="transaction" data={contextData.allTransactions ? contextData.allTransactions["allTransactions"].filter((transaction) => { return transaction["type"] === "income" }) : []} />
                    </div>
                    <div className="statsSection col-6 px-5 py-2">
                        <h4 className='mt-3 text-white text-center'>Your Expense Account Wise Data</h4>
                        <CreateDoughnutChart datatype="account" data={contextData.allAccounts ? contextData.allAccounts["accounts"].filter((account) => { return account["accountType"] === "Expense" }) : []} />
                    </div>
                    <div className="statsSection col-6 px-5 py-2">
                        <h4 className='mt-3 text-white text-center'>Your Income Account Wise Data</h4>
                        <CreateDoughnutChart datatype="account" data={contextData.allAccounts ? contextData.allAccounts["accounts"].filter((account) => { return account["accountType"] === "Income" }) : []} />
                    </div>
                    <div className="statsSection col-6 px-5 py-2">
                        <h4 className='mt-3 text-white text-center'>Your Expense Category Wise Data</h4>
                        <CreateDoughnutChart datatype="category" data={contextData.allTransactions ? contextData.getCategoryWiseAmount(contextData.allTransactions["allTransactions"].filter((transaction) => { return transaction["type"] === "expense" })) : []} />
                    </div>
                    <div className="statsSection col-6 px-5 py-2">
                        <h4 className='mt-3 text-white text-center'>Your Income Category Wise Data</h4>
                        <CreateDoughnutChart datatype="category" data={contextData.allTransactions ? contextData.getCategoryWiseAmount(contextData.allTransactions["allTransactions"].filter((transaction) => { return transaction["type"] === "income" })) : []} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticsPage
