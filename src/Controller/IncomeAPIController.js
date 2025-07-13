// This File will contain the Function that make API Calls regarding Income Records

export const addNewIncomeRecord = async (data) => {
    console.log("Yes !!")
    const addIncomeAPI = await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/add`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const incomeRecordResponse = await addIncomeAPI.json()

    console.log(incomeRecordResponse)

    // Sending the response Data
    return incomeRecordResponse
}

export const deleteIncome = async (id, token) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/delete/${id}`, {
        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const deleteIncomeResponse = await response.json()

    console.log("Delete DATA : ", deleteIncomeResponse)

    return deleteIncomeResponse
}

export const editIncomeRecord = async (id, data) => {
    console.log("Yes !!")
    const editIncomeAPI = await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/update/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const editIncomeResponse = await editIncomeAPI.json()

    console.log(editIncomeResponse)

    // Sending the response Data
    return editIncomeResponse
}

export const fetchCategoryIncome = async (categoryId) => {
    const fetchCategoryIncomes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/fetch/category/${categoryId}`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },
    });

    // Variable to handle the API Response
    const categoryIncomeResponse = await fetchCategoryIncomes.json()

    console.log(categoryIncomeResponse)

    // Sending the response Data
    return categoryIncomeResponse
}

export const fetchAccountIncome = async (accountId) => {
    const fetchAccountIncomes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/fetch/account/${accountId}`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },
    });

    // Variable to handle the API Response
    const accountIncomeResponse = await fetchAccountIncomes.json()

    console.log(accountIncomeResponse)

    // Sending the response Data
    return accountIncomeResponse
}