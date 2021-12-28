import React from "react";
import { NavLink } from "react-router-dom";

const SiteHeader = () => {
    return (
        <header className="site-header">
            <p className="title">React SID Player</p>
            <nav className="site-navigation">
                <ul>
                    <li>
                        <NavLink to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/about"}>About</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default SiteHeader;
