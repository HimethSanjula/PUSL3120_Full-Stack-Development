import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../store/auth';
import { Link, useLocation } from 'react-router-dom';
import { commonRoutes, adminRoutes, userRoutes } from '../../../routes';
import './Navbar.styles.css';
import ProfileIcon from '../../user/profile-icon/ProfileIcon';
import CartIcon from '../../user/cart-icon/CartIcon';
import useWindowSize from '../../../hooks/useWindowSize';
import ProductService from '../../../services/Product.service';
import Loading from '../loading/Loading';

const Navbar = () => {
	const { getRole, isAuthenticated } = useContext(AuthContext);
	// eslint-disable-next-line no-unused-vars
	const [width, height] = useWindowSize();
	const [categories, setCategories] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const path = useLocation().pathname;
	const role = getRole();
	const isAuth = isAuthenticated();

	const routes = [...commonRoutes];
	if (role === 'admin') {
		routes.push(...adminRoutes);
	} else if (role === 'user') {
		routes.push(...userRoutes);
	}

	useEffect(() => {
		ProductService.getCategories()
			.then((res) => {
				if (res.length > 0) {
					setCategories(res);
				}
			})
			.finally(() => {
				setCategoriesLoading(false);
			});
	}, []);
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>
						<h3 className='logo'>Shoplaza</h3>
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNavDropdown'
						aria-controls='navbarNavDropdown'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse'
						id='navbarNavDropdown'>
						<ul className='navbar-nav ml-auto py-4 py-md-0'>
							<li className='nav-item dropdown nav-item-user'>
								<span
									className='nav-link dropdown-toggle'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'>
									Categories
								</span>
								<ul
									className='dropdown-menu'
									aria-labelledby='navbarDropdown'>
									{categoriesLoading ? (
										<Loading />
									) : (
										<>
											{categories.length > 0 ? (
												categories.map((category) => {
													return (
														<li key={category._id}>
															<Link
																className='dropdown-item'
																to={`/category/${category._id}/${category.name}`}>
																{category.name}
															</Link>
														</li>
													);
												})
											) : (
												<li>No categories found</li>
											)}
										</>
									)}
								</ul>
							</li>
							{routes.map((route, index) => {
								return route.hide ||
									route.requireAuth !== isAuth ? null : (
									<li
										className={`nav-item nav-item-user pl-4 pl-md-0 ml-0 ml-md-4 ${
											path === route.path ? 'active' : ''
										}`}
										key={index}>
										<Link
											className='nav-link'
											to={route.path}>
											{route.name}
										</Link>
									</li>
								);
							})}
						</ul>
						{width < 992 && isAuth && (
							<>
								<CartIcon />
								<ProfileIcon />
							</>
						)}
					</div>
					{width >= 992 && isAuth && (
						<>
							<CartIcon />
							<ProfileIcon />
						</>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
