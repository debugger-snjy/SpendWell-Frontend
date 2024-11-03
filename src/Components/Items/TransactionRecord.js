import React, { Component } from 'react'

export class TransactionRecordItem extends Component {

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
            <div className="col my-3">
                <div className="card" style={data.type === "income" ? { ...incRec, "border": "4px solid #006200" } : { ...expRec, "border": "4px solid #790c0c" }}>
                    <div className="card-body">
                        <h5 className="card-title fw-bold">
                            <div className='d-flex justify-content-between'>
                                <div>{data.category} [ {data.account} ]</div>
                                <div className={data.type === "income" ? 'text-success' : 'text-danger'}>
                                    <span className='mx-1'>{data.type === "income" ? <i className="fa-solid fa-plus fa-xs text-success"></i> : <i className="fa-solid fa-minus fa-xs text-danger"></i>}
                                    </span>
                                    ₹ {data.amount}
                                </div>
                            </div>
                        </h5>
                        <div className="card-text">
                            <div className='d-flex justify-content-between'>
                                <div>{data.desc}</div>
                                <div>{transactionDateTime.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionRecordItem