import { adminRoutes } from './admin.routes';
import { userRoutes } from './user.routes';
import { commonRoutes } from './common.routes';
import { Route } from 'react-router-dom';
import NotFound from '../pages/error/NotFound';

export const getRoutes = (role) => {
	let routes = [...commonRoutes];
	if (role === 'admin') {
		routes =adminRoutes;
	} else if (role === 'user') {
		routes =userRoutes;
	} 
	const routeItems = routes.map((route, index) => {
		return (
			<Route
				key={index}
				exact
				path={route.path}
				element={route.component}
			/>
		);
	});

	routeItems.push(
		<Route key={routes.length} path='*' element={<NotFound />} />
	);
	return routeItems;
};

export { commonRoutes } from './common.routes';
export { adminRoutes } from './admin.routes';
export { userRoutes } from './user.routes';