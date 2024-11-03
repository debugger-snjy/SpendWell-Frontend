import React, { useContext, useEffect, useState } from 'react'

import MyContext from '../Context/MyContext'
import MStatementTransactionRecord from './Items/MStatementTransactionRecord';
import AdminHeader from "./Items/AdminHeader"
import CustomerHeader from "./Items/CustomerHeader"
import { useNavigate } from 'react-router-dom';

function MiniStatementPage() {

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
        else if (sessionStorage.getItem("role").toLowerCase() !== "customer") {
            contextData.showAlert("Unauthorize", "You Are Not Allowed to Access this Page", "alert-danger")
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
        console.log("Filter Check : ", filterCategory);
        const filterAccount = document.getElementById("filterAccount").value;
        console.log("Filter Check : ", filterAccount);
        const filterDesc = document.getElementById("filterDesc").value;
        console.log("Filter Check : ", filterDesc);
        const filterMinAmount = document.getElementById("filterMinAmount").value;
        console.log("Filter Check : ", filterMinAmount);
        const filterMaxAmount = document.getElementById("filterMaxAmount").value;
        console.log("Filter Check : ", filterMaxAmount);
        let filterStartDate = document.getElementById('filterStartDate').value === "" ? document.getElementById('filterStartDate').value : new Date(document.getElementById('filterStartDate').value);
        console.log("Filter Check : ", filterStartDate);
        if (filterStartDate !== "") {
            filterStartDate.setHours(0);
            filterStartDate.setMinutes(0);
        }
        let filterEndDate = document.getElementById('filterEndDate').value === "" ? document.getElementById('filterEndDate').value : new Date(document.getElementById('filterEndDate').value);
        console.log("Filter Check : ", filterEndDate);
        if (filterEndDate !== "") {
            filterEndDate.setHours(23);
            filterEndDate.setMinutes(59);
        }

        let CategoryMatches;
        let AccountMatches;
        let DescMatches;
        let MinAmountMatches;
        let MaxAmountMatches;
        let StartDateMatches;
        let EndDateMatches;

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

            if (filterStartDate !== "" && filterEndDate !== "") {
                StartDateMatches = new Date(item.datetime).getTime() >= filterStartDate.getTime() && new Date(item.datetime).getTime() <= filterEndDate.getTime();
                EndDateMatches = new Date(item.datetime).getTime() >= filterStartDate.getTime() && new Date(item.datetime).getTime() <= filterEndDate.getTime();
            }
            else {
                if (filterStartDate !== "") {
                    console.log("FIlter Iteme : ", item)
                    StartDateMatches = new Date(item.datetime.toString()).getTime() >= filterStartDate.getTime();
                    console.log("Check it StartDateMatches : ", StartDateMatches)
                }
                if (filterEndDate !== "") {
                    console.log("FIlter Iteme : ", item)
                    EndDateMatches = new Date(item.datetime.toString()).getTime() <= filterEndDate.getTime();
                    console.log("Check it EndDateMatches : ", EndDateMatches)
                }
            }

            console.log("Final Check Value : ", filterCategory, " :", (CategoryMatches || filterCategory === "all"))
            console.log("Final Check Value : ", filterAccount, " :", (AccountMatches || filterAccount === "all"))
            console.log("Final Check Value : ", filterDesc, " :", (DescMatches || filterDesc === ""))
            console.log("Final Check Value : ", filterMinAmount, " :", (MinAmountMatches || filterMinAmount === ""))
            console.log("Final Check Value : ", filterMaxAmount, " :", (MaxAmountMatches || filterMaxAmount === ""))
            console.log("Final Check Value : ", filterStartDate, " :", (StartDateMatches || filterStartDate === ""))
            console.log("Final Check Value : ", filterEndDate, " :", (EndDateMatches || filterEndDate === ""))

            console.log("Final : ", item, (CategoryMatches || filterCategory === "all") && (AccountMatches || filterAccount === "all") && (DescMatches) && (MinAmountMatches) && (MaxAmountMatches))

            return (CategoryMatches || filterCategory === "all") && (AccountMatches || filterAccount === "all") && (DescMatches || filterDesc === "") && (MinAmountMatches || filterMinAmount === "") && (MaxAmountMatches || filterMaxAmount === "") && (StartDateMatches || filterStartDate === "") && (EndDateMatches || filterEndDate === "")

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
                sessionStorage.getItem("role") !== null && sessionStorage.getItem("role").toLowerCase() === "admin" ?
                    <AdminHeader contextData={contextData} /> :
                    <CustomerHeader contextData={contextData} />
            }

            <h3 id="heading" className='text-white my-2 mx-3'>Your Mini Statement</h3>

            {/* Filter Section */}
            <div id="filter" className="my-2 mx-3">
                <div id='filterContainer' className='bg-light p-3 m-2 mt-4' style={{ borderRadius: "10px" }}>
                    <form id='filterForm'>
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterCategory" className="form-label text-black fw-bold">Category</label>
                                <select className="form-select text-white fw-bold" id="filterCategory" required onChange={() => { applyFilter() }} style={{ backgroundColor: "#1e1e1e", colorScheme: "light" }}>
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
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterAccount" className="form-label text-black fw-bold">Accounts</label>
                                <select className="form-select text-white fw-bold" id="filterAccount" required onChange={() => { applyFilter() }} style={{ backgroundColor: "#1e1e1e", colorScheme: "light" }}>
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
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterDesc" className="form-label text-black fw-bold">Description</label>
                                <input type="text" className="form-control text-white fw-bold" id="filterDesc" name="filterDesc" style={{ backgroundColor: "#1e1e1e" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterMinAmount" className="form-label text-black fw-bold">Minimum Amount</label>
                                <input type="text" className="form-control text-white fw-bold" id="filterMinAmount" name="filterMinAmount" style={{ backgroundColor: "#1e1e1e" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterMaxAmount" className="form-label text-black fw-bold">Maximum Amount</label>
                                <input type="text" className="form-control text-white fw-bold" id="filterMaxAmount" name="filterMaxAmount" style={{ backgroundColor: "#1e1e1e" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterStartDate" className="form-label text-black fw-bold">Start Date</label>
                                <input type="date" className="form-control text-white fw-bold" id="filterStartDate" name="filterStartDate" style={{ backgroundColor: "#1e1e1e", colorScheme: "dark" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg my-2">
                                <label htmlFor="filterEndDate" className="form-label text-black fw-bold">End Date</label>
                                <input type="date" className="form-control text-white fw-bold" id="filterEndDate" name="filterEndDate" style={{ backgroundColor: "#1e1e1e", colorScheme: "dark" }} onChange={() => { applyFilter() }} required />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg my-2-3 text-center align-baseline">
                                <label id="filterRecordsCount" className='text-center form-label fw-bold' style={{ "color": FilteredRecords.length === 0 ? "darkred" : "darkgreen" }}>
                                    {isFiltered ? `${FilteredRecords.length} Records Found From Your Filter !` : "No Filters Applied"}
                                </label>
                                <button type='button' className="w-100 text-center btn btn-danger fw-bold border-2 border-black" onClick={clearAllFilters}>Clear Filter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div id="allTransactions" style={{ paddingBottom: "100px" }}>
                <div className="row mx-3">
                    {
                        !isFiltered && contextData.allTransactions && contextData.allTransactions["allTransactions"].map((transaction, index) => {
                            return (
                                <div key={index}>
                                    <MStatementTransactionRecord data={transaction} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row mx-3">

                    {
                        isFiltered && FilteredRecords.length !== 0 && FilteredRecords.map((transaction, index) => {
                            return (
                                <div key={index}>
                                    <MStatementTransactionRecord data={transaction} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mx-3 my-2 text-center">

                    {
                        isFiltered && FilteredRecords.length === 0 && <h2 className='text-danger'>No transactions Found with this Filters</h2>
                    }
                </div>
            </div>

            <button id='generateStatement' className='btn btn-light w-50 text-black fw-bold align-middle d-flex justify-content-center align-items-center' style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", height: "50px", boxShadow: "0px 0px 25px 10px black" }} disabled={isFiltered && FilteredRecords.length === 0} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0" />
                </svg>
                <span className="ms-2">Download Statement</span>
            </button>

        </>
    )
}

export default MiniStatementPage
