import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* <h2 className="nav-logo"></h2> */}
                <ul className="nav-links">
                    <li><Link to="/">Realizar Pedido</Link></li>
                    <li><Link to="/cocina">Cocina</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;