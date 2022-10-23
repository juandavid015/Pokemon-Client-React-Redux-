import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";

export default function Header() {
    return (
        <header className="header">
            <Route path={'/'} component={Navbar}></Route>
        </header>
    )
}