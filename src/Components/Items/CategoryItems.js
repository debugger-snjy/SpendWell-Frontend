import React, { Component, useContext, useState } from 'react'
import MyContext from '../../Context/MyContext';

function CategoryItem(props) {

    const contextData = useContext(MyContext)

    // Style for Record
    const expRec = {
        "background": "#ffefef",
    }
    const incRec = {
        "background": "#d8ffd8",
    }

    let [effectedCategories, setEffectedCategories] = useState();

    let { data, itemNo } = props;

    let records;

    console.log(data)
    console.log("===>", itemNo)
    var creationDateTime = new Date(data.creationDate);

    async function getCategoryData() {
        records = data.categoryType.toLowerCase() === "income" ? await contextData.getAllIncomesOfCategory(data._id) : await contextData.getAllExpensesOfCategory(data._id)
        setEffectedCategories(data.categoryType.toLowerCase() === "income" ? records.incomesCount : records.expensesCount)
    };

    return (
        <div className="col my-3">
            <div className="card h-100 border-2" style={data.categoryType.toLowerCase() === "income" ? { ...incRec, "border": "4px solid #006200" } : { ...expRec, "border": "4px solid #be3a3a" }}>
                <div className="card-body">
                    <h5 className="card-title fw-bold"><div className='d-flex justify-content-between'>
                        <div><i className="fa-solid fa-tag fa-rotate-90 fa-sm mx-2" style={{ color: data.categoryType.toLowerCase() === "income" ? "#006200" : "#be3a3a" }}></i>{data.categoryName}</div>
                    </div></h5>
                    <div className="card-text"><div>{data.desc}</div>
                        <small className="text-body-secondary">Creation Date : {creationDateTime.toLocaleString()}</small>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col">
                            {/* 
                                // #region Edit Modal
                            */}
                            <button type="button" onClick={getCategoryData} data-bs-toggle="modal" data-bs-target={`#editModal${itemNo}`} className="btn btn-dark w-100 my-1"><i className="fa-solid fa-pen" style={{ "color": "#ffffff" }}></i> <span className="px-2">Edit Category</span></button>

                            <div className="modal fade" id={`editModal${itemNo}`} tabIndex="-1" aria-labelledby={`editModalLabel${itemNo}`} aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id={`editModalLabel${itemNo}`}>Edit '<strong>{data.categoryName}</strong>' Category</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className={`alert alert-warning d-flex align-items-center`} role="alert">

                                                {/* Printing the Exclamation Triangle Fill */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                </svg>
                                                <div className='mx-2'>
                                                    <strong>This Category is Used in {effectedCategories} Transactions, All the Transactions will be deleted ! </strong>
                                                </div>
                                            </div>
                                            <div className='allTransactions'>
                                                <table className={`table table-warning table-borderless`} cellSpacing={10}>
                                                    <tbody>
                                                        {
                                                            contextData.allTransactionCategories && contextData.allTransactionCategories.map((transaction, index) => {
                                                                return (
                                                                    <tr>
                                                                        {data.categoryType.toLowerCase() === "income" ? <><td className='left' key={index}>
                                                                            {transaction.incomeDescription}
                                                                        </td><td className='right'>₹ {transaction.incomeAmount}</td></> :
                                                                            <><td className='left' key={index}>
                                                                                {transaction.expenseDescription}
                                                                            </td><td className='right'>₹ {transaction.expenseAmount}</td></>}

                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* Form For Editing the Category Data */}
                                            <form id={`EditCategoryForm${itemNo}`} onSubmit={
                                                (e) => { e.preventDefault();}
                                            }>
                                                <div className="mb-3">
                                                    <label htmlFor={`updatedCategoryName${itemNo}`} className="form-label">Category Name</label>
                                                    <input type="text" className="form-control text-black fw-bold" id={`updatedCategoryName${itemNo}`} min="0" required defaultValue={data.categoryName} />
                                                </div>
                                                {/* No Need to Show the Disabled Category Type Change as we are not going to change the Category Type
                                                <div className="mb-3">
                                                    <label htmlFor="categoryType" className="form-label">Category Type</label>
                                                    <select className="form-select text-black fw-bold" id="categoryType" disabled={true}>
                                                        <option value="Income" selected={data.categoryType.toLowerCase() === "income" ? true : false}>Income</option>
                                                        <option value="Expense" selected={data.categoryType.toLowerCase() === "expense" ? true : false}>Expense</option>
                                                    </select>
                                                </div> */}
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                            <button type="submit" className="btn btn-warning" data-bs-dismiss="modal" onClick={async () => {
                                                await contextData.editMyCategory(itemNo, data._id,sessionStorage.getItem("token"));
                                                props.updateFetchSumUp();
                                                props.updateCategories();
                                                props.updateTransactions();
                                            }}>Edit Category</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            {/* 
                                // #region Delete Modal
                            */}
                            {/* Delete Confirmation Message */}
                            <button type="button" data-bs-toggle="modal" data-bs-target={`#deleteConfirmationModal${itemNo}`} className="btn btn-danger w-100 my-1" onClick={getCategoryData} ><i className="fa-solid fa-trash" style={{ "color": "#ffffff" }}></i> <span className="px-2" >Delete Category</span></button>

                            <div className="modal fade" id={`deleteConfirmationModal${itemNo}`} tabIndex="-1" aria-labelledby={`deleteConfirmationModalLabel${itemNo}`} aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id={`deleteConfirmationModalLabel${itemNo}`}>Delete '<strong>{data.categoryName}</strong>' Category ?</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className={`alert ${data.categoryType.toLowerCase() === "expense" ? "alert-danger" : "alert-success"} d-flex align-items-center`} role="alert">

                                                {/* Printing the Exclamation Triangle Fill */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                </svg>
                                                <div className='mx-2'>
                                                    <strong>This Category is Used in {effectedCategories} Transactions, All the Transactions will be Renamed with new Category ! </strong>
                                                </div>
                                            </div>
                                            <div className='allTransactions'>
                                                <table className={`table ${data.categoryType.toLowerCase() === "expense" ? "table-danger" : "table-success"} table-borderless`} cellSpacing={10}>
                                                    <tbody>
                                                        {
                                                            contextData.allTransactionCategories && contextData.allTransactionCategories.map((transaction, index) => {
                                                                return (
                                                                    <tr>
                                                                        {data.categoryType.toLowerCase() === "income" ? <><td className='left' key={index}>
                                                                            {transaction.incomeDescription}
                                                                        </td><td className='right'>₹ {transaction.incomeAmount}</td></> :
                                                                            <><td className='left' key={index}>
                                                                                {transaction.expenseDescription}
                                                                            </td><td className='right'>₹ {transaction.expenseAmount}</td></>}

                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={async () => {
                                                await contextData.categoryDeleteBtn(data._id, data.categoryType.toLowerCase(), sessionStorage.getItem("token"));
                                                props.updateFetchSumUp();
                                            }}>Delete Category</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CategoryItem