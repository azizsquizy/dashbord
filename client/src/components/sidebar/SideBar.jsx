import React from 'react'
import "./SideBar.css"
import { navItems } from 'data'
import { NavLink} from 'react-router-dom'

const SideBar = () => {
    return (
      <div className='sidebar'>
        {navItems.map((element) => (
          <NavLink
            to={`/${element.text}`}
            className="link"
            activeClassName="active" // Add activeClassName prop to specify the class for the active link
            key={element.text}
          >
            {element.icon}
            <h5>{element.text}</h5>
          </NavLink>
        ))}
      </div>
    );
  };
  export default SideBar