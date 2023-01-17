import request from '../utils/axios.util';
import { getAuthHeader } from '../utils/utils';

export const createOrder = (body) => {
  return request({
    url: `order`,
    method: 'post',
    headers: getAuthHeader(),
    data: body
  });
}

export const getMyOrders = () => {
  return request({
    url: `order`,
    method: 'get',
    headers: getAuthHeader()
  });
}

export const getOrderById = (id) => {
  return request({
    url: `order/${id}`,
    method: 'get',
    headers: getAuthHeader()
  });
}

export const getAdminOrders = () => {
  return request({
    url: `order/admin`,
    method: 'get',
    headers: getAuthHeader()
  });
}

export const updateStatus = (id, body) => {
  return request({
    url: `order/status/${id}`,
    method: 'put',
    headers: getAuthHeader(),
    data: body
  });
}

export const makePayment = (body) => {
  return request({
    url: `order/payment`,
    method: 'post',
    headers: getAuthHeader(),
    data: body
  });
}

export const getMyTransactions = () => {
  return request({
    url: `order/transactions`,
    method: 'get',
    headers: getAuthHeader()
  });
}

export const updateDeliveryStatus = (id, body) => {
  return request({
    url: `order/delivery/${id}`,
    method: 'put',
    headers: getAuthHeader(),
    data: body
  });
}

// export service
const OrderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAdminOrders,
  updateStatus,
  makePayment,
  getMyTransactions,
  updateDeliveryStatus
}

export default OrderService;