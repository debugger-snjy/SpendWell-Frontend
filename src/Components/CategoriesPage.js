import React, { useContext, useEffect, useState } from 'react'

import MyContext from '../Context/MyContext'
import CategoryItem from './Items/CategoryItems';
import AdminHeader from './Items/AdminHeader';
import CustomerHeader from './Items/CustomerHeader';
import { useNavigate } from 'react-router-dom';

function CategoriesPage() {

    const contextData = useContext(MyContext);
    const navigateTo = useNavigate()

    const [dataLoaded, setDataLoaded] = useState(); // State to track if data is loaded

    const FetchSumUpAgain = () => {
        console.log("Category Item Deleted !!");
        contextData.FetchSumUpBalance(sessionStorage.getItem("token"));
    }
    const FetchCategoryAgain = () => {
        console.log("Category Item Deleted !!");
        contextData.FetchAllCategories(sessionStorage.getItem("token"));
    }
    const FetchTransactionsAgain = () => {
        contextData.FetchAllTransactions(sessionStorage.getItem("token"));
    }

    useEffect(() => {


        if (!sessionStorage.getItem("user") || !sessionStorage.getItem("token")) {

            sessionStorage.clear()

            contextData.showAlert("Failed", "Your Are Not Logged In, Kindly Log In into Your Account", "alert-danger")
            navigateTo("/");

        }
        else if (sessionStorage.getItem("role").toLowerCase() !== "customer") {
            contextData.showAlert("Unauthorize", "You Are Not Allowed to Access this Page", "alert-danger")
            navigateTo("/");
        }
        else {
            const fetchData = async () => {
                await contextData.FetchAllTransactions(sessionStorage.getItem("token"))
                await contextData.FetchSumUpBalance(sessionStorage.getItem("token"));
                await contextData.FetchAllCategories(sessionStorage.getItem("token"));
                setDataLoaded(true); // Set dataLoaded to true after data is fetched
            };

            fetchData(); // Call fetchData function

        }
    }, []); // Add contextData as dependency to useEffect

    return (
        <>

            {
                sessionStorage.getItem("role")!==null && sessionStorage.getItem("role").toLowerCase() === "admin" ?
                    <AdminHeader contextData={contextData} /> :
                    <CustomerHeader contextData={contextData} />
            }

            <h3 className='text-white my-2 mx-3'>Your Categories</h3>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-3">
                {
                    contextData.allCategories && contextData.allCategories["categories"].map(
                        (category, index) => {
                            return (
                                <CategoryItem data={category} itemNo={index} key={index} updateFetchSumUp={FetchSumUpAgain} updateCategories={FetchCategoryAgain} updateTransactions={FetchTransactionsAgain} />
                            )
                        }
                    )
                }
            </div>

        </>
    )
}

export default CategoriesPage
