import request from '../utils/axios.util';
import { getAuthHeader } from '../utils/utils';

export const getProducts = () => {
	return request({
		url: 'products',
		method: 'get',
		headers: getAuthHeader()
	});
};

export const getProductsAdmin = () => {
	return request({
		url: 'products/admin',
		method: 'get',
		headers: getAuthHeader()
	});
};
// get product
export const getProduct = (id) => {
  return request({
    url: `products/${id}`,
    method: 'get',
  });
};

//get categories
export const getCategories = () => {
	return request({
		url: 'categories',
		method: 'get'
	});
};

// add product 
export const addProduct = (payload) => {
  return request({
    url: 'products',
    method: 'post',
    data: payload,
    headers: getAuthHeader()
  });
};

// update product
export const updateProduct = (id, payload) => {
  return request({
    url: `products/${id}`,
    method: 'put',
    data: payload,
    headers: getAuthHeader()
  });
};

// delete product
export const deleteProduct = (id) => {
  return request({
    url: `products/${id}`,
    method: 'delete',
    headers: getAuthHeader()
  });
};

export const getReivews = (id) => {
  return request({
    url: `products/review/${id}`,
    method: 'get',
  });
}

const addReview = (id, payload) => {
  return request({
    url: `products/review/${id}`,
    method: 'post',
    data: payload,
    headers: getAuthHeader()
  });
}

const createCategory = (payload) => {
  return request({
    url: 'categories',
    method: 'post',
    data: payload,
    headers: getAuthHeader()
  });
}

const updateCategory = (id, payload) => {
  return request({
    url: `categories/${id}`,
    method: 'put',
    data: payload,
    headers: getAuthHeader()
  });
}

const deleteCategory = (id) => {
  return request({
    url: `categories/${id}`,
    method: 'delete',
    headers: getAuthHeader()
  });
}

const getProductsByCategory = (id) => {
  return request({
    url: `products/category/${id}`,
    method: 'get',
  });
}

const ProductService = {
	getProducts,
	getProductsAdmin,
  getCategories,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getReivews,
  addReview,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory
};

export default ProductService;
