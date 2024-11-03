import { useState } from "react";
import MyContext from "./MyContext";
import { useNavigate } from "react-router-dom";

// Importing API Function Calls From the Controller
const IncomeAPIController = require("../Controller/IncomeAPIController");
const ExpenseAPIController = require("../Controller/ExpenseAPIController");
const CategoryAPIController = require("../Controller/CategoryAPIController");
const AccountAPIController = require("../Controller/AccountAPIController");
const UtilsController = require("../Controller/UtilsController");
const UserAPIController = require("../Controller/UserAPIController");
const NotesController = require("../Controller/NotesController");

const MyState = (props) => {


    // #region Variables
    let navigateTo = useNavigate()

    // const [userInfo, setuserInfo] = useState({});
    const [sumupBalanceResponse, setsumupBalanceResponse] = useState()
    const [allTransactions, setAllTransactions] = useState()
    const [allTransactionCategories, setAllTransactionCategories] = useState();
    const [allTransactionAccounts, setAllTransactionAccounts] = useState();
    const [allCategories, setAllCategories] = useState()
    const [allAccounts, setAllAccounts] = useState()
    const [allUsers, setAllUsers] = useState()
    const [userNotes, setuserNotes] = useState([]);

    // Function to set the user and update the user
    // const [user, setUser] = useState({ "_id": "", "name": "", "email": "", "date": "", "__v": 0 });

    // Making a Alert Use State Variable
    const [alert, setAlert] = useState(null);
    const showAlert = (title, message, type) => {
        let updatedTitle;

        switch (title.toLowerCase()) {
            case "success":
                updatedTitle = "🎉 Success"
                break;

            case "failed":
                updatedTitle = "❌ Failed"
                break;

            case "warning":
                updatedTitle = "⚠️ Warning"
                break;

            case "fetching":
                updatedTitle = "🔄️ Fetching"
                break;

            case "unauthorize":
                updatedTitle = "🦹 Unauthorized Access"
                break;

            default:
                updatedTitle = title
                break;
        }
        setAlert({
            title: updatedTitle,
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 5000);
    }

    // #region isValidEmail
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // #region isValidEmail
    const isValidPhone = (phone) => {
        let phoneRegex = /^(?:\+?91)?(?:0)?[6789]\d{9}$/;
        return phoneRegex.test(phone);
    }

    // #region FetchSumUpBalance
    // Function to Fetch all the Accounts Balance
    const FetchSumUpBalance = async (token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await AccountAPIController.getAccountBalanceSumUp(token)
            console.log("ContextStateData Response", response)
            setsumupBalanceResponse(response)
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching account balance:", error)
        }
    }

    // #region FetchAllAccounts
    // Function to Fetch all the Income Accounts
    const FetchAllAccounts = async (token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await AccountAPIController.getAllAccounts(token)
            console.log("Response", response)
            setAllAccounts(response)
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
        }
    }


    // #region FetchAllTransactions
    // Function to Fetch all the Transactions
    const FetchAllTransactions = async (token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await AccountAPIController.getAllTransactions(token)
            console.log("Transaction Response", response)
            setAllTransactions(response)
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching account balance:", error)
        }
    }

    // #region FetchAllCategories
    // Function to Fetch all the Transactions
    const FetchAllCategories = async (token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await CategoryAPIController.getAllCategories(token)
            console.log("Category Response", response)
            setAllCategories(response)
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
        }
    }

    // #region FetchAllUsers
    // Function to Fetch all the Transactions
    const FetchAllUsers = async (token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await UserAPIController.getUsersAPI(token)
            console.log("Users Response", response)
            setAllUsers(response)
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
        }
    }


    // #region getAllIncomesOfCategory
    const getAllIncomesOfCategory = async (categoryId) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await IncomeAPIController.fetchCategoryIncome(categoryId)
            console.log("Category Income Response", response)
            setAllTransactionCategories(response.incomes)
            return response;
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
            return null;
        }
    }

    // #region getAllExpensesOfCategory
    const getAllExpensesOfCategory = async (categoryId) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await ExpenseAPIController.fetchCategoryExpense(categoryId)
            console.log("Category Expense Response", response)
            setAllTransactionCategories(response.expenses)
            return response;
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
            return null;
        }
    }

    // #region getAllIncomesOfAccount
    const getAllIncomesOfAccount = async (accountId) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await IncomeAPIController.fetchAccountIncome(accountId)
            console.log("Account Income Response", response)
            setAllTransactionAccounts(response.incomes)
            return response;
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
            return null;
        }
    }

    // #region getAllExpensesOfAccount
    const getAllExpensesOfAccount = async (accountId) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await ExpenseAPIController.fetchAccountExpense(accountId)
            console.log("Account Expense Response", response)
            setAllTransactionAccounts(response.expenses)
            return response;
        } catch (error) {
            // Handle error if API request fails
            console.error("Error fetching Categories:", error)
            return null;
        }
    }

    // #region Form Handling
    // #region handleLogin
    // ^ Login Form Handling Function
    // Function to handle the Form Data when user gets logged in !
    const handleLogin = async (event) => {

        console.log("Login Submit !");

        event.preventDefault();

        let useremail = document.getElementById("userEmail").value;
        console.log(useremail);
        let userpassword = document.getElementById("userPassword").value;
        console.log(userpassword);

        if ((useremail === "" || useremail === null) || (userpassword === "" || userpassword === null)) {
            if ((useremail === "" || useremail === null) && (userpassword === "" || userpassword === null)) {
                showAlert("Failed", "Your Email Address and Password is Empty", "alert-danger")
                return
            }
            if (useremail === "" || useremail === null) {
                showAlert("Failed", "Your Email Address is Empty", "alert-danger")
                return
            }
            if (userpassword === "" || userpassword === null) {
                showAlert("Failed", "Your Password is Empty", "alert-danger")
                return
            }
        }

        if (isEmailValid(useremail)) {
            // Adding the API Call to add the notes into the Database
            const response = await UserAPIController.loginAPI(useremail, userpassword)

            if (response === null) {
                // means that the catch is execute and API is not fetched might due to server is not started
                // Showing the Alert Box for the successfull fetching the user data
                showAlert("Warning", "Server too Busy, Try after sometime ", "alert-warning")
            }
            else {
                // If the user is registered and we get its auth-token,
                // Then we will save that auth-token in the sessionStorage
                if (response.status === "success") {

                    // Showing the Alert Message
                    showAlert("Success", response.msg, "alert-success")

                    // Getting the User Info :
                    const getuserResponse = await UserAPIController.getInfoAPI(response.authToken)

                    // console.log("Hii", getuserResponse)

                    // Showing the Alert Box for the Fetching the Data
                    showAlert("Fetching", "Fetching the User Data", "alert-warning")

                    setTimeout(() => {

                        // Saving auth-token in sessionStorage
                        sessionStorage.setItem("token", response.authToken)
                        sessionStorage.setItem("role", getuserResponse.user.role)
                        sessionStorage.setItem("user", JSON.stringify(getuserResponse.user))

                        // Showing the Alert Box for the successfull fetching the user data
                        showAlert("Success", getuserResponse.msg, "alert-success")

                        navigateTo(`/dashboard/${getuserResponse.user.role.toLowerCase()}`)

                    }, 3000);

                }

                else {

                    // Showing the Alert Message
                    showAlert("Failed", response.msg, "alert-danger")

                    // // Setting the status message :
                    // document.getElementById("status").innerText = userToken.msg
                    // document.getElementById("status").style.color = "red"
                    // document.getElementById("status").style.fontWeight = 600;
                }
            }
        }
        else {
            showAlert("Failed", "Your Email Address is Invalid, Kindly Check Your Email Address", "alert-danger")
        }

    }

    // #region handleSignup
    // Function to handle when user gets logged in !
    const handleSignup = async (event) => {

        console.log("Signup Submit !");

        event.preventDefault();

        let userEmail = document.getElementById("userEmail").value;
        let userPassword = document.getElementById("userPassword").value;
        let userName = document.getElementById("userName").value;
        let userPhone = document.getElementById("userPhone").value;
        const usergender = document.getElementById("genderMale").checked ? "male" : document.getElementById("genderFemale").checked ? "female" : "";
        const userrole = "Customer";

        if ((userEmail === "" || userEmail === null) && (userPassword === "" || userPassword === null) && (userName === "" || userName === null) && (userPhone === "" || userPhone === null) && (usergender === "" || usergender === null)) {
            showAlert("Failed", "Form Fields are Empty !!", "alert-danger")
        }

        else {
            // Adding the API Call to add the notes into the Database
            const response = await UserAPIController.signUpAPI(userEmail, userPassword, userName, userPhone, usergender, userrole)

            // If the user is registered and we get its auth-token,
            // Then we will save that auth-token in the sessionStorage
            if (response.status === "success") {

                // Showing the Alert Message
                showAlert(response.status, response.msg + " Logging You . . .", "alert-success")

                // console.log("Hii", getuserResponse)

                // Showing the Alert Box for the Fetching the Data
                // showAlert("Fetching", "Fetching the User Data", "alert-warning")

                setTimeout(() => {

                    // Saving auth-token in sessionStorage
                    sessionStorage.setItem("token", response.authToken)
                    sessionStorage.setItem("role", userrole.toLowerCase())
                    sessionStorage.setItem("user", JSON.stringify(response.userData))

                    // Showing the Alert Box for the successfull fetching the user data
                    // showAlert("Success", getuserResponse.msg, "alert-success")

                    navigateTo(`/dashboard/${userrole.toLowerCase()}`)

                }, 3000);

            }

            else {

                // Showing the Alert Message
                showAlert(response.status, response.msg, "alert-danger")

                // // Setting the status message :
                // document.getElementById("status").innerText = userToken.msg
                // document.getElementById("status").style.color = "red"
                // document.getElementById("status").style.fontWeight = 600;
            }
        }
    }

    // #region submitMyIncomeRecord
    // Function to check & Validate the Add Income Form
    async function submitMyIncomeRecord() {

        // Getting all the values from the form
        var incomeAmount = parseInt(document.getElementById("incomeAmount").value);
        var incomeCategory = document.getElementById("incomeCategory").value;
        var incomeAccount = document.getElementById("incomeAccount").value;
        var incomeDateTime = document.getElementById("incomeDateTime").value;
        var incomeDescription = document.getElementById("incomeDescription").value;

        if (incomeAccount === "" || incomeAmount === "" || incomeCategory === "" || incomeDateTime === "") {
            showAlert("Error", "Your Fields are Empty", "alert-danger");
        }
        else {
            console.log("All Things looks good !!");
            var incomeData = {
                "incomeDateTime": incomeDateTime,
                "incomeAmount": incomeAmount,
                "incomeDescription": incomeDescription,
                "incomeAccount": incomeAccount,
                "incomeCategory": incomeCategory
            }
            console.log(incomeData);

            var response = await IncomeAPIController.addNewIncomeRecord(incomeData);

            if (response.status.toLowerCase() === "success") {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addIncomeModalCloseBtn").click()
                document.getElementById("addIncomeModal").style.display = "none"
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(sessionStorage.getItem("token"));
                FetchSumUpBalance(sessionStorage.getItem("token"));

            }
            else {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addIncomeModalCloseBtn").click()
                document.getElementById("addIncomeModal").style.display = "none"
                //showAlert("Failed", "Not Able to Add Your Transaction, Please Add it once Again", "alert-danger");
                showAlert("Failed", response.msg, "alert-danger");
            }
        }
    }

    // #region submitMyExpenseRecord
    // Function to check & Validate the Add Expense Form
    async function submitMyExpenseRecord() {

        // Getting all the values from the form
        var expenseAmount = parseInt(document.getElementById("expenseAmount").value);
        var expenseCategory = document.getElementById("expenseCategory").value;
        var expenseAccount = document.getElementById("expenseAccount").value;
        var expenseDateTime = document.getElementById("expenseDateTime").value;
        var expenseDescription = document.getElementById("expenseDescription").value;

        if (expenseAccount === "" || expenseAmount === "" || expenseCategory === "" || expenseDateTime === "") {
            showAlert("Error", "Your Fields are Empty", "alert-danger");
        }
        else {
            console.log("All Things looks good !!");
            var expenseData = {
                "expenseDateTime": expenseDateTime,
                "expenseAmount": expenseAmount,
                "expenseDescription": expenseDescription,
                "expenseAccount": expenseAccount,
                "expenseCategory": expenseCategory
            }
            console.log(expenseData);

            var response = await ExpenseAPIController.addNewExpenseRecord(expenseData);

            if (response.status.toLowerCase() === "success") {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addExpenseModalCloseBtn").click()
                document.getElementById("addExpenseModal").style.display = "none"
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(sessionStorage.getItem("token"));
                FetchSumUpBalance(sessionStorage.getItem("token"));

            }
            else {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addExpenseModalCloseBtn").click()
                document.getElementById("addExpenseModal").style.display = "none"
                //showAlert("Failed", "Not Able to Add Your Transaction, Please Add it once Again", "alert-danger");
                showAlert("Failed", response.msg, "alert-danger");
            }
        }
    }

    // #region submitMyCategoryRecord
    // Function to check & Validate the Add Category Form
    async function submitMyCategoryRecord() {

        // Getting all the values from the form
        var categoryName = document.getElementById("categoryName").value;
        var categoryType = document.getElementById("categoryType").value;

        if (categoryName === "" || categoryType === "") {
            showAlert("Error", "Your Fields are Empty", "alert-danger");
        }
        else {
            console.log("All Things looks good !!");
            var categoryData = {
                "categoryName": categoryName,
                "categoryType": categoryType,
            }
            console.log(categoryData);

            var response = await CategoryAPIController.addNewCategoryRecord(categoryData);

            if (response.status.toLowerCase() === "success") {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addCategoryModalCloseBtn").click()
                document.getElementById("addCategoryModal").style.display = "none"
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(sessionStorage.getItem("token"));
                FetchSumUpBalance(sessionStorage.getItem("token"));
                FetchAllCategories(sessionStorage.getItem("token"));
            }
            else {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addCategoryModalCloseBtn").click()
                document.getElementById("addCategoryModal").style.display = "none"
                //showAlert("Failed", "Not Able to Add Your Category, Please Add it once Again", "alert-danger");
                showAlert("Failed", response.msg, "alert-danger");
            }
        }
    }

    // #region submitMyAccountRecord
    // Function to check & Validate the Add Account Form
    async function submitMyAccountRecord() {

        // Getting all the values from the form
        var accountName = document.getElementById("accountName").value;
        var accountType = document.getElementById("accountType").value;

        if (accountName === "" || accountType === "") {
            showAlert("Error", "Your Fields are Empty", "alert-danger");
        }
        else {
            console.log("All Things looks good !!");
            var accountData = {
                "accountName": accountName,
                "accountType": accountType,
            }
            console.log(accountData);

            var response = await AccountAPIController.addNewAccountRecord(accountData);

            if (response.status.toLowerCase() === "success") {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addAccountModalCloseBtn").click()
                document.getElementById("addAccountModal").style.display = "none"
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(sessionStorage.getItem("token"));
                FetchSumUpBalance(sessionStorage.getItem("token"));
                FetchAllCategories(sessionStorage.getItem("token"));
                FetchAllAccounts(sessionStorage.getItem("token"));
            }
            else {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addAccountModalCloseBtn").click()
                document.getElementById("addAccountModal").style.display = "none"
                //showAlert("Failed", "Not Able to Add Your Account, Please Add it once Again", "alert-danger");
                showAlert("Failed", response.msg, "alert-danger");
            }
        }
    }

    // #region editMyCategory
    // Function to get the Edit Category Name and Edit it using API
    async function editMyCategory(itemno, categoryId, token) {

        // Getting all the values from the form
        var editedCategoryName = document.getElementById(`updatedCategoryName${itemno}`).value;

        if (editedCategoryName === "") {
            showAlert("Error", "Your Fields are Empty", "alert-danger");
        }
        else {
            console.log("All Things looks good !!");
            var newCategoryData = {
                "categoryName": editedCategoryName,
            }
            console.log("New Category", newCategoryData);

            var response = await CategoryAPIController.editCategory(categoryId, newCategoryData, token);

            if (response.status.toLowerCase() === "success") {
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(sessionStorage.getItem("token"));
                FetchSumUpBalance(sessionStorage.getItem("token"));
                FetchAllCategories(sessionStorage.getItem("token"));
                FetchAllAccounts(sessionStorage.getItem("token"));
            }
            else {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addAccountModalCloseBtn").click()
                document.getElementById("addAccountModal").style.display = "none"
                //showAlert("Failed", "Not Able to Add Your Account, Please Add it once Again", "alert-danger");
                showAlert("Failed", response.msg, "alert-danger");
            }
        }
    }

    // #region editMyAccount
    // Function to get the Edit Account Name and Edit it using API
    async function editMyAccount(itemno, accountId, token) {

        // Getting all the values from the form
        var editedAccountName = document.getElementById(`updatedAccountName${itemno}`).value;

        if (editedAccountName === "") {
            showAlert("Error", "Your Fields are Empty", "alert-danger");
        }
        else {
            console.log("All Things looks good !!");
            var newAccountData = {
                "accountName": editedAccountName,
            }
            console.log("New Account", newAccountData);

            var response = await AccountAPIController.editAccount(accountId, newAccountData, token);

            if (response.status.toLowerCase() === "success") {
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(sessionStorage.getItem("token"));
                FetchSumUpBalance(sessionStorage.getItem("token"));
                FetchAllCategories(sessionStorage.getItem("token"));
                FetchAllAccounts(sessionStorage.getItem("token"));
            }
            else {
                // After a successful submission, hiding the modal & showing the message for that
                document.getElementById("addAccountModalCloseBtn").click()
                document.getElementById("addAccountModal").style.display = "none"
                //showAlert("Failed", "Not Able to Add Your Account, Please Add it once Again", "alert-danger");
                showAlert("Failed", response.msg, "alert-danger");
            }
        }
    }

    // #region editMyIncomeRecord
    const editMyIncomeRecord = async (index, recordId) => {
        var dateTime = document.getElementById(`updatedDateTime${index}`).value;
        var amount = document.getElementById(`updatedAmount${index}`).value;
        var description = document.getElementById(`updatedDescription${index}`).value;
        var account = document.getElementById(`updatedAccount${index}`).value;
        var category = document.getElementById(`updatedCategory${index}`).value;

        var IncomeUpdatedData = {
            incomeDateTime: dateTime,
            incomeAmount: amount,
            incomeDescription: description,
            incomeAccount: account,
            incomeCategory: category
        }

        console.log(IncomeUpdatedData);

        var response = await IncomeAPIController.editIncomeRecord(recordId, IncomeUpdatedData);

        if (response.status.toLowerCase() === "success") {
            showAlert("Success", response.msg, "alert-success");
            FetchAllTransactions(sessionStorage.getItem("token"));
            FetchSumUpBalance(sessionStorage.getItem("token"));
            FetchAllCategories(sessionStorage.getItem("token"));
            FetchAllAccounts(sessionStorage.getItem("token"));
        }
        else {
            showAlert("Failed", response.msg, "alert-danger");
        }
    }

    // #region editMyExpenseRecord
    const editMyExpenseRecord = async (index, recordId) => {
        var dateTime = document.getElementById(`updatedDateTime${index}`).value;
        var amount = document.getElementById(`updatedAmount${index}`).value;
        var description = document.getElementById(`updatedDescription${index}`).value;
        var account = document.getElementById(`updatedAccount${index}`).value;
        var category = document.getElementById(`updatedCategory${index}`).value;

        var ExpenseUpdatedData = {
            expenseDateTime: dateTime,
            expenseAmount: amount,
            expenseDescription: description,
            expenseAccount: account,
            expenseCategory: category
        }

        console.log(ExpenseUpdatedData);

        var response = await ExpenseAPIController.editExpenseRecord(recordId, ExpenseUpdatedData);

        if (response.status.toLowerCase() === "success") {
            showAlert("Success", response.msg, "alert-success");
            FetchAllTransactions(sessionStorage.getItem("token"));
            FetchSumUpBalance(sessionStorage.getItem("token"));
            FetchAllCategories(sessionStorage.getItem("token"));
            FetchAllAccounts(sessionStorage.getItem("token"));
        }
        else {
            showAlert("Failed", response.msg, "alert-danger");
        }
    }


    // #region transactionIncomeDeleteBtn
    // Function to delete the Income Transaction record
    const transactionIncomeDeleteBtn = async (id, token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await IncomeAPIController.deleteIncome(id, token);
            console.log("Delete Income Response", response)
            if (response.status.toLowerCase() === "success") {
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(token);
                FetchSumUpBalance(token);
            }
            else {
                showAlert("Failed", response.msg, "alert-danger");
            }
        } catch (error) {
            // Handle error if API request fails
            console.error("Error Deleting Income :", error)
        }
    }

    // #region transactionExpenseDeleteBtn
    // Function to delete the Expense Transaction record
    const transactionExpenseDeleteBtn = async (id, token) => {
        try {
            // Calling the Fetch Stats Account API
            let response = await ExpenseAPIController.deleteExpense(id, token);
            console.log("Delete Expense Response", response)
            if (response.status.toLowerCase() === "success") {
                showAlert("Success", response.msg, "alert-success");
                FetchAllTransactions(token);
                FetchSumUpBalance(token);
            }
            else {
                showAlert("Failed", response.msg, "alert-danger");
            }
        } catch (error) {
            // Handle error if API request fails
            console.error("Error Deleting Expense :", error)
        }
    }

    // #region categoryDeleteBtn
    // Function to delete the Category record
    const categoryDeleteBtn = async (id, type, token) => {
        try {
            let response = await CategoryAPIController.deleteCategory(id, token);
            console.log("Delete Category Response", response)
            if (response.status.toLowerCase() === "success") {

                // Update : Now, Deleting all the transactions that include this category
                type === "income" ? await getAllIncomesOfCategory(id) : await getAllExpensesOfCategory(id);
                if (type === "income") {
                    allTransactionCategories && allTransactionCategories.map(async (transaction, index) => {
                        let response = await IncomeAPIController.deleteIncome(transaction._id, token);
                        console.log("Response : ", response)
                    })
                }
                else {
                    allTransactionCategories && allTransactionCategories.map(async (transaction, index) => {
                        let response = await ExpenseAPIController.deleteExpense(transaction._id, token);
                        console.log("Response : ", response)
                    })
                }

                showAlert("Success", response.msg + "Your Transactions with this Category are also deleted !!", "alert-success");

                console.log("Checking ContextStateData Before : ", sumupBalanceResponse)

                FetchSumUpBalance(token);
                FetchAllCategories(token);
                FetchAllTransactions(token);
                FetchAllAccounts(token);

                console.log("Checking ContextStateData After : ", sumupBalanceResponse)



            }
            else {
                showAlert("Failed", response.msg, "alert-danger");
            }
        } catch (error) {
            // Handle error if API request fails
            console.error("Error Deleting Category :", error)
        }
    }

    // #region accountDeleteBtn
    // Function to delete the Account record
    const accountDeleteBtn = async (id, type, token) => {
        try {
            var allDeleted = true;

            // Update : Now, Deleting all the transactions that include this category
            type === "income" ? await getAllIncomesOfAccount(id) : await getAllExpensesOfAccount(id);
            if (type === "income") {
                allTransactionAccounts && allTransactionAccounts.map(async (transaction, index) => {
                    console.log("4PM Data : ", transaction)
                    let response = await IncomeAPIController.deleteIncome(transaction._id, token);
                    console.log("4PM Response : ", response)
                    if (response.status.toLowerCase() === "failed") {
                        allDeleted = false;
                        console.log("## Check Deleted Record NOt Deleted", response)
                    }
                })
                if (allDeleted) {

                    showAlert("Success", "Your Transactions with this Account are also deleted !!", "alert-success");

                    // Now Deleting the Account
                    let response = await AccountAPIController.deleteAccount(id, token);
                    console.log("Delete Account Response 4PM", response)

                    if (response.status.toLowerCase() === "success") {
                        showAlert("Success", "Your Account is Deleted !!", "alert-success");
                    }
                    else {
                        showAlert("Failed", "Your Account is NOT Deleted !!", "alert-danger");
                    }

                    console.log("4PM : Checking ContextStateData Before : ", sumupBalanceResponse)

                    FetchSumUpBalance(token);
                    FetchAllCategories(token);
                    FetchAllTransactions(token);
                    FetchAllAccounts(token);

                    console.log("4PM : Checking ContextStateData After : ", sumupBalanceResponse)
                }
            }
            else {
                allTransactionAccounts && allTransactionAccounts.map(async (transaction, index) => {
                    console.log("4PM Data : ", transaction)
                    let response = await ExpenseAPIController.deleteExpense(transaction._id, token);
                    console.log("4PM Response : ", response)
                    if (response.status.toLowerCase() === "failed") {
                        allDeleted = false;
                        console.log("## Check Deleted Record NOt Deleted", response)
                    }
                })
                if (allDeleted) {

                    showAlert("Success", "Your Transactions with this Account are also deleted !!", "alert-success");

                    // Now Deleting the Account
                    let response = await AccountAPIController.deleteAccount(id, token);
                    console.log("Delete Account Response 4PM", response)

                    if (response.status.toLowerCase() === "success") {
                        showAlert("Success", "Your Account is Deleted !!", "alert-success");
                    }
                    else {
                        showAlert("Failed", "Your Account is NOT Deleted !!", "alert-danger");
                    }

                    console.log("4PM : Checking ContextStateData Before : ", sumupBalanceResponse)

                    FetchSumUpBalance(token);
                    FetchAllCategories(token);
                    FetchAllTransactions(token);
                    FetchAllAccounts(token);

                    console.log("4PM : Checking ContextStateData After : ", sumupBalanceResponse)
                }
            }

        } catch (error) {
            // Handle error if API request fails
            console.error("Error Deleting Account :", error)
            showAlert("Failed", "Error Deleting the Account !", "alert-danger");
        }
    }

    // #region Notes
    // Function to Add a Note
    const addNote = async (title, description, tags) => {

        let response = await NotesController.addNote(title, description, tags)
        const addNoteResponse = await response.json();

        // Checking
        console.log("New Note : ", addNoteResponse);

        // Now, adding all the notes in the userNotes state variable and will display all the notes from database !
        // This change is because we have added the msg and status field in the note response
        setuserNotes(userNotes.concat(addNoteResponse.savedNote))

        console.log(userNotes);

        // Returning the response object as we have to show alert message
        return addNoteResponse;
    }

    // Function to Edit a Note
    const editNote = async (id, title, description, tags) => {

        let response = await NotesController.editNote(id, title, description, tags);
        const editedNote = await response.json()

        console.log("Note is Edited !!");

        // fetchAllNotes();  // ====> We can do that but, it will increase the api requests because for update note, we call api for 2 time get API + fetch API

        // Copying the userNotes state variable and editing them
        let newuserNotes = JSON.parse(JSON.stringify(userNotes))

        for (let index = 0; index < newuserNotes.length; index++) {
            const element = newuserNotes[index];
            // console.log(element);
            // Finding the Note that we have to edit
            if (element._id === id) {
                console.log("Editing");
                // Editing title, description and tags
                // We cannot edit the state variable directly, we have to use the setuserNotes set state function
                // userNotes[index].title = title;
                // userNotes[index].description = description;
                // userNotes[index].tags = tags;
                newuserNotes[index].title = title;
                newuserNotes[index].description = description;
                newuserNotes[index].tags = tags;

                // Now, closing the Loops as we don't have any other note to edit
                break
            }
        }

        // console.log(newuserNotes); // Checking
        // Now, setting the newuserNotes in the userNote State Variable
        setuserNotes(newuserNotes)

        // Returning Response Data to show the Alert Message !
        return editedNote;
    }

    // Function to Delete a Note
    const deleteNote = async (id) => {

        let response = await NotesController.deleteNote(id);

        // parses JSON response into native JavaScript objects and using await as the function is asynchronus function
        const deletedNote = await response.json();

        console.log("Deleting the note !!", deletedNote);

        console.log(deletedNote);
        console.log(deletedNote["status"]);

        // Showing the Alert Message
        if (deletedNote.status === "success")
            showAlert("Success", deletedNote.msg, "alert-success")
        else
            showAlert("Error", deletedNote.msg, "alert-danger")

        // let usersWithoutTim = userNotes.filter(user => user.name !== "Tim");
        // Using the filter function and using that we will not allow the note to be included
        let notesWithoutdeletedNote = userNotes.filter((note) => note._id !== id)

        // Adding the note in the userNotes state variable
        setuserNotes(notesWithoutdeletedNote)
    }

    // Function to Fetch all Note From the Database using the Backend API
    const fetchAllNotes = async () => {

        console.log("Fetching All Notes !");

        let response = await NotesController.fetchNotes();
        const allNotesFromDb = await response.json();

        // Now, adding all the notes in the userNotes state variable and will display all the notes from database !
        setuserNotes(allNotesFromDb)
    }

    // Function to Delete the User with the id and token
    const deleteUser = async (id) => {
        let response = await UserAPIController.deleteUser(sessionStorage.getItem("token"), id);

        FetchAllTransactions(sessionStorage.getItem("token"));
        FetchSumUpBalance(sessionStorage.getItem("token"));
        FetchAllCategories(sessionStorage.getItem("token"));
        FetchAllAccounts(sessionStorage.getItem("token"));
        FetchAllUsers(sessionStorage.getItem("token"));

        showAlert(response.status, response.msg, response.status.toLowerCase() === "success" ? "alert-success" : "alert-danger")
    }

    // Function to Delete the User with the id and token
    const editUser = async (id, data) => {
        let response = await UserAPIController.editUserAPI(sessionStorage.getItem("token"), id, data);

        FetchAllTransactions(sessionStorage.getItem("token"));
        FetchSumUpBalance(sessionStorage.getItem("token"));
        FetchAllCategories(sessionStorage.getItem("token"));
        FetchAllAccounts(sessionStorage.getItem("token"));
        FetchAllUsers(sessionStorage.getItem("token"));

        showAlert(response.status, response.msg, response.status.toLowerCase() === "success" ? "alert-success" : "alert-danger")
    }


    // #region Returning Things
    return (

        // we will pass all the things in value that we have to pass
        // Passing the State and function which will update it
        // Here, {state,updateState} ===> {state:state, updateState:updateState}
        // Passing the userNotes and updateNotes in the context
        <MyContext.Provider value={
            {
                alert,
                // user,
                showAlert,
                // fetchUser,
                formattedDateTime: UtilsController.formattedDateTime,
                // setuserInfo,
                moveToTop: UtilsController.moveToTop,
                // downloadFile,
                adjustToIndianTime: UtilsController.adjustToIndianTime,

                // Variables
                sumupBalanceResponse,
                allTransactions,
                allCategories,
                allAccounts,
                allTransactionCategories,
                allTransactionAccounts,
                allUsers,
                userNotes,

                // Login Component Function
                getInfoAPI: UserAPIController.getInfoAPI,
                loginAPI: UserAPIController.loginAPI,
                handleLogin,

                // Signup Component Function
                handleSignup,

                // For User Account Sumup
                getAccountBalanceSumUp: AccountAPIController.getAccountBalanceSumUp,
                getAllAccounts: AccountAPIController.getAllAccounts,

                // For Transactions
                getAllTransactions: AccountAPIController.getAllTransactions,

                // For Categories
                getAllCategories: CategoryAPIController.getAllCategories,

                // For Incomes
                getAllIncomesOfAccount,

                // For Expense
                getAllExpensesOfAccount,

                // All Fetching things
                FetchSumUpBalance,
                FetchAllAccounts,
                FetchAllTransactions,
                FetchAllCategories,

                // For Submitting the FOrm (Add Income)
                submitMyIncomeRecord,
                submitMyExpenseRecord,
                submitMyCategoryRecord,
                submitMyAccountRecord,

                // Delete Button Click Functions
                transactionIncomeDeleteBtn,
                transactionExpenseDeleteBtn,
                categoryDeleteBtn,
                accountDeleteBtn,

                // Getting the Incomes as per Category
                getAllIncomesOfCategory,
                getAllExpensesOfCategory,

                // Editing
                editMyCategory,
                editMyAccount,
                editMyIncomeRecord,
                editMyExpenseRecord,

                // Mapping Category Wise Amount
                getCategoryWiseAmount: UtilsController.getCategoryWiseAmount,

                // Notes
                addNote,
                editNote,
                deleteNote,
                fetchAllNotes,

                // Users Functions
                FetchAllUsers,
                deleteUser,
                editUser

            }
        }>
            {props.children}
        </MyContext.Provider>
    );

}

export default MyState;