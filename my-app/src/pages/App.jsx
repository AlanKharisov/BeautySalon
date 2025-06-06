import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Clients from './components/Clients/Clients';
import Schedule from './components/Schedule/Schedule';
import Services from './components/Services/Services';
import Masters from './components/Masters/Masters';
import Settings from './components/Settings/Settings';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'schedule':
        return <Schedule />;
      case 'services':
        return <Services />;
      case 'masters':
        return <Masters />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-content">
        <Header />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;