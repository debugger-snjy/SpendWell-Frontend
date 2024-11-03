import React from "react"
import NavBreadcrumb from "../NavBreadcrumb"

function AdminHeader(props) {
    if ((sessionStorage.getItem("user") !== null || sessionStorage.getItem("token") !== null) && sessionStorage.getItem("role").toLowerCase() === "admin") {
        return (
            <React.Fragment>
                <h2 className='text-white my-3 mx-2'>Welcome {JSON.parse(sessionStorage.getItem("user")).username},</h2>
                <div className="statistics my-4" id="statisticsSection">
                    <div className="d-flex flex-fill">
                        <div className="incomeData mx-2 flex-fill bg-white text-center py-3 accountBox">
                            <div className='my-1 fw-bold text-black fs-5'><strong>Total Active Users</strong></div>
                            <div className="my-1 balance fs-5">{props.contextData.allUsers ? props.contextData.allUsers["allUsers"].length : 0}</div>
                        </div>
                        <div className="expenseData mx-2 flex-fill bg-white text-center py-3 accountBox">
                            <div className='my-1 fw-bold text-black fs-5'><strong>Total Money Managed</strong></div>
                            <div className="my-1 balance fs-5">₹ {props.contextData.sumupBalanceResponse ? props.contextData.sumupBalanceResponse["accountsBalance"] ? props.contextData.sumupBalanceResponse["accountsBalance"]["income"] + props.contextData.sumupBalanceResponse["accountsBalance"]["expense"] : 0 : 0}</div>
                        </div>
                        <div className="savingsData mx-2 flex-fill bg-white text-center py-3 accountBox">
                            <div className='my-1 fw-bold text-black fs-5'><strong>Total Categories Created</strong></div>
                            <div className="my-1 balance fs-5">{props.contextData.allCategories ? props.contextData.allCategories["categories"] ? props.contextData.allCategories["categories"].length : 0 : 0}</div>
                        </div>
                        <div className="savingsData mx-2 flex-fill bg-white text-center py-3 accountBox">
                            <div className='my-1 fw-bold text-black fs-5'><strong>Total Accounts Created</strong></div>
                            <div className="my-1 balance fs-5">{props.contextData.allAccounts ? props.contextData.allAccounts["accounts"] ? props.contextData.allAccounts["accounts"].length : 0 : 0}</div>
                        </div>
                    </div>
                </div>
                <div className="mx-2">
                    <NavBreadcrumb />
                </div>
            </React.Fragment>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default AdminHeader