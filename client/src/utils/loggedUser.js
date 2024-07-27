// import React, {useState} from "react";

// export const LoggedUser = () => {

//     const [loggedUser, setLoggedUser] = useState();

//     setLoggedUser(localStorage.getItem('userInfo'));
// }
export default function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('userInfo'));
}