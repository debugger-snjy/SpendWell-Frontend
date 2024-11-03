import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../Context/MyContext'

function TransactionOperationRecordItem(props) {

    let { data, itemNo } = props;
    console.log(data)

    const contextData = useContext(MyContext)
    const [editedTransaction, setEditedTransaction] = useState(data)

    const updateDateTime = (datetime) => {
        // Get the current date and time in Kolkata timezone
        const currentDate = new Date(datetime);
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
        document.getElementById(`updatedDateTime${itemNo}`).value = formattedDateTime;
    };

    // Style for Record
    const expRec = {
        "background": "#ffefef",
    }
    const incRec = {
        "background": "#d8ffd8",
    }

    const onChange = (event) => {

        // Now, Getting the data that user will be adding and that will be saved on that spot when user add the data
        setEditedTransaction({
            ...editedTransaction, // This will be the data that is already present
            [event.target.name]: event.target.value
            // Using the above line, it will ADD the data and OVERWRITE if already present
            // Thus, when we write the title, then value of title will be the text that user will write
        })

        console.log("edited Transaction : ", editedTransaction)

    }

    var transactionDateTime = new Date(data.datetime);

    return (
        <div className="col my-3">
            <div className="card h-100" style={data.type === "income" ? { ...incRec, "border": "4px solid #006200" } : { ...expRec, "border": "4px solid #790c0c" }}>
                <div className="card-body">
                    <h5 className="card-title fw-bold"><div className='d-flex justify-content-between'>
                        <div>{data.category} [ {data.account} ]</div>
                        <div className={data.type === "income" ? 'text-success' : 'text-danger'}>
                            <span className='mx-1'>{data.type === "income" ? <i className="fa-solid fa-plus fa-xs text-success"></i> : <i className="fa-solid fa-minus fa-xs text-danger"></i>}
                            </span>
                            ₹ {data.amount}
                        </div>
                    </div></h5>
                    <div className="card-text"><div>{data.desc}</div>
                        <small className="text-body-secondary">Transaction Date : {transactionDateTime.toLocaleString()}</small>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col">
                            <span><button className="btn btn-dark w-100 my-1" data-bs-toggle="modal" data-bs-target={`#editIncomeModal${itemNo}`} onClick={() => { updateDateTime(data.datetime) }}><i className="fa-solid fa-pen" style={{ "color": "#ffffff" }}></i> <span className="px-2">Edit Transaction</span></button></span>

                            {
                                // #region Edit Modal
                            }
                            <div className="modal fade" id={`editIncomeModal${itemNo}`} tabIndex="-1" aria-labelledby={`editIncomeModal${itemNo}Label`} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header bg-dark text-light">
                                            <h1 className="modal-title fs-5" id={`editIncomeModal${itemNo}Label`}>Edit {editedTransaction.type.toLowerCase() == "income" ? "Income" : "Expense"} Form</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" id={`editIncomeModal${itemNo}CloseBtn`} aria-label="Close" onClick={() => { document.getElementById(`EditTransactionForm${itemNo}`).reset(); }}></button>
                                        </div>

                                        {/* Form For Adding the Income Data */}
                                        <form id={`EditTransactionForm${itemNo}`} onSubmit={
                                            (e) => {
                                                e.preventDefault();
                                                console.log("Add Appropriate Function");
                                                if(editedTransaction.type.toLowerCase() == "income"){
                                                    console.log("Call Income Function");
                                                    contextData.editMyIncomeRecord(itemNo,editedTransaction.id);
                                                }
                                                else{
                                                    console.log("Call Expense Function");
                                                    contextData.editMyExpenseRecord(itemNo,editedTransaction.id);
                                                }
                                            }
                                        }>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor={`updatedAmount${itemNo}`} className="form-label">Income Amount</label>
                                                    <input type="number" className="form-control text-black fw-bold" id={`updatedAmount${itemNo}`} min="0" required name="amount" onChange={onChange} value={editedTransaction.amount} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor={`updatedDescription${itemNo}`} className="form-label">Income Description</label>
                                                    <input type="text" className="form-control text-black fw-bold" id={`updatedDescription${itemNo}`} minLength="5" min="2" required name="desc" onChange={onChange} value={editedTransaction.desc} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor={`updatedCategory${itemNo}`} className="form-label">Category</label>
                                                    <select className="form-select text-black fw-bold" id={`updatedCategory${itemNo}`} required name="category" onChange={onChange} >
                                                        {
                                                            contextData.allCategories && contextData.allCategories["categories"].map(
                                                                (category, index) => {
                                                                    if (category.categoryType.toLowerCase() === data.type.toLowerCase()) {
                                                                        return <option key={index} value={category._id} selected={category.categoryName === editedTransaction.category ? true : false}>
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
                                                    <label htmlFor={`updatedAccount${itemNo}`} className="form-label">Account From You will Spend</label>
                                                    <select className="form-select text-black fw-bold" id={`updatedAccount${itemNo}`} required name="account" onChange={onChange}>
                                                        {
                                                            contextData.allAccounts && contextData.allAccounts["accounts"].map(
                                                                (account, index) => {
                                                                    if (account.accountType.toLowerCase() === data.type.toLowerCase()) {
                                                                        return <option key={index} value={account._id} selected={account.accountName === editedTransaction.account ? true : false}>
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
                                                    <label htmlFor={`updatedDateTime${itemNo}`} className="form-label">Date Time</label>
                                                    <input className="form-control text-black fw-bold" type="datetime-local" id={`updatedDateTime${itemNo}`} name="datetime" onChange={onChange} />
                                                </div>
                                            </div>
                                            <div className="modal-footer bg-dark">
                                                <button type="button" className="btn btn-danger" id={`editIncomeModal${itemNo}CloseBtn`} data-bs-dismiss="modal" onClick={() => { document.getElementById(`EditTransactionForm${itemNo}`).reset(); }}>Close</button>
                                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Submit Form</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <button className="btn btn-danger w-100 my-1" onClick={() => { data.type.toLowerCase() === "income" ? contextData.transactionIncomeDeleteBtn(data.id, sessionStorage.getItem("token")) : contextData.transactionExpenseDeleteBtn(data.id, sessionStorage.getItem("token")) }} ><i className="fa-solid fa-trash" style={{ "color": "#ffffff" }}></i> <span className="px-2" >Delete Transaction</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default TransactionOperationRecordItem