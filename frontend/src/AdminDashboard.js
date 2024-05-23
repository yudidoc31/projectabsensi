import React from 'react';
import LeftTable from './components/LeftTable';
import Summary from './components/Summary';
import RightTable from './components/RightTable';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="left">
        <LeftTable />
      </div>
      <div className="center">
        <Summary />
      </div>
      <div className="right">
        <RightTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
