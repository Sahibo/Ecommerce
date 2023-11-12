import '../../global.css'
import './styles/organisms.css'

import CollapsibleHeader from "../molecules/CollapsibleHeader"
import GendersHeader from "../molecules/GendersHeader"
import AccountNavigationHeader from "../molecules/AccountNavigationHeader"

import React, { useState } from 'react';


export default function Header() {

  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
    
  };

  return (
    <div className="navbar-container" onMouseLeave={handleMouseLeave}>
      <header className="header-container">
        <GendersHeader handleMouseEnter={handleMouseEnter}/>
        <AccountNavigationHeader/>
      </header>
      <div className='submenu-container'>
        {/* <CollapsibleHeader /> */}
        {!isCollapsed && <CollapsibleHeader />}
      </div>
    </div>
  );
}

