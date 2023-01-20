import RequireAuth from '../components/shared/require-auth/RequireAuth';
import AboutUs from '../pages/about/AboutUs';
import ContactUs from '../pages/about/ContactUs';
import Chat from '../pages/chat/Chat';
import HomePage from '../pages/home/Home.page';
import ViewOrder from '../pages/order/ViewOrder';
import ProductDetails from '../pages/product/ProductDetails';
import ProductsByCategory from '../pages/product/ProductsByCategory';
import Cart from '../pages/user/cart/Cart';
import Checkout from '../pages/user/checkout/Checkout';
import Orders from '../pages/user/order/Orders';
import Payments from '../pages/user/payment/Payments';

export const userRoutes = [
	{
		path: '/',
		exact: true,
		name: 'Home',
		component: <HomePage />,
		requireAuth: true,
		hide: true,
	},{
		path: '/product/:id',
		exact: true,
		name: 'Product',
		component: <ProductDetails/>,
		requireAuth: false,
	  hide: true,
	},{
		path: '/cart',
		exact: true,
		name: 'Cart',
		component: <RequireAuth role={"user"}><Cart/></RequireAuth>,
		requireAuth: true,
		
	},{
		path: '/chat',
		exact: true,
		name: 'Chat',
		component: <RequireAuth role={"user"}><Chat/></RequireAuth>,
		requireAuth: true,

	},{
		path: '/orders',
		exact: true,
		name: 'My Orders',
		component: <RequireAuth role={"user"}><Orders/></RequireAuth>,
		requireAuth: true,
	},{
		path: '/Payments',
		exact: true,
		name: 'My Payments',
		component: <RequireAuth role={"user"}><Payments/></RequireAuth>,
		requireAuth: true,
		
	},{
		path: '/about',
		exact: true,
		name: 'About Us',
		component: <AboutUs/>,
		requireAuth: true,
		
	},{
		path: '/contact',
		exact: true,
		name: 'Contact Us',
		component: <ContactUs/>,
		requireAuth: true,
	},{
		path: '/category/:id/:name',
		exact: true,
		name: 'Category',
		component: <ProductsByCategory/>,
		requireAuth: true,
		hide: true,
	},{
		path: '/checkout',
		exact: true,
		name: 'Checkout',
		component: <RequireAuth role={"user"}><Checkout/></RequireAuth>,
		requireAuth: true,
		hide: true,
	},{
		path: '/order/:id',
		exact: true,
		name: 'Order',
		component: <RequireAuth role={"user"}><ViewOrder/></RequireAuth>,
		requireAuth: true,
		hide: true,
	}
];
