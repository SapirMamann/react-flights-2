import React, { useState } from 'react';

import { CheckGroup } from '../../api/auth/CheckGroup';


export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
  
  return (
    <div className="sidebar-container">
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        
        {/* content for sidebar */}
        <ul className='sidebar-links'>
          <li><a href="/bla">Bla</a></li>

          {/* admin logged in-> he can also see this */}
          <CheckGroup groups={['Administrator']}>
            <li><a href="/">All countries</a></li>
            <li><a href="/users">All users</a></li>
          </CheckGroup>
        </ul>
      </div>
    </div>
  );
}
  