import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({link, name, icon, isMobile, homePath=[] }) => {
  let isActive = false;
  // get current path
  const currentPath = window.location.pathname;
  // if current path is the same as the link, set isActive to true
  if (currentPath === link || homePath.includes(currentPath)) {
    isActive = true;
  }

	return (
		<li className='nav-item'>
			<Link
				to={link}
				className={`nav-link ${isActive ? 'active' : ''} d-flex text-light ${isMobile ? 'nav-link py-3 border-bottom' : ''}`}
				aria-current='page'>
				<i className={`bi ${icon} mx-2`} width='24' height='24'></i>
				{ !isMobile && name}
			</Link>
		</li>
	);
};

export default SidebarItem;
