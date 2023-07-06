import React, { useState } from 'react'
import {GiHamburgerMenu} from "react-icons/gi"
import {FiSettings} from "react-icons/fi"
import {AiOutlineSearch} from "react-icons/ai"
import "./Header.css"
const Header = ({profile,onSidebar}) => {
    const [state,setState] = useState(false)
  return (
    <div className='header' style={{marginBottom:"40px"}}>
            <div className='icon-search'>
                    <AiOutlineSearch className='search-icon'/>
                    <GiHamburgerMenu onClick={()=>{setState(!state); onSidebar(state)}}/>
                    <input type='text' placeholder='Search...'/>
            </div>
            {/* <div className='profile'>
                <FiSettings/>
                <div className='profile-info'>
                            <h5>Hosni Garfala</h5>
                            <p>ybi3 fil batikh</p>
                </div>
            </div> */}
    </div>
  )
}

export default Header