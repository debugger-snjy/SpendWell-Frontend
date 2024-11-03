export const fetchNotes = async () => {
    // Adding the API Call to fetch all the notes
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
        method: "GET", // As fetchallnotes is a GET method

        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',

            // Adding the auth-token hardcore till now !
            "auth-token": sessionStorage.getItem("token"),
        },

        // No need of body as we will not pass anything in the body
    });
    return response;
}

export const deleteNote = async (id) => {
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
        method: "DELETE", // As deleteNote is a DELETE method

        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',

            // Adding the auth-token hardcore till now !
            "auth-token": sessionStorage.getItem("token"),
        },

        // No need of body as we will not pass anything in the body
    });

    return response
}

export const editNote = async (id, title, description, tags) => {

    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
        method: "PUT", // As editnote is a PUT method

        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',

            // Adding the auth-token hardcore till now !
            "auth-token": sessionStorage.getItem("token"),
        },

        body: JSON.stringify({ title, description, tags })
    })

    return response;
}

export const addNote = async (title, description, tags) => {

    if (tags === "") {
        tags = "Default";
    }

    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
        method: "POST", // As fetchallnotes is a GET method

        headers: {
            "Content-Type": "application/json",

            // Adding the auth-token hardcore till now !
            "auth-token": sessionStorage.getItem("token"),
        },

        body: JSON.stringify({ title, description, tags })
    });

    return response;
}