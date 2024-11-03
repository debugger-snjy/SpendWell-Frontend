// This File will contain the Function that make API Calls regarding Accounts Records

export const addNewAccountRecord = async (data) => {
    console.log("Yes !!")
    const addAccountAPI = await fetch(`http://localhost:5000/api/account/add`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "auth-token":sessionStorage.getItem("token")
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const accountRecordResponse = await addAccountAPI.json()

    console.log(accountRecordResponse)

    // Sending the response Data
    return accountRecordResponse
}

export const getAccountBalanceSumUp = async (token) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`http://localhost:5000/api/account/fetch/stats`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const accountSumUpResponse = await response.json()

    console.log("DATA : ", accountSumUpResponse)

    // Sending the response Data
    return accountSumUpResponse
}

// Function to get the Account Names
export const getAllAccounts = async (token) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`http://localhost:5000/api/account/fetch`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const allAccountResponse = await response.json()

    console.log("DATA : ", allAccountResponse)

    // Sending the response Data
    return allAccountResponse
}

export const getAllTransactions = async (token) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`http://localhost:5000/api/account/fetch/transactions/all`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const allTransactionsResponse = await response.json()

    console.log("DATA : ", allTransactionsResponse)

    // Sending the response Data
    return allTransactionsResponse
}

export const deleteAccount = async (id, token) => {
    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`http://localhost:5000/api/account/delete/${id}`, {
        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const deleteAccountResponse = await response.json()

    console.log("DATA : ", deleteAccountResponse)

    // Sending the response Data
    return deleteAccountResponse
}

export const editAccount = async (id, data,token) => {
    console.log("Yes !!")
    const editAccountAPI = await fetch(`http://localhost:5000/api/account/update/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const editAccountRecordResponse = await editAccountAPI.json()

    console.log(editAccountRecordResponse)

    // Sending the response Data
    return editAccountRecordResponse
}