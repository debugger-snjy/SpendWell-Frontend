// This File will contain the Function that make API Calls regarding Expense Records

export const addNewExpenseRecord = async (data) => {
    console.log("Yes !!")
    const addExpenseAPI = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expense/add`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const expenseRecordResponse = await addExpenseAPI.json()

    console.log(expenseRecordResponse)

    // Sending the response Data
    return expenseRecordResponse
}

export const deleteExpense = async (id, token) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expense/delete/${id}`, {
        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const deleteExpenseResponse = await response.json()

    console.log("Delete DATA : ", deleteExpenseResponse)

    return deleteExpenseResponse
}

export const fetchCategoryExpense = async (categoryId) => {
    const fetchCategoryExpenses = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expense/fetch/category/${categoryId}`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },
    });

    // Variable to handle the API Response
    const categoryExpenseResponse = await fetchCategoryExpenses.json()

    console.log(categoryExpenseResponse)

    // Sending the response Data
    return categoryExpenseResponse
}

export const fetchAccountExpense = async (accountId) => {
    const fetchAccountExpenses = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expense/fetch/account/${accountId}`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },
    });

    // Variable to handle the API Response
    const accountExpenseResponse = await fetchAccountExpenses.json()

    console.log(accountExpenseResponse)

    // Sending the response Data
    return accountExpenseResponse
}

export const editExpenseRecord = async (id, data) => {
    console.log("Yes !!")
    const editExpenseAPI = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expense/update/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const editExpenseResponse = await editExpenseAPI.json()

    console.log(editExpenseResponse)

    // Sending the response Data
    return editExpenseResponse
}