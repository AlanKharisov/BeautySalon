import React, { createContext, useState } from 'react';

export const CrmContext = createContext();

export const CrmProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [settings, setSettings] = useState({
    businessName: "Beauty Salon",
    businessPhone: "+380991234567",
    workingHours: {
      monday: { from: "09:00", to: "20:00" },
      tuesday: { from: "09:00", to: "20:00" },
      wednesday: { from: "09:00", to: "20:00" },
      thursday: { from: "09:00", to: "20:00" },
      friday: { from: "09:00", to: "20:00" },
      saturday: { from: "10:00", to: "18:00" },
      sunday: { from: "10:00", to: "16:00" }
    }
  });

  // Инициализация тестовых данных
  const initializeSampleData = () => {
    // Аналогично вашему исходному коду
  };

  // Все методы для работы с CRM
  const addClient = (client) => {
    setClients([...clients, client]);
  };

  const updateClient = (updatedClient) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  // Другие методы...

  return (
    <CrmContext.Provider value={{
      clients,
      services,
      masters,
      appointments,
      settings,
      addClient,
      updateClient,
      // Другие методы...
    }}>
      {children}
    </CrmContext.Provider>
  );
};