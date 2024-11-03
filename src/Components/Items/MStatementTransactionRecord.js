import React, { Component } from 'react'

import categoryIcon from "../../assests/category.png"
import accountIcon from "../../assests/account.png"

export class MStatementTransactionRecord extends Component {

    render() {

        let { data } = this.props;
        console.log(data)

        // Style for Record
        const expRec = {
            "background": "#ffefef",
        }
        const incRec = {
            "background": "#d8ffd8",
        }

        var transactionDateTime = new Date(data.datetime);

        return (
            <div className="col my-2">
                <div className="card" style={data.type === "income" ? { ...incRec, "border": "4px solid #006200" } : { ...expRec, "border": "4px solid #790c0c" }}>
                    <div className="card-body">
                        <h5 className="card-title fw-bold">
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center' style={{marginRight : "40px",width:"15%"}}>
                                    <img src={categoryIcon} height={24} className='me-2' alt="Account Icon" />
                                    <span>{data.category}</span>
                                </div>

                                <div className='d-flex align-items-center mx-4' style={{marginRight : "40px"}}>
                                    <img src={accountIcon} height={24} className='me-2' alt="Account Icon" />
                                    <span>{data.account}</span>
                                </div>

                                <div className={`${data.type === "income" ? 'text-success' : 'text-danger'} flex-fill flex-grow-1 text-end`}>
                                    <span className='mx-1'>{data.type === "income" ? <i className="fa-solid fa-plus fa-xs text-success"></i> : <i className="fa-solid fa-minus fa-xs text-danger"></i>}
                                    </span>
                                    ₹ {data.amount}
                                </div>
                            </div>
                        </h5>
                        <div className="card-text">
                            <div className='d-flex justify-content-between'>
                                <div>Description : {data.desc}</div>
                                <div>{transactionDateTime.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MStatementTransactionRecord