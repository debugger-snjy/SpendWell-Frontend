import React, { useContext, useEffect, useState } from 'react'

import MyContext from '../Context/MyContext'
import NavBreadcrumb from './NavBreadcrumb';
import customerMaleImg from "../assests/male_user.png"
import customerFemaleImg from "../assests/female_user.png"
import AdminHeader from './Items/AdminHeader';
import { useNavigate } from 'react-router-dom';

function UsersPage() {

    const contextData = useContext(MyContext)
    const navigateTo = useNavigate()
    
    const [EditUserRecord, setEditUserRecord] = useState({
        username: '',
        gender: '',
        phone: '',
        email: '',
    })
    const [saveEditChanges, setSaveEditChanges] = useState(false)

    const onChange = (event) => {

        setSaveEditChanges(true);

        // Now, Getting the data that user will be adding and that will be saved on that spot when user add the data
        setEditUserRecord({
            ...EditUserRecord, // This will be the data that is already present
            [event.target.name]: event.target.value
            // Using the above line, it will ADD the data and OVERWRITE if already present
            // Thus, when we write the title, then value of title will be the text that user will write
        })

        console.log("EditUser : ", EditUserRecord)

    }

    useEffect(() => {


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
            // Fetch account balance only when the component mounts
            contextData.FetchSumUpBalance(sessionStorage.getItem("token"));

            // Fetch all Transactions only when the component mounts
            contextData.FetchAllAccounts(sessionStorage.getItem("token"));

            // Fetch All the Users
            contextData.FetchAllUsers(sessionStorage.getItem("token"))

            contextData.FetchAllCategories(sessionStorage.getItem("token"));

            contextData.FetchAllTransactions(sessionStorage.getItem("token"));

        }

    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <>

            <AdminHeader contextData={contextData} />

            {/* <h3 className='text-white my-2 mx-3'>Your Users</h3> */}

            <div className="row allOperations mx-2 mb-5 mt-4 text-white">
                <div className="container">
                    <div className="row gy-4 px-2">
                        {
                            contextData.allUsers && contextData.allUsers["allUsers"].map((customer, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* Card for the user Details */}
                                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4" key={customer.id}>
                                            <div className="card itemCard">
                                                <span className="ribbon">{customer.role}</span>
                                                <img src={customer.gender === "male" ? customerMaleImg : customerFemaleImg} className="card-img-top itemImg" alt="Materials" data-bs-toggle="modal" data-bs-target={`#userInfoModal${index}`} />
                                                <div className="card-body" data-bs-toggle="modal" data-bs-target={`#userInfoModal${index}`}>
                                                    <p className="card-text itemName">{customer.username}</p>
                                                    <div className="card-text small itemName fs-5 fw-normal d-flex justify-content-around mt-2 flex-wrap">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="mx-2 bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                                                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                                                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                                                            </svg>
                                                            {customer.email}
                                                        </div>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="mx-2 bi bi-telephone-fill" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                                            </svg>
                                                            {customer.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='card-footer'>
                                                    <div className="row">
                                                        {/* <div className="col"><button className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target={`userEditModal${index}`}><i className="fa-solid fa-pen" style={{ "color": "#ffffff" }}></i> Edit User</button></div> */}
                                                        <div className="col"><button className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target={`#userEditModal${index}`} onClick={() => { setEditUserRecord(customer) }}><i className="fa-solid fa-pen" style={{ "color": "#ffffff" }}></i> Edit User</button></div>

                                                        <div className="col">

                                                            <button type="button" data-bs-toggle="modal" data-bs-target={`#deleteUserConfirmationModal${index}`} className="btn btn-danger w-100 my-1" ><i className="fa-solid fa-trash" style={{ "color": "#ffffff" }}></i> <span className="px-2" >Delete User</span></button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Info Modal */}
                                        <div className="modal fade dark-modal" id={`userInfoModal${index}`} tabIndex="-1" aria-labelledby={`userInfoModal${index}Label`} aria-hidden="true">
                                            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                                <div className="modal-content  bg-dark text-light">
                                                    <div className="modal-header bg-dark text-light">
                                                        <h1 className="modal-title fs-5" id={`userInfoModal${index}Label`}>{customer.username} Info</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="addAdmincloseBtn" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {/* <!-- Category Tabs --> */}
                                                        <ul className="nav nav-tabs nav-fill" id="categoryTabs" role="tablist">
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link mytab active" id="income-category-tab" data-bs-toggle="tab" data-bs-target={`#incomeCategories${index}`} type="button" role="tab" aria-controls={`incomeCategories${index}`} aria-selected="true">Income Category ({contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "income" }).length})</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link mytab" id="expense-category-tab" data-bs-toggle="tab" data-bs-target={`#expenseCategories${index}`} type="button" role="tab" aria-controls={`expenseCategories${index}`} aria-selected="false">Expense Category ({contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "expense" }).length})</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link mytab" id="income-account-tab" data-bs-toggle="tab" data-bs-target={`#incomeAccounts${index}`} type="button" role="tab" aria-controls={`incomeAccounts${index}`} aria-selected="false">Income Account ({contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "income" }).length})</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link mytab" id="expense-account-tab" data-bs-toggle="tab" data-bs-target={`#expenseAccounts${index}`} type="button" role="tab" aria-controls={`expenseAccounts${index}`} aria-selected="false">Expense Account ({contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "expense" }).length})</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link mytab" id="income-transaction-tab" data-bs-toggle="tab" data-bs-target={`#incomeTransactions${index}`} type="button" role="tab" aria-controls={`incomeTransactions${index}`} aria-selected="false">Income Account ({contextData.allUsers["allUserIncomeTransactions"][index].length})</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link mytab" id="expense-transaction-tab" data-bs-toggle="tab" data-bs-target={`#expenseTransactions${index}`} type="button" role="tab" aria-controls={`expenseTransactions${index}`} aria-selected="false">Expense Account ({contextData.allUsers["allUserExpenseTransactions"][index].length})</button>
                                                            </li>
                                                        </ul>
                                                        {/* <!-- Tab Content --> */}
                                                        <div className="tab-content" id="TabContent">

                                                            {/* <!-- Income Categories Tab Pane --> */}
                                                            <div className="tab-pane fade show active" id={`incomeCategories${index}`} role="tabpanel" aria-labelledby="income-category-tab">
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        {/* <!-- Loop through income categories --> */}
                                                                        {contextData.allUsers["allUserCategory"][index].length === 0 && <tr><td>No Categories are Created</td></tr>}
                                                                        {contextData.allUsers["allUserCategory"][index].length !== 0 && contextData.allUsers["allUserCategory"][index].map((category) => {
                                                                            if (category.categoryType.toLowerCase() === "income") {
                                                                                return (
                                                                                    <tr key={category._id}>
                                                                                        <td>{category.categoryName}</td>
                                                                                    </tr>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* <!-- Expense Categories Tab Pane --> */}
                                                            <div className="tab-pane fade" id={`expenseCategories${index}`} role="tabpanel" aria-labelledby="expense-category-tab">
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        {/* <!-- Loop through expense categories --> */}
                                                                        {contextData.allUsers["allUserCategory"][index].map((category) => {
                                                                            if (category.categoryType.toLowerCase() === "expense") {
                                                                                return (
                                                                                    <tr key={category._id}>
                                                                                        <td>{category.categoryName}</td>
                                                                                    </tr>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* <!-- Income Accounts Tab Pane --> */}
                                                            <div className="tab-pane fade" id={`incomeAccounts${index}`} role="tabpanel" aria-labelledby="income-account-tab">
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        {/* <!-- Loop through income categories --> */}
                                                                        {contextData.allUsers["allUserAccounts"][index].map((account) => {
                                                                            if (account.accountType.toLowerCase() === "income") {
                                                                                return (
                                                                                    <tr key={account._id}>
                                                                                        <td>{account.accountName}</td>
                                                                                        <td align='right'>₹ {account.accountAmount}</td>
                                                                                    </tr>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* <!-- Expense Accounts Tab Pane --> */}
                                                            <div className="tab-pane fade" id={`expenseAccounts${index}`} role="tabpanel" aria-labelledby="expense-account-tab">
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        {/* <!-- Loop through expense categories --> */}
                                                                        {contextData.allUsers["allUserAccounts"][index].map((account) => {
                                                                            if (account.accountType.toLowerCase() === "expense") {
                                                                                return (
                                                                                    <tr key={account._id}>
                                                                                        <td>{account.accountName}</td>
                                                                                        <td align='right'>₹ {account.accountAmount}</td>
                                                                                    </tr>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* <!-- Income transactions Tab Pane --> */}
                                                            <div className="tab-pane fade" id={`incomeTransactions${index}`} role="tabpanel" aria-labelledby="income-transaction-tab">
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        {/* <!-- Loop through income categories --> */}
                                                                        {contextData.allUsers["allUserIncomeTransactions"][index].map((transaction) => {
                                                                            return (
                                                                                <tr key={transaction._id}>
                                                                                    <td>{transaction.incomeDescription}</td>
                                                                                    <td align='right'>₹ {transaction.incomeAmount}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* <!-- Expense transactions Tab Pane --> */}
                                                            <div className="tab-pane fade" id={`expenseTransactions${index}`} role="tabpanel" aria-labelledby="expense-transaction-tab">
                                                                <table className="table table-striped">
                                                                    <tbody>
                                                                        {/* <!-- Loop through expense categories --> */}
                                                                        {contextData.allUsers["allUserExpenseTransactions"][index].map((transaction) => {
                                                                            return (
                                                                                <tr key={transaction._id}>
                                                                                    <td>{transaction.expenseDescription}</td>
                                                                                    <td align='right'>₹ {transaction.expenseAmount}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer bg-dark">
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Edit Modal */}
                                        <div className="modal fade dark-modal" id={`userEditModal${index}`} tabIndex="-1" aria-labelledby={`userEditModal${index}Label`} aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content bg-dark text-light">
                                                    <div className="modal-header bg-dark text-light">
                                                        <h1 className="modal-title fs-5" id={`userEditModal${index}Label`}>Edit User Form</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" id="editUsercloseBtn" aria-label="Close" onClick={() => { document.getElementById("EditUserForm").reset(); setSaveEditChanges(false); }}></button>
                                                    </div>

                                                    {/* Form For Adding the User Data */}
                                                    <form id='EditUserForm'>
                                                        <div className="modal-body">
                                                            <div className="mb-3">
                                                                <label htmlFor="updatedusername" className="form-label">Customer Username</label>
                                                                <input type="text" className="form-control text-black fw-bold" id="updatedusername" name="username" onChange={onChange} value={EditUserRecord.username} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="updateduseremail" className="form-label">Customer Email Address</label>
                                                                <input type="email" className="form-control text-black fw-bold" id="updateduseremail" name="email" onChange={onChange} value={EditUserRecord.email} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="updateduserphone" className="form-label">Phone Number</label>
                                                                <input type="number" className="form-control text-black fw-bold" id="updateduserphone" name="phone" onChange={onChange} value={EditUserRecord.phone} maxLength={10} required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="updatedusergender" className="form-label">Gender</label>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="gender" id="updatedgenderMale" value="male" onChange={onChange} checked={EditUserRecord.gender == "male" ? true : false} required />
                                                                    <label className="form-check-label" htmlFor="updatedgenderMale">
                                                                        Male
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="gender" id="updatedgenderFemale" value="female" onChange={onChange} checked={EditUserRecord.gender == "female" ? true : false} required />
                                                                    <label className="form-check-label" htmlFor="updatedgenderfemale">
                                                                        Female
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="modal-footer bg-dark">
                                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { document.getElementById("EditUserForm").reset(); setSaveEditChanges(false); }}>Close</button>
                                                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => { contextData.editUser(customer._id, EditUserRecord) }} disabled={!saveEditChanges}>Save Changes</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 
                                            // #region Delete Modal
                                        */}
                                        {/* Delete Confirmation Message */}

                                        <div className="modal fade" id={`deleteUserConfirmationModal${index}`} tabIndex="-1" aria-labelledby={`deleteUserConfirmationModalLabel${index}`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content bg-dark text-light">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id={`deleteUserConfirmationModalLabel${index}`}>Delete '<strong>{customer.username}</strong>' ?</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Are You sure You want to Delete
                                                        <br />
                                                        {
                                                            (contextData.allUsers["allUserCategory"][index].length > 0 ||
                                                                contextData.allUsers["allUserAccounts"][index].length > 0 ||
                                                                contextData.allUsers["allUserIncomeTransactions"][index].length > 0 ||
                                                                contextData.allUsers["allUserExpenseTransactions"][index].length > 0) ? "This User have " : "This User have No Items Created"
                                                        }
                                                        <br />

                                                        <div className="mx-3">
                                                            {
                                                                contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "income" }).length > 0 ? `${contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "income" }).length} Income Category` : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "income" }).length > 0 ? <br /> : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "expense" }).length > 0 ? `${contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "expense" }).length} Expense Category` : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserCategory"][index].filter((category) => { return category.categoryType.toLowerCase() === "expense" }).length > 0 ? <br /> : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "income" }).length > 0 ? `${contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "income" }).length} Income Account` : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "income" }).length > 0 ? <br /> : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "expense" }).length > 0 ? `${contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "expense" }).length} Expense Account` : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserAccounts"][index].filter((account) => { return account.accountType.toLowerCase() === "expense" }).length > 0 ? <br /> : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserIncomeTransactions"][index].length > 0 ? `${contextData.allUsers["allUserIncomeTransactions"][index].length} Income Account` : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserIncomeTransactions"][index].length > 0 ? <br /> : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserExpenseTransactions"][index].length > 0 ? `${contextData.allUsers["allUserExpenseTransactions"][index].length} Expense Account` : ""
                                                            }
                                                            {
                                                                contextData.allUsers["allUserExpenseTransactions"][index].length > 0 ? <br /> : ""
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { contextData.deleteUser(customer._id) }}>Delete User</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div >
                </div>
            </div>
        </>
    )
}

export default UsersPage
