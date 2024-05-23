import React from 'react';
import Table from './components/Table';
import Summary from './components/Summary';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="left">
        <Table isHadir={false} mahasiswa={[]} />
      </div>
      <div className="center">
        <Summary />
      </div>
      <div className="right">
        <Table isHadir={true} mahasiswa={[]} />
      </div>
    </div>
  );
};

export default AdminDashboard;
