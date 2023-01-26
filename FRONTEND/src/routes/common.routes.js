import NoAuth from '../components/shared/require-auth/NoAuth';
import AboutUs from '../pages/about/AboutUs';
import ContactUs from '../pages/about/ContactUs';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import HomePage from '../pages/home/Home.page';
import ProductDetails from '../pages/product/ProductDetails';
import ProductsByCategory from '../pages/product/ProductsByCategory';

export const commonRoutes = [
	{
		path: '/',
		exact: true,
		name: 'Home',
		component: <HomePage />,
		requireAuth: false,
	},
	{
		path: '/login',
		name: 'Login',
		component: (
			<NoAuth>
				<Login />
			</NoAuth>
		),
		requireAuth: false
	},
	{
		path: '/register',
		name: 'Register',
		component: (
			<NoAuth>
				<Register />
			</NoAuth>
		),
		requireAuth: false
	},{
		path: '/product/:id',
		exact: true,
		name: 'Product',
		component: <ProductDetails/>,
		requireAuth: false,
	  hide: true,
	},{
		path: '/about',
		exact: true,
		name: 'About Us',
		component: <AboutUs/>,
		requireAuth: false,
	},{
		path: '/contact',
		exact: true,
		name: 'Contact Us',
		component: <ContactUs/>,
		requireAuth: false,
	},{
		path: '/category/:id/:name',
		exact: true,
		name: 'Category',
		component: <ProductsByCategory/>,
		requireAuth: false,
		hide: true,
	}
];
