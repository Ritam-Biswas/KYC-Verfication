import React from 'react'
import './Navbar.css'

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">KYC Wizard</div>
                <ul className="navbar-links">
                    <li><a href="/about">Why KYC</a></li>
                    <li><a href="/about">KYC Steps</a></li>
                </ul>
                <button className="get-started-btn">Get Started</button>
            </nav>
        </>
    )
}

export default Navbar