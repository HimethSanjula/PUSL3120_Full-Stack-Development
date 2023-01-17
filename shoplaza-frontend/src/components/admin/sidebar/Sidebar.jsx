import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import { AuthContext } from '../../../store/auth';
import { getRouteValues } from '../../../utils/utils';
import MobileSidebar from './MobileSidebar';
import './sidebar.styles.css';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { getUser, logout } = useContext(AuthContext);
  const user = getUser();
	// eslint-disable-next-line no-unused-vars
	const [width, height] = useWindowSize();
	const routes = getRouteValues('admin');
	return (
		<>
			{width < 700 ? (
				<MobileSidebar user={user} logout={logout} image={`https://avatars.dicebear.com/v2/avataaars/${user.id}.svg`}/>
			) : (
				<div
					className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-fixed'
					style={{ width: '280px', height: '100vh' }}>
					<Link
						to='/'
						className='d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none'>
						
						<span className='fs-4'>Shoplaza</span>
					</Link>
					<hr />
					<ul className='nav nav-pills flex-column mb-auto'>
						{routes.map((route, index) => {
							return route.hide || !route.requireAuth ? null : (
								<SidebarItem
									key={index}
									name={route.name}
									link={route.path}
									requireAuth={route.requireAuth}
                  icon={route.icon}
                  homePath={route.homePath}
								/>
							);
						})}
					</ul>

					<hr />
					<div className='dropdown'>
						<span
							className='d-flex align-items-center text-white text-decoration-none dropdown-toggle'
							id='dropdownUser1'
							data-bs-toggle='dropdown'
							aria-expanded='false'>
							<img
								src={`https://avatars.dicebear.com/v2/avataaars/${user.id}.svg`}
								alt=''
								width='32'
								height='32'
								className='rounded-circle me-2'
							/>
							<strong>{user && user.name}</strong>
						</span>
						<ul
							className='dropdown-menu dropdown-menu-dark text-small shadow'
							aria-labelledby='dropdownUser1'>

							<li>
								<hr className='dropdown-divider' />
							</li>
							<li>
								<button className='dropdown-item' onClick={logout}>
									Sign out
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
