// This File will contain the Function that make API Calls regarding Expense Records

export const addNewCategoryRecord = async (data) => {
    console.log("Yes !!")
    const addCategoryAPI = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/add`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("token")
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const catgeoryRecordResponse = await addCategoryAPI.json()

    console.log(catgeoryRecordResponse)

    // Sending the response Data
    return catgeoryRecordResponse
}

export const getAllCategories = async (token) => {
    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/fetch`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const allCategoriesOfUser = await response.json()

    console.log("DATA : ", allCategoriesOfUser)

    // Sending the response Data
    return allCategoriesOfUser
}

export const deleteCategory = async (id, token) => {
    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/delete/${id}`, {
        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });

    // Variable to handle the API Response
    const deleteCategoryResponse = await response.json()

    console.log("DATA : ", deleteCategoryResponse)

    // Sending the response Data
    return deleteCategoryResponse
}

export const editCategory = async (id, data,token) => {
    console.log("Yes !!")
    const editCategoryAPI = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category/update/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },

        body: JSON.stringify(data)
    });

    // Variable to handle the API Response
    const editCategoryRecordResponse = await editCategoryAPI.json()

    console.log(editCategoryRecordResponse)

    // Sending the response Data
    return editCategoryRecordResponse
}