import React from 'react';
import MostSoldProducts from '../../../components/admin/most-sold/MostSoldProducts';
import OverviewCards from '../../../components/admin/overview-cards/OverviewCards';
import SalesGraphs from '../../../components/admin/sales-graph/SalesGraph';
import AdminLayout from '../../../layouts/AdminLayout';

const AdminDashboard = ({ name }) => {
	return (
		<AdminLayout>
			<h1>Dashboard</h1>
			<div className='container'>
      <OverviewCards />
      <SalesGraphs/>
      <MostSoldProducts/>
			</div>
		</AdminLayout>
	);
};

export default AdminDashboard;
