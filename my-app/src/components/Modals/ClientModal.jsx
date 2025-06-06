import React, { useState, useContext } from 'react';
import { CrmContext } from '../../context/CrmContext';
import Button from '../common/Button';
import './Modals.css';

const ClientModal = ({ clientId, onClose }) => {
  const { clients, addClient, updateClient } = useContext(CrmContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    instagram: '',
    notes: ''
  });

  useEffect(() => {
    if (clientId) {
      const client = clients.find(c => c.id === clientId);
      if (client) {
        setFormData({
          name: client.name,
          phone: client.phone,
          instagram: client.instagram,
          notes: client.notes
        });
      }
    }
  }, [clientId, clients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Будь ласка, заповніть обов\'язкові поля (Ім\'я та Телефон)');
      return;
    }

    if (clientId) {
      // Редактирование клиента
      updateClient({
        id: clientId,
        ...formData
      });
    } else {
      // Добавление нового клиента
      addClient({
        id: Date.now(), // Временный ID, в реальном приложении будет с сервера
        ...formData,
        visits: []
      });
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{clientId ? 'Редагувати клієнта' : 'Додати нового клієнта'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="client-name">Ім'я*</label>
              <input 
                type="text" 
                id="client-name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="client-phone">Телефон*</label>
              <input 
                type="tel" 
                id="client-phone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="client-instagram">Instagram</label>
              <input 
                type="text" 
                id="client-instagram" 
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="client-notes">Примітки</label>
              <textarea 
                id="client-notes" 
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>
            <div className="modal-footer">
              <Button secondary label="Скасувати" onClick={onClose} />
              <Button primary type="submit" label="Зберегти" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;