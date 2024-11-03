import React, { useContext, useEffect } from 'react'

import MyContext from '../Context/MyContext'

function AboutPage() {

    return (
        <>
            <h3 className='text-white mt-5'>About Page</h3>

            <h4 className='text-white my-4'>Spendwell - Budget Management System</h4>

            <p className='text-white my-4'>
                SpendWell is a user-friendly web application created to empower individuals and families in effectively managing their finances. It offers more than just income and expense tracking; it provides the necessary tools and insights to reach financial goals.

                SpendWell tackles the widespread issues of overspending and budget maintenance.

                Ways SpendWell Assists Users:

                Planning: Organize and allocate funds wisely
                Tracking: Monitor spending activities
                Control: Manage unnecessary expenses to save money.
            </p>
        </>
    )
}

export default AboutPage
