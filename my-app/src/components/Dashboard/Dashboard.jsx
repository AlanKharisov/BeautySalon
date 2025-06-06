import React, { useContext, useEffect } from 'react';
import { CrmContext } from '../../context/CrmContext';
import StatsCards from './StatsCards';
import AppointmentsTable from './AppointmentsTable';
import Button from '../common/Button';
import { FaPlus, FaUserPlus, FaCalendarDay } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { appointments, clients, services } = useContext(CrmContext);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [stats, setStats] = useState({
    clientsToday: 0,
    incomeToday: 0,
    appointmentsToday: 0,
    popularService: ''
  });

  useEffect(() => {
    const today = formatDate(new Date());
    const todayApps = appointments.filter(a => a.date === today);
    setTodayAppointments(todayApps);
    
    const completedToday = todayApps.filter(a => a.status === 'completed').length;
    const income = todayApps
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => {
        const service = services.find(s => s.id === a.serviceId);
        return sum + (service ? service.price : 0);
      }, 0);
    
    const popularService = getPopularService();
    
    setStats({
      clientsToday: completedToday,
      incomeToday: income,
      appointmentsToday: todayApps.length,
      popularService: popularService ? popularService.name : 'Немає даних'
    });
  }, [appointments, services]);

  const getPopularService = () => {
    // Реализация аналогична вашему коду
  };

  const formatDate = (date) => {
    // Реализация форматирования даты
  };

  return (
    <div className="dashboard-page">
      <div className="stats-cards">
        <StatCard 
          title="Клієнти сьогодні" 
          value={stats.clientsToday} 
        />
        <StatCard 
          title="Дохід сьогодні" 
          value={`${stats.incomeToday} ₴`} 
        />
        <StatCard 
          title="Заплановано візитів" 
          value={stats.appointmentsToday} 
        />
        <StatCard 
          title="Популярна послуга" 
          value={stats.popularService} 
        />
      </div>

      <div className="quick-actions">
        <Button 
          primary 
          icon={<FaPlus />} 
          label="Новий запис" 
          onClick={() => setShowAppointmentModal(true)} 
        />
        <Button 
          icon={<FaUserPlus />} 
          label="Додати клієнта" 
          onClick={() => setShowClientModal(true)} 
        />
        <Button 
          icon={<FaCalendarDay />} 
          label="Перегляд розкладу" 
          onClick={() => setActivePage('schedule')} 
        />
      </div>

      <h2>Сьогоднішні записи</h2>
      <AppointmentsTable appointments={todayAppointments} />
    </div>
  );
};

export default Dashboard;