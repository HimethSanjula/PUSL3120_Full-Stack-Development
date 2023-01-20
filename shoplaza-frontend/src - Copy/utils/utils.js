import {
	adminRoutes,
	userRoutes,
	commonRoutes,
} from '../routes';

export const getType = (name) => {
	if (name === 'password' || name === 'confirm_Password') {
		return 'password';
	}
	if (name === 'email') return 'email';
	return 'text';
};

export const toTitleCase = (str) => {
	const s = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
	return s.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

//remove leading and trailing whitespace
export const trim = (str) => {
	return str.replace(/^\s+|\s+$/g, '');
};

// export const getFormattedDate = (date) => {
// 	return moment(date).format('MMM DD, YYYY');
// }

export const getTime = (dateString) => {
	const date = new Date(dateString);
	return date.getTime();
};

//get token
export const getToken = () => {
	const token = localStorage.getItem('token');
	return token;
};

// get Authentication Header
export const getAuthHeader = () => {
	const token = getToken();
	return {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token
	};
};

// remove empty values from object
export const removeEmptyValues = (obj) => {
	Object.keys(obj).forEach((key) => {
		// check for empty strings empty arrays and empty objects and remove them
		if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
			delete obj[key];
		}
	});
	return obj;
};

export const getRouteValues = (role) => {
	const routes = [...commonRoutes];
	if (role === 'admin') {
		routes.push(...adminRoutes);
	} else if (role === 'user') {
		routes.push(...userRoutes);
	}
	return routes;
};

export const prepareProductData = (cart) => {
	return cart.map((item) => {
		return {
			product: item.product._id,
			quantity: item.quantity,
			price: item.product.price
		};
	});
};

export const checkQTYandRemoveIfNotAvailableOrBalanceQty = (cart) => {
	const newCart = cart.filter((item) => {
		if(item.product.quantity === 0) return false;
		if(item.quantity > item.product.quantity) {
			item.quantity = item.product.quantity;
		}
		return true;
	});
	return newCart;
}