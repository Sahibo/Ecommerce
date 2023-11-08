import '../../global.css'
import './styles/header.css'

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
        <GendersHeader handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <AccountNavigationHeader/>
      </header>
      {!isCollapsed && <CollapsibleHeader />}
    </div>
  );
}

