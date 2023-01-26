import request from '../utils/axios.util';
import { getAuthHeader } from '../utils/utils';

export const getCart = () => {
  return request({
    url: 'cart',
    method: 'get',
    headers: getAuthHeader()
  });
}

export const addToCart = (body) => {
  return request({
    url: `cart`,
    method: 'post',
    headers: getAuthHeader(),
    data: body
  });
}

export const updateCart = (body) => {
  return request({
    url: `cart/update`,
    method: 'put',
    headers: getAuthHeader(),
    data: body
  });
}

export const deleteItemFromCart = (id) => {
  return request({
    url: `cart/remove/${id}`,
    method: 'delete',
    headers: getAuthHeader(),
  });
}


// export service
const CartService = {
  getCart,
  addToCart,
  updateCart,
  deleteItemFromCart
}


export default CartService;
