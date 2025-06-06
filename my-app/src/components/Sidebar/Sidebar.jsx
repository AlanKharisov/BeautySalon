import React from 'react';
import { FaSpa, FaHome, FaUsers, FaCalendarAlt, FaCut, FaUserTie, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', icon: <FaHome />, label: 'Головна' },
    { id: 'clients', icon: <FaUsers />, label: 'Клієнти' },
    { id: 'schedule', icon: <FaCalendarAlt />, label: 'Розклад' },
    { id: 'services', icon: <FaCut />, label: 'Послуги' },
    { id: 'masters', icon: <FaUserTie />, label: 'Майстри' },
    { id: 'settings', icon: <FaCog />, label: 'Налаштування' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2><FaSpa /> BeautyCRM</h2>
      </div>
      <div className="nav-menu">
        {navItems.map(item => (
          <div 
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;