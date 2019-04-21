import React, { useContext, useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import { ACCESS_TOKEN } from '../constants';
import GlobalContext from '../context/GlobalContext';
import './TopNav.css';

const navStyles = {
    borderBottom: '#e5e5e5',
    padding: '20px 5px'
};

const logout = () => {
    // delete access token
    if (localStorage.getItem(ACCESS_TOKEN)) {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    // redirect user
    window.location.href = '/';
};

const TopNav = () => {
    const globalContext = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = globalContext;

    return (
        <Navbar color="white" light expand="md" style={navStyles} className="top-nav">
            <div className="container d-flex justify-content-between">
                <NavbarBrand href="/">
                    <i className="fas fa-trophy" /> Teachie Awards
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/" className="nav-link" activeClassName="active">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/about" className="nav-link" activeClassName="active">
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/events" className="nav-link" activeClassName="active">
                                Events
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/winners" className="nav-link" activeClassName="active">
                                Winners
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/register" className="nav-link" activeClassName="active">
                                Register
                            </NavLink>
                        </NavItem>

                        {user.username ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <span>{user.username}</span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={logout}>Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            <NavLink tag={RRNavLink} exact to="/signin" className="nav-link" activeClassName="active">
                                Sign In
                            </NavLink>
                        )}
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
};

export default TopNav;
