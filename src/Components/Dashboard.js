import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import MyContext from '../Context/MyContext'
import TransactionRecordItem from './Items/TransactionRecord'
import addIncomeIcon from "../assests/add_income.png"
import addExpenseIcon from "../assests/add_expense.png"
import categoryIcon from "../assests/categories.png"
import allAccountsIcons from "../assests/your_accounts.png"
import manage_income from "../assests/manage_income.png"
import manage_category from "../assests/manage_category.png"
import manage_account from "../assests/manage_account.png"
import manage_expense from "../assests/manage_expense.png"
import all_transaction from "../assests/transactions_2.png"
import mini_statement from "../assests/mini_statement.png"
import statistics from "../assests/statistics.png"
import remainderImg from "../assests/remainder.png"
import AdminHeader from './Items/AdminHeader'
import CustomerHeader from './Items/CustomerHeader'

function DashboardPage() {

    const contextData = useContext(MyContext)
    const navigateTo = useNavigate()

    let location = useLocation()

    // Function to Open the Income Page
    const openIncomesPage = () => {
        navigateTo(`${location.pathname}/incomes`)
    }

    // Function to Open the Expenses Page
    const openExpensesPage = () => {
        navigateTo(`${location.pathname}/expenses`)
    }

    // Function to Open the Category Page
    const openCategoryPage = () => {
        navigateTo(`${location.pathname}/categories`)
    }

    // Function to Open the Account Page
    const openAccountsPage = () => {
        navigateTo(`${location.pathname}/accounts`)
    }

    // Function to open All the Transactions
    const openAllTransactionPage = () => {
        navigateTo(`${location.pathname}/transactions`)
    }

    // Function to open Mini Statement Page
    const openMiniStatement = () => {
        navigateTo(`${location.pathname}/mstatement`)
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
            console.log("User Logged in !!");

            // Fetch account balance only when the component mounts
            contextData.FetchSumUpBalance(sessionStorage.getItem("token"));

            // Fetch all Transactions only when the component mounts
            contextData.FetchAllTransactions(sessionStorage.getItem("token"));

            // Fetch all Categories of the User
            contextData.FetchAllCategories(sessionStorage.getItem("token"));

            // Function to fetch all the Income Account Names
            contextData.FetchAllAccounts(sessionStorage.getItem("token"));

            // For Opening the Add Income Modal
            const incomeModal = document.getElementById('addIncomeModal');

            incomeModal.addEventListener('shown.bs.modal', function () {
                // Get the current date and time in Kolkata timezone
                const currentDate = new Date();
                // const options = { timeZone: 'Asia/Kolkata' };

                // Extract date and time components
                const year = currentDate.getFullYear();
                const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month index
                const day = ('0' + currentDate.getDate()).slice(-2);
                const hours = ('0' + currentDate.getHours()).slice(-2);
                const minutes = ('0' + currentDate.getMinutes()).slice(-2);

                // Construct the formatted date and time string
                const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

                // Set the value of the input field to the formatted date and time
                document.getElementById('incomeDateTime').value = formattedDateTime;

            });

            // For Opening the Add Expense Modal
            const expenseModal = document.getElementById('addExpenseModal');

            expenseModal.addEventListener('shown.bs.modal', function () {
                // Get the current date and time in Kolkata timezone
                const currentDate = new Date();
                // const options = { timeZone: 'Asia/Kolkata' };

                // Extract date and time components
                const year = currentDate.getFullYear();
                const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month index
                const day = ('0' + currentDate.getDate()).slice(-2);
                const hours = ('0' + currentDate.getHours()).slice(-2);
                const minutes = ('0' + currentDate.getMinutes()).slice(-2);

                // Construct the formatted date and time string
                const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

                // Set the value of the input field to the formatted date and time
                document.getElementById('expenseDateTime').value = formattedDateTime;

            });

        }

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <>
            {
                sessionStorage.getItem("role") !== null && sessionStorage.getItem("role").toLowerCase() === "admin" ?
                    <AdminHeader contextData={contextData} /> :
                    <CustomerHeader contextData={contextData} />
            }

            {/* <hr className='hrStyleNeeded' /> */}

            <h3 className='text-white my-2 mx-2'>Quick Tasks</h3>

            {
                // #region All Operations
            }
            <div className="row allOperations mb-5 mt-4 text-white">
                <div className="container">
                    <div className="row gy-3 px-2">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">

                            <button type='button' className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" data-bs-toggle="modal" data-bs-target="#addIncomeModal">
                                <img alt='Add Income Icon' src={addIncomeIcon} height="90px" />
                                <div className='my-1 fs-5'><strong>Add Income</strong></div>
                            </button>
                            {
                                // #region Income Modal
                            }
                            {/* Modal Code for Adding the Income */}
                            <div className="modal fade" id="addIncomeModal" tabIndex="-1" aria-labelledby="addIncomeModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header bg-dark text-light">
                                            <h1 className="modal-title fs-5" id="addIncomeModalLabel">Add Income Form</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='addIncomeModalCloseBtn' aria-label="Close" onClick={() => { document.getElementById("AddIncomeForm").reset(); }}></button>
                                        </div>

                                        {/* Form For Adding the Income Data */}
                                        <form id='AddIncomeForm' onSubmit={
                                            (e) => { e.preventDefault(); contextData.submitMyIncomeRecord(); }
                                        }>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="incomeAmount" className="form-label">Income Amount</label>
                                                    <input type="number" className="form-control text-black fw-bold" id="incomeAmount" min="0" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="incomeDescription" className="form-label">Income Description</label>
                                                    <input type="text" className="form-control text-black fw-bold" id="incomeDescription" minLength="5" min="2" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="incomeCategory" className="form-label">Category</label>
                                                    <select className="form-select text-black fw-bold" id="incomeCategory" required >
                                                        {
                                                            // TODO : Add an Alternative if no Category is Added
                                                            contextData.allCategories && contextData.allCategories["categories"].map(
                                                                (category, index) => {
                                                                    if (category.categoryType.toLowerCase() === "income") {
                                                                        return <option key={index} value={category._id}>
                                                                            {category.categoryName}
                                                                        </option>
                                                                    }
                                                                    return null;
                                                                }
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="incomeAccount" className="form-label">Account From You will Spend</label>
                                                    <select className="form-select text-black fw-bold" id="incomeAccount" required >
                                                        {
                                                            // TODO : Add an Alternative if no account is Added
                                                            contextData.allAccounts && contextData.allAccounts["accounts"].map(
                                                                (account, index) => {
                                                                    if (account.accountType.toLowerCase() === "income") {
                                                                        return <option key={index} value={account._id}>
                                                                            {account.accountName}
                                                                        </option>
                                                                    }
                                                                    return null;
                                                                }
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="incomeDateTime" className="form-label">Date Time</label>
                                                    <input className="form-control text-black fw-bold" type="datetime-local" name="incomeDateTime" id="incomeDateTime" />
                                                </div>
                                            </div>
                                            <div className="modal-footer bg-dark">
                                                <button type="button" className="btn btn-danger" id="addIncomeModalCloseBtn" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddIncomeForm").reset(); }}>Close</button>
                                                <button type="submit" className="btn btn-success">Submit Form</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" data-bs-toggle="modal" data-bs-target="#addExpenseModal">
                                <img alt='Add Expense Icon' src={addExpenseIcon} height="90px" />
                                <div className='my-1 fs-5'><strong>Add Expense</strong></div>
                            </button>

                            {
                                // #region ExpenseModal
                            }
                            {/* Modal Code for Adding the Expense */}
                            <div className="modal fade" id="addExpenseModal" tabIndex="-1" aria-labelledby="addExpenseModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header bg-dark text-light">
                                            <h1 className="modal-title fs-5" id="addExpenseModalLabel">Add Expense Form</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='addExpenseModalCloseBtn' aria-label="Close" onClick={() => { document.getElementById("AddExpenseForm").reset(); }}></button>
                                        </div>

                                        {/* Form For Adding the Expense Data */}
                                        <form id='AddExpenseForm' onSubmit={
                                            (e) => { e.preventDefault(); contextData.submitMyExpenseRecord(); }
                                        }>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="expenseAmount" className="form-label">Expense Amount</label>
                                                    <input type="number" className="form-control text-black fw-bold" id="expenseAmount" min="0" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="expenseDescription" className="form-label">Expense Description</label>
                                                    <input type="text" className="form-control text-black fw-bold" id="expenseDescription" minLength="5" min="2" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="expenseCategory" className="form-label">Category</label>
                                                    <select className="form-select text-black fw-bold" id="expenseCategory" required >
                                                        {
                                                            // TODO : Add an Alternative if no Category is Added
                                                            contextData.allCategories && contextData.allCategories["categories"].map(
                                                                (category, index) => {
                                                                    if (category.categoryType.toLowerCase() === "expense") {
                                                                        return <option key={index} value={category._id}>
                                                                            {category.categoryName}
                                                                        </option>
                                                                    }
                                                                    return null;
                                                                }
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="expenseAccount" className="form-label">Account From You will Spend</label>
                                                    <select className="form-select text-black fw-bold" id="expenseAccount" required >
                                                        {
                                                            // TODO : Add an Alternative if no account is Added
                                                            contextData.allAccounts && contextData.allAccounts["accounts"].map(
                                                                (account, index) => {
                                                                    if (account.accountType.toLowerCase() === "expense") {
                                                                        return <option key={index} value={account._id}>
                                                                            {account.accountName}
                                                                        </option>
                                                                    }
                                                                    return null;
                                                                }
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="expenseDateTime" className="form-label">Date Time</label>
                                                    <input className="form-control text-black fw-bold" type="datetime-local" name="expenseDateTime" id="expenseDateTime" />
                                                </div>
                                            </div>
                                            <div className="modal-footer bg-dark">
                                                <button type="button" className="btn btn-danger" id="addExpenseModalCloseBtn" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddExpenseForm").reset(); }}>Close</button>
                                                <button type="submit" className="btn btn-success">Submit Form</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                                <img alt='categoryIcon Icon' src={categoryIcon} height="90px" />
                                <div className='my-1 fs-5'><strong>Add Category</strong></div>
                            </button>

                            {
                                // #region CategoryModal
                            }
                            {/* Modal Code for Adding the Category */}
                            <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header bg-dark text-light">
                                            <h1 className="modal-title fs-5" id="addCategoryModalLabel">Add Category Form</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='addCategoryModalCloseBtn' aria-label="Close" onClick={() => { document.getElementById("AddCategoryForm").reset(); }}></button>
                                        </div>

                                        {/* Form For Adding the Category Data */}
                                        <form id='AddCategoryForm' onSubmit={
                                            (e) => { e.preventDefault(); contextData.submitMyCategoryRecord(); }
                                        }>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                                                    <input type="text" className="form-control text-black fw-bold" id="categoryName" min="0" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="categoryType" className="form-label">Category Type</label>
                                                    <select className="form-select text-black fw-bold" id="categoryType" required defaultValue={"Income"} >
                                                        <option value="Income">Income</option>
                                                        <option value="Expense">Expense</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer bg-dark">
                                                <button type="button" className="btn btn-danger" id="addCategoryModalCloseBtn" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddCategoryForm").reset(); }}>Close</button>
                                                <button type="submit" className="btn btn-success">Submit Form</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" data-bs-toggle="modal" data-bs-target="#addAccountModal">
                                <img alt='allAccountsIcons Icon' src={allAccountsIcons} height="90px" />
                                <div className='my-1 fs-5'><strong>Add Account</strong></div>
                            </button>

                            {
                                // #region AccountModal
                            }
                            {/* Modal Code for Adding the Account */}
                            <div className="modal fade" id="addAccountModal" tabIndex="-1" aria-labelledby="addAccountModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header bg-dark text-light">
                                            <h1 className="modal-title fs-5" id="addAccountModalLabel">Add Account Form</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='addAccountModalCloseBtn' aria-label="Close" onClick={() => { document.getElementById("AddAccountForm").reset(); }}></button>
                                        </div>

                                        {/* Form For Adding the Account Data */}
                                        <form id='AddAccountForm' onSubmit={
                                            (e) => { e.preventDefault(); contextData.submitMyAccountRecord(); }
                                        }>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="accountName" className="form-label">Account Name</label>
                                                    <input type="text" className="form-control text-black fw-bold" id="accountName" min="0" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="accountType" className="form-label">Account Type</label>
                                                    <select className="form-select text-black fw-bold" id="accountType" required >
                                                        <option value="Income">Income</option>
                                                        <option value="Expense">Expense</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="modal-footer bg-dark">
                                                <button type="button" className="btn btn-danger" id="addAccountModalCloseBtn" data-bs-dismiss="modal" onClick={() => { document.getElementById("AddAccountForm").reset(); }}>Close</button>
                                                <button type="submit" className="btn btn-success">Submit Form</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openAllTransactionPage}>
                                <img alt='allAccountsIcons Icon' src={all_transaction} height="90px" />
                                <div className='my-1 fs-5'><strong>All Transactions</strong></div>
                            </button>

                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openMiniStatement}>
                                <img alt='allAccountsIcons Icon' src={mini_statement} height="90px" />
                                <div className='my-1 fs-5'><strong>Download Mini Statement</strong></div>
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openStatisticsPage}>
                                <img alt='allAccountsIcons Icon' src={statistics} height="90px" />
                                <div className='my-1 fs-5'><strong>Statistics</strong></div>
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-2 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openNotes}>
                                <img alt='allAccountsIcons Icon' src={remainderImg} height="90px" />
                                <div className='my-1 fs-5'><strong>Notes</strong></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='hrStyleNeeded' />

            <h3 className='text-white my-2 mx-2'>Your Last 5 Transactions</h3>

            <div className='last5Transactions my-2 mx-2'>
                {
                    contextData.allTransactions && contextData.allTransactions["allTransactions"].slice(0, 5).map((transaction, index) => {
                        return (
                            <div key={index}>
                                <TransactionRecordItem data={transaction} />
                            </div>
                        )
                    })
                }
                {
                    contextData.allTransactions && contextData.allTransactions["allTransactions"].length == 0 && <div className="text-danger fw-bolder mb-5 fs-4">No Transactions Made till Now !!</div>
                }
            </div>

            <hr className='hrStyleNeeded' />

            <h3 className='text-white my-2 mx-2'>Our Services</h3>

            <div className="row allOperations mb-5 mt-4 text-white">
                <div className="container">
                    <div className="row gy-3 px-2">
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-3 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openIncomesPage}>
                                <img alt='Manage Income Icon' src={manage_income} height="90px" />
                                <div className='my-1 fs-5'><strong>Manage Income Records</strong></div>
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-3 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openExpensesPage}>
                                <img alt='Manage Expense Icon' src={manage_expense} height="90px" />
                                <div className='my-1 fs-5'><strong>Manage Expense Records</strong></div>
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-3 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openCategoryPage}>
                                <img alt='Manage Category Icon' src={manage_category} height="90px" />
                                <div className='my-1 fs-5'><strong>Manage Categories</strong></div>
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
                            <button type="button" className="btn btn-light w-100 my-3 mx-2 flex-fill text-center py-3 operationItemBox" onClick={openAccountsPage}>
                                <img alt='Manage Account Icon' src={manage_account} height="90px" />
                                <div className='my-1 fs-5'><strong>Manage Account</strong></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
