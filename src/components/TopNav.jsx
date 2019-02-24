import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const TopNav = () => {
    return (
        <div className="d-flex flex-row-reverse mr-5">
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
            </Nav>
        </div>
    );
};

export default TopNav;
