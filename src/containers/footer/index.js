import React, { Component } from 'react';
import './style.css';

export default class Footer extends Component {

  render() {
    const today = new Date();
    return (
      <div className="site-footer">
      <p className="copyright"> &copy; {today.getFullYear()}  Niklas Dahlqvist</p>
      <p className="tools"> Built with React &amp; Redux</p>
      </div>
    );
  }
}
