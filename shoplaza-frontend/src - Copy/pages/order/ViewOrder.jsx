import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderUpdate from '../../components/admin/order-update/OrderUpdate';
import { Loading } from '../../components/shared';
import AdminLayout from '../../layouts/AdminLayout';
import MainLayout from '../../layouts/MainLayout';
import OrderService from '../../services/Order.service';
import { AuthContext } from '../../store/auth';

const ViewOrder = () => {
	const { getUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState(null);
	const user = getUser();
	const { id } = useParams();
	// if user is not admin use MainLayout else use AdminLayout
	const Layout = user.role === 'admin' ? AdminLayout : MainLayout;

	useEffect(() => {
		OrderService.getOrderById(id)
			.then((res) => {
				setOrder(res);
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout>
			<div className='container'>
				<h1>View Order</h1>
				{loading ? (
					<div className='text-center'>
						<Loading />
					</div>
				) : (
					<div className='row d-flex justify-content-center'>
						<div className='col-md-8'>
							<div className='card'>
								<div className='invoice p-5'>
									<h5>Order {id}</h5>

									<span className='font-weight-bold d-block mt-4'>
										Customer : {order.user.name}
									</span>
									<span>
										This Order is currently:{' '}
										<span
											className='badge rounded'
											style={{
												color: 'black',
												backgroundColor:
													order.orderStatus ===
													'Delivered'
														? 'green'
														: order.orderStatus ===
														  'Processing'
														? 'orange'
														: 'yellow'
											}}>
											{order.orderStatus}
										</span>
									</span>
									{order.isDelivered && (
										<span className='font-weight-bold d-block mt-4'>
											Delivered At :{' '}
											{new Date(
												order.deliveredAt
											).toDateString()}
										</span>
									)}

									<div className='payment border-top mt-3 mb-3 border-bottom table-responsive'>
										<table className='table table-borderless'>
											<tbody>
												<tr>
													<td>
														<div className='py-2'>
															<span className='d-block text-muted'>
																Order Date
															</span>
															<span>
																{/* human readable date */}
																{new Date(
																	order.createdAt
																).toDateString()}
															</span>
														</div>
													</td>

													<td>
														<div className='py-2'>
															<span className='d-block text-muted'>
																Order No
															</span>
															<span>
																{id.slice(0, 6)}
															</span>
														</div>
													</td>

													<td>
														<div className='py-2'>
															<span className='d-block text-muted'>
																Payment
															</span>
															<span>
																{order.isPaid ? (
																	<img
																		src='https://img.icons8.com/color/48/000000/mastercard.png'
																		width='20'
																		alt='mastercard'
																	/>
																) : (
																	<span className='badge badge-danger'>
																		Not Paid
																	</span>
																)}
															</span>
														</div>
													</td>

													<td>
														<div className='py-2'>
															<span className='d-block text-muted'>
																Shiping Address
															</span>
															<span>
																{
																	order.deliveryAddress
																}
																<br />
																{order.city}
																<br />
																{order.state}
															</span>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className='product border-bottom table-responsive'>
										<table className='table table-borderless'>
											<tbody>
												{order.products.map((item) => {
													const product =
														item.product;
													return (
														<tr key={product._id}>
															<td width='20%'>
																<img
																	src={
																		product.image
																	}
																	width='90'
																	alt='product'
																/>
															</td>

															<td width='60%'>
																<span className='font-weight-bold'>
																	{
																		product.name
																	}
																</span>
																<div className='product-qty'>
																	<span className='d-block'>
																		Quantity:
																		{
																			item.quantity
																		}
																	</span>
																	<span>
																		Price:{' '}
																		{
																			item.price
																		}
																	</span>
																</div>
															</td>
															<td width='20%'>
																<div className='text-right'>
																	<span className='font-weight-bold'>
																		LKR{' '}
																		{item.price *
																			item.quantity}
																	</span>
																</div>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>

									<div className='row d-flex justify-content-end'>
										<div className='col-md-5'>
											<table className='table table-borderless'>
												<tbody className='totals'>
													<tr className='border-top border-bottom'>
														<td>
															<div className='text-left'>
																<span className='font-weight-bold'>
																	Subtotal
																</span>
															</div>
														</td>
														<td>
															<div className='text-right'>
																<span className='font-weight-bold'>
																	LKR{' '}
																	{
																		order.totalPrice
																	}
																</span>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<p>
										{order.isDelivered ? (
											<>Order is on the way!</>
										) : (
											<>
												We will be sending shipping
												confirmation email when the item
												shipped successfully!
											</>
										)}
									</p>
									{user.role === 'admin' && (
										<OrderUpdate orderId={id} />
									)}
									{user.role === 'user' && (
										<>
											<p className='font-weight-bold mb-0'>
												Thanks for shopping with us!
											</p>
											<span>Nike Team</span>
										</>
									)}
								</div>

								{user.role === 'user' && (
									<div className='d-flex justify-content-between footer p-3'>
										<span>
											Need Help?
											<Link to='/contact'>
												{' '}
												Contact US
											</Link>
										</span>
										<span>
											{/*  today as human readable date */}
											{new Date().toDateString()}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ViewOrder;
