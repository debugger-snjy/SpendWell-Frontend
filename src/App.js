import './App.css';

// Importing Route and Routes for the Routing
// import { Route, Routes, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';

// Importing ContextState 
import Login from './Components/Login';
import ContextState from "./Context/ContextState"
import Alert from './Components/Alert';
import ErrorPage from './Components/ErrorPage';
import Signup from './Components/Signup';
import DashboardPage from './Components/Dashboard';
import IncomePage from './Components/IncomesPage';
import ExpensePage from './Components/ExpensesPage';
import CategoriesPage from './Components/CategoriesPage';
import AccountPage from './Components/AccountsPage';
import AboutPage from './Components/About';
import AllTransactionPage from './Components/AllTransactions';
import MiniStatementPage from './Components/MiniStatement';
import StatisticsPage from './Components/Statistics';
import Notes from './Components/Notes';
import AdminDashboardPage from './Components/AdminDashboard';
import UsersPage from './Components/AllUsers';

function App() {

    return (
        <>
            {/* Adding all other inside it means that we want to use it all them */}
            {/* Allow to access state variables inside all the stats */}
            <ContextState>


                {/* Adding Navigation Bar */}
                <Navbar />

                {/* Adding the Alert Component which will be modified later */}
                <div className="alertspace">
                    <Alert title="SAMPLE" message="Your Message will be displayed Here" effect="alert-success" />
                </div>

                <div className="container-fluid px-3" id='websiteContent'>

                    {/* Adding and Setting the Routers */}
                    <Routes>

                        {/* About Page */}
                        <Route exact path='/about' element={<AboutPage />} />

                        {/* Login Route */}
                        <Route exact path='/' element={<Login />} />
                        <Route exact path='/signup' element={<Signup />} />

                        {/* Define a "Error" route for unmatched routes */}
                        <Route path="/error_page" element={<ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />

                        {/* Admin Routes */}
                        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
                        <Route path="/dashboard/admin/users" element={<UsersPage />} />
                        <Route path="/dashboard/admin/transactions" element={<AllTransactionPage />} />
                        <Route path="/dashboard/admin/mstatement" element={<MiniStatementPage />} />
                        <Route path="/dashboard/admin/statistics" element={<StatisticsPage />} />
                        <Route path="/dashboard/admin/notes" element={<Notes />} />

                        {/* Customer Routes */}
                        <Route path="/dashboard/customer" element={<DashboardPage />} />
                        <Route path="/dashboard/customer/incomes" element={<IncomePage />} />
                        <Route path="/dashboard/customer/expenses" element={<ExpensePage />} />
                        <Route path="/dashboard/customer/categories" element={<CategoriesPage />} />
                        <Route path="/dashboard/customer/accounts" element={<AccountPage />} />
                        <Route path="/dashboard/customer/transactions" element={<AllTransactionPage />} />
                        <Route path="/dashboard/customer/mstatement" element={<MiniStatementPage />} />
                        <Route path="/dashboard/customer/statistics" element={<StatisticsPage />} />
                        <Route path="/dashboard/customer/notes" element={<Notes />} />

                    </Routes>
                </div>

            </ContextState>
        </>
    );
}

export default App;
