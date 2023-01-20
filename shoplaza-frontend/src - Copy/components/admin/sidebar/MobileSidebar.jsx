import { Link } from 'react-router-dom';
import { getRouteValues } from '../../../utils/utils';
import SidebarItem from './SidebarItem';

const MobileSidebar = ({user, logout, image}) => {
	const routes = getRouteValues('admin');

	return (
		<div
			className='d-flex flex-column flex-shrink-0 text-white bg-dark position-fixed'
			style={{ width: '4.5rem', height: '100vh' }}>
			<Link
				to='/'
				className='d-block p-3 link-dark text-decoration-none'
				title=''
				data-bs-toggle='tooltip'
				data-bs-placement='right'
				data-bs-original-title='Icon-only'>
				<i
					className='bi bi-house-door-fill'
					width='24'
					height='24'
					role='img'
					aria-label='Home'></i>

				<span className='visually-hidden'>Icon-only</span>
			</Link>
			<ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
				{routes.map((route, index) => {
					return route.hide || !route.requireAuth ? null : (
						<SidebarItem
							key={index}
							name={route.name}
							link={route.path}
							requireAuth={route.requireAuth}
							icon={route.icon}
							isMobile={true}
              homePath={route.homePath}
						/>
					);
				})}
			</ul>
			<div className='dropdown border-top'>
				<span
					className='d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle'
					id='dropdownUser3'
					data-bs-toggle='dropdown'
					aria-expanded='false'>
					<img
						src={image}
						width='24'
						height='24'
						className='rounded-circle'
						alt='profile'
					/>
				</span>
				<ul
					className='dropdown-menu text-small shadow'
					aria-labelledby='dropdownUser3'>
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
	);
};

export default MobileSidebar;
