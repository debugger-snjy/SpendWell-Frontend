import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import flying_money from "../Images/flying-money.png";
import "../CSS/style.css"
import MyContext from '../Context/MyContext';

function Login() {

    // Using the function to get the data from the context
    const contextData = useContext(MyContext);
    const navigateTo = useNavigate()
    
    console.log("Hello Login");

    useEffect(() => {
        const role = sessionStorage.getItem("role")
        if (sessionStorage.getItem("token")) {
            navigateTo(`/dashboard/${role.toLowerCase()}`)
        }
    })

    return (
        <>
            <div className='loginPage mb-5'>

                <div className="container-fluid mb-5 text-white text-center">
                    <h1 className="fw-bolder app-heading">
                        <img className="flyingMoneyImg" src={flying_money} alt="icon" height="70px" />
                        <span className="mx-2 textShadow">SpendWell</span>
                        <img className="flyingMoneyImg" src={flying_money} alt="icon" height="70px" />
                    </h1>
                    <p className="fs-3 fw-medium">
                        <span className="textShadow">Smart Spending Made Simple: SpendWell, Your Money Mentor</span>
                    </p>
                </div>

                <div className="container">
                    <form>
                        <div className="mb-4 mx-4">
                            <div className="form-group">
                                <input type="email" className="form-control focus-ring inputField mb-1 centerIt" name="userEmail" id="userEmail" placeholder="Email Address" />
                            </div>
                        </div>
                        <div className="mb-3 mx-4">
                            <div className="form-group">
                                <input type="password" className="form-control focus-ring inputField mb-1 centerIt" name="userPassword" id="userPassword" placeholder="Password" />
                            </div>
                        </div>
                        <input type="submit" className='btn btn-success centerIt loginBtn w-25' onClick={contextData.handleLogin} value={"Login"} />
                    </form>
                </div>

                <div className="container mt-3 mySignupLink fw-bold text-white">
                    <center>
                        New to Spendwell, <a href='/signup'>Sign up Here</a>
                    </center>
                </div>

            </div>
        </>
    )
}

export default Login