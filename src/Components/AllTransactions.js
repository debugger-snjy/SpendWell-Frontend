import React, { useContext, useEffect, useState } from 'react'

import MyContext from '../Context/MyContext'
import AccountItem from './Items/AccountItems';
import TransactionRecordItem from './Items/TransactionRecord';
import AdminHeader from './Items/AdminHeader';
import CustomerHeader from './Items/CustomerHeader';
import { useNavigate } from 'react-router-dom';

function AllTransactionPage() {

    const contextData = useContext(MyContext)
    const navigateTo = useNavigate()

    const [FilteredRecords, setFilteredRecords] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)

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

    const applyFilter = () => {

        const filterCategory = document.getElementById("filterCategory").value;
        console.log(filterCategory);
        const filterAccount = document.getElementById("filterAccount").value;
        console.log(filterAccount);
        const filterDesc = document.getElementById("filterDesc").value;
        console.log(filterDesc);
        const filterMinAmount = document.getElementById("filterMinAmount").value;
        console.log(filterMinAmount);
        const filterMaxAmount = document.getElementById("filterMaxAmount").value;
        console.log(filterMaxAmount);

        let CategoryMatches;
        let AccountMatches;
        let DescMatches;
        let MinAmountMatches;
        let MaxAmountMatches;

        const filteredResult = contextData.allTransactions["allTransactions"].filter((item) => {
            console.log("Item : ", item);
            if (filterCategory !== "") {
                CategoryMatches = item.category.includes(filterCategory)
                console.log("Check it CategoryMatches : ", CategoryMatches)
            }
            if (filterAccount !== "") {
                AccountMatches = item.account.includes(filterAccount)
                console.log("Check it AccountMatches : ", AccountMatches)
            }
            if (filterDesc !== "") {
                DescMatches = item.desc.includes(filterDesc)
                console.log("Check it DescMatches : ", DescMatches)
            }
            if (filterMinAmount !== "" && filterMaxAmount !== "") {
                MinAmountMatches = parseInt(item.amount) >= parseInt(filterMinAmount) && parseInt(item.amount) <= parseInt(filterMaxAmount);
                MaxAmountMatches = parseInt(item.amount) >= parseInt(filterMinAmount) && parseInt(item.amount) <= parseInt(filterMaxAmount);
            }
            else {
                if (filterMinAmount !== "") {
                    console.log("FIlter Iteme : ", item)
                    MinAmountMatches = parseInt(item.amount) >= parseInt(filterMinAmount);
                    console.log("Check it MinAmountMatches : ", MinAmountMatches)
                }
                if (filterMaxAmount !== "") {
                    console.log("FIlter Iteme : ", item)
                    MaxAmountMatches = parseInt(item.amount) <= parseInt(filterMaxAmount);
                    console.log("Check it MaxAmountMatches : ", MaxAmountMatches)
                }
            }

            console.log("Final Check Value : ", filterCategory, " :", (CategoryMatches || filterCategory == "all"))
            console.log("Final Check Value : ", filterAccount, " :", (AccountMatches || filterAccount == "all"))
            console.log("Final Check Value : ", filterDesc, " :", (DescMatches || filterDesc == ""))
            console.log("Final Check Value : ", filterMinAmount, " :", (MinAmountMatches || filterMinAmount == ""))
            console.log("Final Check Value : ", filterMaxAmount, " :", (MaxAmountMatches || filterMaxAmount == ""))

            console.log("Final : ", item, (CategoryMatches || filterCategory == "all") && (AccountMatches || filterAccount == "all") && (DescMatches) && (MinAmountMatches) && (MaxAmountMatches))

            return (CategoryMatches || filterCategory == "all") && (AccountMatches || filterAccount == "all") && (DescMatches || filterDesc == "") && (MinAmountMatches || filterMinAmount == "") && (MaxAmountMatches || filterMaxAmount == "")

        });

        setIsFiltered(true);
        setFilteredRecords(filteredResult)
    }

    const clearAllFilters = () => {
        document.getElementById("filterForm").reset()
        setIsFiltered(false);
        setFilteredRecords([])
    }

    return (
        <>

            {
                sessionStorage.getItem("role")!==null && sessionStorage.getItem("role").toLowerCase() === "admin" ?
                    <AdminHeader contextData={contextData} /> :
                    <CustomerHeader contextData={contextData} />
            }

            <h3 className='text-white my-2 mx-3'>All Transactions</h3>

            {/* Filter Section */}
            <div className="my-2 mx-3">
                <div id='filterContainer' className='bg-light p-3 m-2 mt-4' style={{ borderRadius: "10px" }}>
                    <form id='filterForm'>
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg">
                                <label htmlFor="filterCategory" className="form-label text-black fw-bold">Category</label>
                                <select className="form-select text-white fw-bold" id="filterCategory" required onChange={() => { applyFilter() }} style={{ backgroundColor: "#1e1e1e" }}>
                                    <option value={"all"}>All</option>
                                    {
                                        // TODO : Add an Alternative if no Category is Added
                                        contextData.allCategories && contextData.allCategories["categories"].map(
                                            (category, index) => {
                                                return <option key={index} value={category.categoryName}>
                                                    {category.categoryName}
                                                </option>
                                            }
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg">
                                <label htmlFor="filterAccount" className="form-label text-black fw-bold">Accounts</label>
                                <select className="form-select text-white fw-bold" id="filterAccount" required onChange={() => { applyFilter() }} style={{ backgroundColor: "#1e1e1e" }}>
                                    <option value={"all"}>All</option>
                                    {
                                        // TODO : Add an Alternative if no Category is Added
                                        contextData.allAccounts && contextData.allAccounts["accounts"].map(
                                            (account, index) => {
                                                return <option key={index} value={account.accountName}>
                                                    {account.accountName}
                                                </option>
                                            }
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg">
                                <label htmlFor="filterDesc" className="form-label text-black fw-bold">Description</label>
                                <input type="text" className="form-control text-white fw-bold" id="filterDesc" name="filterDesc" style={{ backgroundColor: "#1e1e1e" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg">
                                <label htmlFor="filterMinAmount" className="form-label text-black fw-bold">Minimum Amount</label>
                                <input type="text" className="form-control text-white fw-bold" id="filterMinAmount" name="filterMinAmount" style={{ backgroundColor: "#1e1e1e" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg">
                                <label htmlFor="filterMaxAmount" className="form-label text-black fw-bold">Maximum Amount</label>
                                <input type="text" className="form-control text-white fw-bold" id="filterMaxAmount" name="filterMaxAmount" style={{ backgroundColor: "#1e1e1e" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3 text-center align-baseline">
                                <label id="filterRecordsCount" className='text-center form-label fw-bold' style={{ "color": FilteredRecords.length === 0 ? "darkred" : "darkgreen" }}>
                                    {isFiltered ? `${FilteredRecords.length} Records Found From Your Filter !` : "No Filters Applied"}
                                </label>
                                <button type='button' className="w-100 text-center btn btn-danger fw-bold border-2 border-black" onClick={clearAllFilters}>Clear Filter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-3">
                {
                    !isFiltered && contextData.allTransactions && contextData.allTransactions["allTransactions"].map((transaction, index) => {
                        return (
                            <div key={index}>
                                <TransactionRecordItem data={transaction} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-3">

                {
                    isFiltered && FilteredRecords.length !== 0 && FilteredRecords.map((transaction, index) => {
                        return (
                            <div key={index}>
                                <TransactionRecordItem data={transaction} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="mx-3 my-2 text-center">

                {
                    isFiltered && FilteredRecords.length == 0 && <h2 className='text-danger'>No transactions Found with this Filters</h2>
                }
            </div>

        </>
    )
}

export default AllTransactionPage
