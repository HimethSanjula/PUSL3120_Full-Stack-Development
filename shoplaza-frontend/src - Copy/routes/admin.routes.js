import RequireAuth from '../components/shared/require-auth/RequireAuth';
import { AdminDashboard } from '../pages/admin';
import AddCategory from '../pages/admin/cateogry/AddCategory';
import UpdateCategory from '../pages/admin/cateogry/UpdateCategory';
import ViewCategories from '../pages/admin/cateogry/ViewCategories';
import ViewOrders from '../pages/admin/order/ViewOrders';
import AddProduct from '../pages/admin/product/AddProduct';
import UpdateProduct from '../pages/admin/product/UpdateProduct';
import ViewProducts from '../pages/admin/product/ViewProducts';
import AdminChatRoom from '../pages/chat/AdminChatRoom';
import ViewOrder from '../pages/order/ViewOrder';
import ProductDetails from '../pages/product/ProductDetails';

export const adminRoutes = [
	{
		path: '/',
		exact: true,
		name: 'Home',
    icon : 'bi-house-door-fill',
		component: (
			<RequireAuth role={'admin'}>
				<AdminDashboard name="admin"/>
			</RequireAuth>
		),
		requireAuth: true,
    hide: true
	},{
		path: '/admin',
		exact: true,
		name: 'Home',
    homePath : ['/'],
    icon : 'bi-house-door-fill',
		component: (
			<RequireAuth role={'admin'}>
				<AdminDashboard name="admin"/>
			</RequireAuth>
		),
		requireAuth: true
	},{
		path: '/admin/chat',
		exact: true,
		name: 'Chat',
		icon : 'bi-chat-square-text-fill',
		component: (
			<RequireAuth role={'admin'}>
				<AdminChatRoom/>
			</RequireAuth>
		),
		requireAuth: true,
	},{
    path: '/admin/products',
    exact: true,
    name: 'Products',
    icon : 'bi-cart-fill',
    component: (
      <RequireAuth role={'admin'}>
        <ViewProducts/>
      </RequireAuth>
    ),
    requireAuth: true

  },{
    path: '/admin/products/add',
    exact: true,
    name: 'Add Product',
    icon : 'bi-plus-circle-fill',
    component: (
      <RequireAuth role={'admin'}>
        <AddProduct/>
      </RequireAuth>
    ),
    requireAuth: true
  },{
		path: '/admin/products/edit/:id',
		exact: true,
		name: 'Edit Products',
		icon : 'bi-pencil-square',
		component: (
			<RequireAuth role={'admin'}>
				<UpdateProduct/>
			</RequireAuth>
		),
		requireAuth: true,
		hide: true
	},{
		path: '/product/:id',
		exact: true,
		name: 'Product',
		component: <ProductDetails/>,
		requireAuth: false,
	  hide: true,
	},{
		path: '/admin/category',
		exact: true,
		name: 'Categories',
		icon : 'bi-list-ul',
		component: (
			<RequireAuth role={'admin'}>
				<ViewCategories/>
			</RequireAuth>
		),
		requireAuth: true,
	},{
		path: '/admin/category/edit/:id',
		exact: true,
		name: 'Edit Category',
		icon : 'bi-pencil-square',
		component: (
			<RequireAuth role={'admin'}>
				<UpdateCategory/>
			</RequireAuth>
		),
		requireAuth: true,
		hide: true
	},{
		path: '/admin/category/add',
		exact: true,
		name: 'Add Category',
		icon : 'bi-plus-circle-fill',
		component: (
			<RequireAuth role={'admin'}>
				<AddCategory />
			</RequireAuth>
		),
		requireAuth: true,
	}, {
		path: '/admin/orders',
		exact: true,
		name: 'Orders',
		icon : 'bi-cart-check-fill',
		component: (
			<RequireAuth role={'admin'}>
				<ViewOrders />
			</RequireAuth>
		),
		requireAuth: true,
	},{
		path: 'admin/order/:id',
		exact: true,
		name: 'Order',
		component: <RequireAuth role={"admin"}><ViewOrder/></RequireAuth>,
		requireAuth: true,
		hide: true,
	}
];
