import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './style.css'

export default class Header extends Component {

  render() {
    const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
      <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
          <Link className={match ? 'active' : ''} to={to}>{label}</Link>
      )}/>
    )

    return (
      <div className="site-header">
        <p className="title">React SID Player</p>
        <nav className="site-navigation">
          <ul>
            <li>
              <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home"/>
            </li>
            <li>
              <OldSchoolMenuLink activeOnlyWhenExact={true} to="/about" label="About"/>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}


