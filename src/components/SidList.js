import React from 'react'
import { Link } from 'react-router-dom'
import ln1_cover from '../assets/images/ln1_cover.jpg'
import ln2_cover from '../assets/images/ln2_cover.jpg'
import ln3_cover from '../assets/images/ln3_cover.jpg'
import lnrmx_cover from '../assets/images/lnrmx_cover.jpg'


const SidList = () => {
  return (
    <ul className="sid-list">
        <li>
            <Link to="/player/1">
            <img src={ln1_cover} alt="Last Ninja 1 Soundtrack" /> 
            </Link>
        </li>
        <li>
            <Link to="/player/2">
            <img src={ln2_cover} alt="Last Ninja 2 Soundtrack" /> 
            </Link>
        </li>
        <li>
            <Link to="/player/3">
            <img src={ln3_cover} alt="Last Ninja 3 Soundtrack" /> 
            </Link>
        </li>
        <li>
            <Link to="/player/4">
            <img src={lnrmx_cover} alt="Last Ninja Remix Soundtrack" /> 
            </Link>
        </li>
    </ul>
  )
}

export default SidList