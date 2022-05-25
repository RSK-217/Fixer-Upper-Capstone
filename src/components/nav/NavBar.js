import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
           
            <li className="navbar__item active">
                <Link className="navbar__link" to="/form">New Project</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/projects">My Projects</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/contractors">My Contractors</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("fixer_user")
                    }
                }>Log Out</Link>
            </li>
            
        </ul>
    )
}