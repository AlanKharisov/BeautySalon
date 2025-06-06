import React, { useContext } from 'react';
import { CrmContext } from '../../../context/CrmContext';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import { FaCheck, FaEdit } from 'react-icons/fa';
import './Dashboard.css';

const AppointmentsTable = ({ appointments }) => {
  const { clients, masters, services, completeAppointment } = useContext(CrmContext);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Час</th>
            <th>Клієнт</th>
            <th>Майстер</th>
            <th>Послуга</th>
            <th>Статус</th>
            <th>Оплата</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            const client = clients.find(c => c.id === appointment.clientId);
            const master = masters.find(m => m.id === appointment.masterId);
            const service = services.find(s => s.id === appointment.serviceId);

            if (!client || !master || !service) return null;

            return (
              <tr key={appointment.id}>
                <td>{appointment.time}</td>
                <td>{client.name}</td>
                <td>{master.name}</td>
                <td>{service.name}</td>
                <td>
                  <StatusBadge 
                    status={appointment.status} 
                    text={
                      appointment.status === 'completed' ? 'Завершено' : 
                      appointment.status === 'no-show' ? 'Не прийшов' : 'Очікується'
                    } 
                  />
                </td>
                <td>
                  <StatusBadge 
                    status={appointment.paid ? 'completed' : 'no-show'} 
                    text={appointment.paid ? 'Сплачено' : 'Не сплачено'} 
                  />
                </td>
                <td>
                  <Button 
                    small 
                    icon={<FaCheck />} 
                    onClick={() => completeAppointment(appointment.id)} 
                  />
                  <Button 
                    small 
                    icon={<FaEdit />} 
                    onClick={() => editAppointment(appointment.id)} 
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;