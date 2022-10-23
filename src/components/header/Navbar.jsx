import React from "react";
import { Link, NavLink } from "react-router-dom";
import '../../styles/Navbar.css'
export default function Navbar() {
    return(
        <nav className="navbar-container">
            <div className="navbar-brand">
                <Link to ='/' >
                    <h1>Poke-App</h1>
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to ='/home' activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to= '/Add' activeClassName="active">Add</NavLink>
                </li>
                <li>
                    <NavLink to='/added'>Added</NavLink>
                </li>
            </ul>
        </nav>
    )
}