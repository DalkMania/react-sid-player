import React from 'react'

const Footer = () => {
    const today = new Date();
    return (
      <div className="site-footer">
      <p className="copyright"> &copy; {today.getFullYear()}  Niklas Dahlqvist</p>
      <p className="tools"> Built with React &amp; Redux</p>
      </div>
    );
}

export default Footer
