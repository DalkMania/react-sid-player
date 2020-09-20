import React from 'react'

const SiteFooter = () => {
   const today = new Date();
   return (
    <footer className="site-footer">
      <p className="copyright"> &copy; {today.getFullYear()}  Niklas Dahlqvist</p>
      <p className="tools"> Built with React</p>
    </footer>
   ) 
}

export default SiteFooter;