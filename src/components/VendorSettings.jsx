
import React, { useState } from 'react';
import './VendorSettings.css';

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    companyName: 'Metro Parking Solutions',
    contactEmail: 'admin@metroparking.com',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Business District, City Center',
    
    // Parking Settings
    hourlyRate: 5.00,
    dailyRate: 25.00,
    monthlyRate: 150.00,
    reservationFee: 2.00,
    cancellationPolicy: '24hours',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    
    // Security
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Business Hours
    businessHours: {
      monday: { open: '06:00', close: '22:00', closed: false },
      tuesday: { open: '06:00', close: '22:00', closed: false },
      wednesday: { open: '06:00', close: '22:00', closed: false },
      thursday: { open: '06:00', close: '22:00', closed: false },
      friday: { open: '06:00', close: '22:00', closed: false },
      saturday: { open: '08:00', close: '20:00', closed: false },
      sunday: { open: '08:00', close: '18:00', closed: false }
    }
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Here you would typically save to backend
    alert('Settings saved successfully!');
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>Company Profile</h3>
              <p>Manage your business information and contact details</p>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Business Address</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );
      
      case 'parking':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>Parking Configuration</h3>
              <p>Set your pricing and parking policies</p>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Hourly Rate ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', parseFloat(e.target.value))}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Daily Rate ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.dailyRate}
                  onChange={(e) => handleInputChange('dailyRate', parseFloat(e.target.value))}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Monthly Rate ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.monthlyRate}
                  onChange={(e) => handleInputChange('monthlyRate', parseFloat(e.target.value))}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Reservation Fee ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.reservationFee}
                  onChange={(e) => handleInputChange('reservationFee', parseFloat(e.target.value))}
                  className="form-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Cancellation Policy</label>
                <select
                  value={settings.cancellationPolicy}
                  onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                  className="form-select"
                >
                  <option value="1hour">1 Hour Before</option>
                  <option value="24hours">24 Hours Before</option>
                  <option value="48hours">48 Hours Before</option>
                  <option value="no-cancellation">No Cancellation</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'hours':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>Business Hours</h3>
              <p>Configure your parking facility operating hours</p>
            </div>
            <div className="business-hours">
              {Object.entries(settings.businessHours).map(([day, hours]) => (
                <div key={day} className="day-row">
                  <div className="day-name">
                    <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                  </div>
                  <div className="day-controls">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={!hours.closed}
                        onChange={(e) => handleBusinessHoursChange(day, 'closed', !e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                    {!hours.closed && (
                      <>
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                          className="time-input"
                        />
                        <span className="time-separator">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                          className="time-input"
                        />
                      </>
                    )}
                    {hours.closed && <span className="closed-text">Closed</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>Notification Preferences</h3>
              <p>Choose how you want to receive updates and alerts</p>
            </div>
            <div className="notification-settings">
              <div className="notification-group">
                <h4>Communication Channels</h4>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Email Notifications</span>
                    <span className="setting-desc">Receive updates via email</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">SMS Notifications</span>
                    <span className="setting-desc">Receive urgent alerts via SMS</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Push Notifications</span>
                    <span className="setting-desc">Browser and mobile app notifications</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="notification-group">
                <h4>Alert Types</h4>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Booking Alerts</span>
                    <span className="setting-desc">New bookings and cancellations</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.bookingAlerts}
                      onChange={(e) => handleInputChange('bookingAlerts', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Payment Alerts</span>
                    <span className="setting-desc">Payment confirmations and issues</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.paymentAlerts}
                      onChange={(e) => handleInputChange('paymentAlerts', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>Security Settings</h3>
              <p>Protect your account with advanced security features</p>
            </div>
            <div className="security-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">Two-Factor Authentication</span>
                  <span className="setting-desc">Add an extra layer of security to your account</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-name">Login Alerts</span>
                  <span className="setting-desc">Get notified of new login attempts</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.loginAlerts}
                    onChange={(e) => handleInputChange('loginAlerts', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="security-actions">
                <button className="btn btn-outline">Change Password</button>
                <button className="btn btn-outline">Download Security Report</button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="vendor-settings">
      <header className="settings-header">
        <div className="header-content">
          <div className="header-left">
            <img 
              src="https://www.ewaysservices.com/images/eways.jpg" 
              alt="Eways Services" 
              className="company-logo"
            />
            <div className="header-text">
              <h1>At Parkkin</h1>
              <p>Vendor Settings Portal</p>
            </div>
          </div>
          <div className="header-right">
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="settings-container">
        <nav className="settings-nav">
          <div className="nav-header">
            <h2>Settings</h2>
          </div>
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-text">Profile</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'parking' ? 'active' : ''}`}
                onClick={() => setActiveTab('parking')}
              >
                <span className="nav-icon">🅿️</span>
                <span className="nav-text">Parking</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'hours' ? 'active' : ''}`}
                onClick={() => setActiveTab('hours')}
              >
                <span className="nav-icon">🕒</span>
                <span className="nav-text">Business Hours</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <span className="nav-icon">🔔</span>
                <span className="nav-text">Notifications</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <span className="nav-icon">🔐</span>
                <span className="nav-text">Security</span>
              </button>
            </li>
          </ul>
        </nav>

        <main className="settings-main">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default VendorSettings;
