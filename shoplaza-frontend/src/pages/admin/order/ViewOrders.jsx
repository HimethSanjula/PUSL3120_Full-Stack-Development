import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../../components/shared';
import AdminLayout from '../../../layouts/AdminLayout';
import OrderService from '../../../services/Order.service';

const ViewOrders = () => {
  const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// fetch orders
		OrderService.getAdminOrders()
			.then((res) => {
				setOrders(res);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
  return(
    <AdminLayout>
      		<div className='' style={{
        minHeight: '50vh'
      }}>
				<h1>View Orders</h1>

				<div className='row'>
					<div className='col-md-12'>
						{loading ? (
							<div className='text-center'>
								<Loading />
							</div>
						) : orders.length > 0 ? (
							<div className='table-responsive'>
								<table className='table table-bordered table-striped'>
									<thead>
										<tr>
											<th>Order Id</th>
                      <th>user</th>
											<th>Order Date</th>
											<th>Order Status</th>
                      <th>payment</th>
											<th>Total</th>
											<th>Delivered</th>
										</tr>
									</thead>
									<tbody>
										{orders.map((order) => (
											<tr key={order._id}>
												<td>
                          <Link to={`/admin/order/${order._id}`} state={{
														order
													}}>
                          {order._id.substring(order._id.length - 6)}
                          </Link>
                        </td>
                        <td>{order.user.name}</td>
												<td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
												<td>{order.orderStatus}</td>
												<td>{order.isPaid ? "Paid": "Not Paid"}</td>
												<td>LKR {order.totalPrice}</td>
												<td>{order.isDelivered ? "Yes" : "No"}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<h3>No orders found</h3>
						)}
					</div>
				</div>
			</div>
    </AdminLayout>
  );
};

export default ViewOrders;