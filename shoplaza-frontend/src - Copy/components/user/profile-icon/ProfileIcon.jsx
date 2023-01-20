import React, { useContext } from 'react';
import { AuthContext } from '../../../store/auth';

const ProfileIcon = () => {
	const { logout, getUser } = useContext(AuthContext);
	const user = getUser();
	return (
		<ul className='navbar-nav ml-3 py-4 py-md-0'>
			<li className='dropdown'>
				<span
					className='nav-link dropdown-toggle'
					href='#'
					id='navbarDropdownMenuLink'
					role='button'
					data-bs-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'>
					<img
						src={`https://avatars.dicebear.com/v2/avataaars/${user.id}.svg`}
						width='40'
						height='40'
						className='rounded-circle'
						alt='profile'
					/>
				</span>
				<div
					className='dropdown-menu'
					aria-labelledby='navbarDropdownMenuLink'>
					<button className='dropdown-item' onClick={logout}>
						Log Out
					</button>
				</div>
			</li>
		</ul>
	);
};

export default ProfileIcon;
