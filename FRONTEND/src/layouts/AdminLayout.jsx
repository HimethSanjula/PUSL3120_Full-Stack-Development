import React from 'react';
import Sidebar from '../components/admin/sidebar/Sidebar';

const AdminLayout = ({ ...props }) => {
	return (
		<>
			<div className='d-flex'>
				<Sidebar />
				<div className='admin-container'></div>
				<div
					className='row ps-5'
					style={{
						maxWidth: '100%',
						minWidth: '80%'
					}}>
					<div className='col-md-12'>{props.children}</div>
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
