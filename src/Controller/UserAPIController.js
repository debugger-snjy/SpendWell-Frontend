// Function to Call the API to get the User Info : 
export const getInfoAPI = async (token) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
    });

    // Variable to handle the API Response
    const userData = await response.json()

    console.log(userData)

    // Sending the response Data
    return userData
}

// Function to Call the API to login the User : 
export const loginAPI = async (useremail, userpassword) => {

    try {
        // API Call to fetch user data :
        // Adding the API Call to fetch the user from the Database
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // As fetchallnotes is a GET method

            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({ email: useremail, password: userpassword })
        });

        // Variable to handle the API Response
        const loginResponse = await response.json()

        console.log(loginResponse)

        // Sending the response Data
        return loginResponse
    }
    catch (e) {
        console.log(e instanceof TypeError); // true
        console.log(e.message); // "null has no properties"
        console.log(e.name); // "TypeError"
        console.log(e.stack); // Stack of the error

        return null;
    }
}

// Calling the API to login the User : 
export const signUpAPI = async (userEmail, userPassword, userName, userPhone, usergender, userrole) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const signUpAPI = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST", // As fetchallnotes is a GET method

        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify({ email: userEmail, password: userPassword, username: userName, phone: userPhone, gender: usergender, role: userrole })
    });

    // Variable to handle the API Response
    const signupResponse = await signUpAPI.json()

    console.log(signupResponse)

    // Sending the response Data
    return signupResponse
}

// Function to Call API that Fetch all the Users that are existed in the Application
export const getUsersAPI = async (token) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const getUsersAPI = await fetch(`http://localhost:5000/api/auth/fetch/users/all`, {
        method: "GET", // As fetchallnotes is a GET method

        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
    });

    // Variable to handle the API Response
    const getUsersResponse = await getUsersAPI.json()

    // Sending the response Data
    return getUsersResponse
}

// Function to Delete the User 
export const deleteUser = async (token, id) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const deleteUsersAPI = await fetch(`http://localhost:5000/api/auth/delete/user/${id}`, {
        method: "DELETE", // As fetchallnotes is a GET method

        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
    });

    // Variable to handle the API Response
    const deleteUserResponse = await deleteUsersAPI.json()

    console.log("Important : ", deleteUserResponse)

    // Sending the response Data
    return deleteUserResponse

}

// Function to Edit the User 
export const editUserAPI = async (token, id, updatedData) => {

    // API Call to fetch user data :
    // Adding the API Call to fetch the user from the Database
    const editUsersAPI = await fetch(`http://localhost:5000/api/auth/update/user/${id}`, {
        method: "PUT", // As fetchallnotes is a GET method

        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },

        body: JSON.stringify(updatedData)
    });

    // Variable to handle the API Response
    const editUserResponse = await editUsersAPI.json()

    console.log("Important : ", editUserResponse)

    // Sending the response Data
    return editUserResponse

}

// ! EXTRA
// Function to fetch the user Details
// export const fetchUser = async () => {

//     console.log("Fetching User Info !");
//     // ✅ Done TODO : Make an API Call Here !

//     // Showing the Alert Message
//     showAlert("Info", "Fetching Your Details", "alert-info")

//     console.log(sessionStorage.getItem("token"));

//     // Adding the API Call to fetch all the notes
//     const response = await fetch(`${host}/api/auth/getuser`, {
//         method: "POST", // As fetchUser is a POST method

//         headers: {
//             "Content-Type": "application/json",
//             // 'Content-Type': 'application/x-www-form-urlencoded',

//             // Adding the auth-token hardcore till now !
//             "auth-token": sessionStorage.getItem("token"),
//         },

//         // No need of body as we will not pass anything in the body
//     });
//     // parses JSON response into native JavaScript objects and using await as the function is asynchronus function
//     const userInfo = await response.json();

//     // Checking
//     // console.log(userInfo);
//     // console.log(userInfo.user.date)

//     // Sending the Formatted Date Time !
//     userInfo.user.date = formattedDateTime(userInfo.user.date)
//     // console.log(userInfo.user.date)

//     setUser(userInfo.user)

//     showAlert("Success", "User Fetched Successfully !", "alert-info")
// }