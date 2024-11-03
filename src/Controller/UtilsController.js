// Function to get the Date Time for the input datetime-local
export const adjustToIndianTime = () => {
    // Get the current date and time in UTC
    var now = new Date(Date.UTC());

    // Adjust the time to GMT+5:30 (Indian Standard Time)
    now.setHours(now.getUTCHours() + 5); // Add 5 hours
    now.setMinutes(now.getUTCMinutes() + 30); // Add 30 minutes

    // Format the adjusted date and time as a string compatible with datetime-local input
    // The format should be YYYY-MM-DDTHH:MM (e.g., "2024-04-15T08:30")
    var formattedDateTime = now.toISOString().slice(0, 16);

    return formattedDateTime;
}

// Function to format the Date that we got from database
export const formattedDateTime = (datetimeString) => {

    console.log(datetimeString)

    // Creating a Date Object
    const datetime = new Date(datetimeString);
    console.log("DT Test : ",datetime)

    // Converting the Time into the Local Time Zone
    // datetime.toLocaleString('en-US', { timeZone: 'Asia/Calcutta' })

    // Getting the hrs from the time string
    let dateHrs = datetime.getHours()
    console.log("Time Test : ",dateHrs)

    // Getting the min from the time string
    let dateMins = datetime.getMinutes()
    console.log("Time Test : ",dateMins)

    const months = ["Jan", "Feb", "Mar", "Apr", "MayJun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Finding the am pm notation from the string
    let ampm = "";

    // Converting the 24 hours into 12 hours and finding the ampm notation
    if (dateHrs > 12) {
        ampm = "PM";
        dateHrs = dateHrs - 12;
    }
    else if (dateHrs === 12) {
        ampm = "PM";
    }
    else {
        ampm = "AM";
    }

    // Adding zero in beginning of the single digit numbers
    const addZero = (text) => {
        // console.log("text :", text);
        if (text >= 0 && text <= 9) {
            return "0" + text
        }
        return text;
    }

    // Formatting Time from hrs, min, and ampm notation
    const noteTime = addZero(dateHrs) + ":" + addZero(dateMins) + " " + ampm;

    // Formatting Date from date,month and year
    const noteDate = addZero(datetime.getDate()) + " " + addZero(months[datetime.getMonth()]) + " " + datetime.getFullYear()

    // Checking
    console.log("Format DT : ",noteDate,noteTime);

    // Returning the Date and Time in a form of String
    return `${noteDate} ${noteTime}`;
}

// Function to move the Page to Top
export const moveToTop = () => {
    // Move the Page to the top 
    document.body.scrollIntoView({
        behavior: "smooth",
    });

}

// Function to convert data to category-wise amount usage
export const getCategoryWiseAmount = (data) => {
    const categoryWiseAmount = {};

    // Iterate through each entry in the data array
    data.forEach(entry => {
        const { category, amount } = entry;
        // If category already exists, add amount to existing total, otherwise initialize it
        if (categoryWiseAmount[category]) {
            categoryWiseAmount[category] += amount;
        } else {
            categoryWiseAmount[category] = amount;
        }
    });

    console.log("CW Data : ",categoryWiseAmount)

    return categoryWiseAmount;
}

// Function to Download the File or Material !
// export const downloadFile = async (filepath, filename) => {

//     console.log("Download Process 1")
//     try {
//         const response = await axios.get(`${host}/api/download`, {
//             responseType: 'blob', // Important for handling binary data
//             params: {
//                 filepath: filepath,
//                 // Add more parameters as needed
//             },
//         });

//         // Create a link element and initiate the download
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);

//     }
//     catch (error) {
//         console.error('Error downloading file:', error);
//     }
// }