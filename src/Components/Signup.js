import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assests/SpendWellLogo.png'
import "../CSS/style.css"
import MyContext from '../Context/MyContext';

function Signup() {

    // Using the function to get the data from the context
    const contextData = useContext(MyContext);
    const navigateTo = useNavigate()
    console.log("Hello Signup");

    useEffect(() => {
        const role = sessionStorage.getItem("role")
        if (sessionStorage.getItem("token")) {
            navigateTo(`/dashboard/${role}`)
        }
    })

    return (
        <>
            <div className='loginPage mb-5'>

                <div className="container-fluid mb-5">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 text-center px-0">
                            <img src={logoImg} width={"400px"} alt="Website Logo" className='logoImg' />
                            <div className="fs-5 fw-bold text-uppercase text-center text-white mt-4 designedFont mx-4">"Smart Spending Made Simple: SpendWell, Your Money Mentor"</div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 px-0">
                            <div className="loginForm text-white">

                                <hr className='hrStyle container-fluid ' />

                                <div className="fs-5 fw-bold text-center">SpendWell: Take control of your finances, achieve your financial goals.</div>

                                <hr />

                                <form>
                                    <div className="mb-3 mx-4">
                                        <div className="form-group">
                                            <input type="text" className="form-control focus-ring signupInputField mb-1" maxLength={30} name="userName" id="userName" placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="mb-3 mx-4">
                                        <div className="form-group">
                                            <input type="email" className="form-control focus-ring signupInputField mb-1" name="userEmail" id="userEmail" placeholder="Email Address" />
                                        </div>
                                    </div>
                                    <div className="mb-3 mx-4">
                                        <div className="form-group">
                                            <input type="password" className="form-control focus-ring signupInputField mb-1" minLength={5} name="userPassword" id="userPassword" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="mb-3 mx-4">
                                        <div className="form-group">
                                            <input type="tel" className="form-control focus-ring signupInputField mb-1" name="userPhone" id="userPhone" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div className="mb-3 mx-4">
                                        <label htmlFor="userEmail" className='menutextStyle fs-5 mb-1'>Gender</label>

                                        <div className="form-check mx-3">
                                            <input className="form-check-input" type="radio" name="usergender" id="genderMale" />
                                            <label className="form-check-label menutextStyle" htmlFor="genderMale">
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check mx-3">
                                            <input className="form-check-input" type="radio" name="usergender" id="genderFemale" />
                                            <label className="form-check-label menutextStyle" htmlFor="genderFemale">
                                                Female
                                            </label>
                                        </div>
                                    </div>

                                    <button className='btn btn-primary centerIt loginBtn' onClick={contextData.handleSignup} >Sign Up</button>

                                </form>

                                <div className="container mt-3 mySignupLink fw-bold">
                                    <center>
                                        Already Have an Account, <a href='/'>Log in</a>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Signup