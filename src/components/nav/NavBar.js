import React from "react"
import { Nav, NavItem, NavLink } from "reactstrap"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <div>
            <Nav className='navbar'>
                <NavItem className='navbar-item'>
                    <NavLink className='navbar-link'
                        active
                        href="/form">
                        New Project
                    </NavLink>
                </NavItem>
                <NavItem className='navbar-item'>
                    <NavLink className='navbar-link'
                        active
                        href="/projects">
                        Projects
                    </NavLink>
                </NavItem>
                <NavItem className='navbar-item'>
                    <NavLink className='navbar-link'
                        active
                        href="/contractors">
                        Contractors
                    </NavLink>
                </NavItem>
                <NavItem>
                    <h1 className='navbar-title'>Fixer Upper</h1>
                </NavItem>
                <NavItem className='navbar-item' style={{position: 'absolute', right: 0}}>
                    <NavLink className='navbar-link'
                        active
                        href="/login"
                        onClick={() => { localStorage.removeItem("fixer_user") }}>
                        Logout
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default NavBar









        // <ul className="navbar">

        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/form">New Project</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/projects">My Projects</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/contractors">My Contractors</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="#"
        //         onClick={
        //             () => {
        //                 localStorage.removeItem("fixer_user")
        //             }
        //         }>Log Out</Link>
        //     </li>

        // </ul>
