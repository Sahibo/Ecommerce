import "../../global.css";
import "./styles/pages.css";
import React from "react";
import { logoutUser } from "../../store/reducer";
 import { useDispatch } from "react-redux";
 
export default function AccountPage() {
    let dispatch = useDispatch()
    const logOut = () => 
    {
        dispatch(logoutUser())
        window.location.reload(); // reload current page
    }
    return (
        <div>
            <button className="btn btn-danger" onClick={() => logOut()}>Exit</button>
        </div>
    );
}
 