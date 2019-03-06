import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const navStyles = {
    background: '#fff',
    borderBottom: '#e5e5e5',
    padding: '10px 5px'
};

const TopNav = () => {
    return (
        <div className="border-bottom border-primary" style={navStyles}>
            <div className="container d-flex justify-content-between">
                <h2>Teachie Awards</h2>
                <div className="d-flex flex-row-reverse">
                    <Nav>
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
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to="/signin" className="nav-link" activeClassName="active">
                                Sign In
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
