import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../../components/shared';
import MainLayout from '../../../layouts/MainLayout';
import OrderService from '../../../services/Order.service';

const Orders = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// fetch orders
		OrderService.getMyOrders()
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
	return (
		<MainLayout>
			<div className='container' style={{
        minHeight: '50vh'
      }}>
				<h1>Orders</h1>

				<div className='row'>
					<div className='col-md-12'>
						{loading ? (
							<div className='text-center'>
								<Loading />
							</div>
						) : orders.length > 0 ? (
							<div className='table-responsive'>
								<table className='table table-bordered'>
									<thead>
										<tr>
											<th>Order Id</th>
											<th>Order Date</th>
											<th>Order Status</th>
											<th>Order Total</th>
										</tr>
									</thead>
									<tbody>
										{orders.map((order) => (
											<tr key={order._id}>
												<td>
													<Link to={`/order/${order._id}`} state={{
														order
													}}>
                          	{order._id.substring(order._id.length - 6)}
                          </Link>
                        </td>
												<td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
												<td>{order.orderStatus}</td>
												<td>LKR {order.totalPrice}</td>
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
		</MainLayout>
	);
};

export default Orders;
