import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../../components/shared';
import MainLayout from '../../../layouts/MainLayout';
import OrderService from '../../../services/Order.service';

const Payments = () => {
	const [loading, setLoading] = useState(true);
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		OrderService.getMyTransactions()
			.then((res) => {
				setPayments(res);
			})
			.catch((err) => {
				console.log(err);
				toast.error('Error fetching payments');
			})
			.finally(() => {
				setLoading(false);
			});

		// eslint-disable-next-line no-unused-vars
	}, []);
	return (
		<MainLayout>
			<div
				className='container'
				style={{
					minHeight: '50vh'
				}}>
				<h1>My Payments</h1>

				<div className='row'>
					<div className='col-md-12'>
						{loading ? (
							<div className='text-center'>
								<Loading />
							</div>
						) : payments.length > 0 ? (
							<div className='table-responsive'>
								<table className='table table-bordered'>
									<thead>
										<tr>
											<th>Payment Id</th>
											<th>Order</th>
											<th>Payment Date</th>
											<th>Card Type</th>
											<th>Card</th>
											<th>Status</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>
										{payments.map((payment) => (
											<tr key={payment._id}>
												<td>
													{payment._id.substring(
														payment._id.length - 6
													)}
												</td>
												<td>
													<Link
														to={`/order/${payment.order}`}>
														{payment.order.substring(
															payment.order
																.length - 6
														)}
													</Link>
												</td>
												<td>
													{new Date(
														payment.createdAt
													).toLocaleDateString()}
												</td>
												<td>{payment.paymentMethod}</td>
												<td>
                            **** **** ****  {payment.card}
                        </td>
												<td>{payment.paymentResult ? "Paid" : "Failed"}</td>
												<td>LKR {payment.amount}</td>
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

export default Payments;
