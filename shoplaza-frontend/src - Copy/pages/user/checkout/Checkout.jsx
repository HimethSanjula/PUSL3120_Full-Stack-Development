import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '../../../components/shared';
import BillingDetails from '../../../components/user/billing-details/BillingDetails';
import CheckoutProducts from '../../../components/user/checkout-products/CheckoutProducts';
import Payment from '../../../components/user/payment/Payment';
import MainLayout from '../../../layouts/MainLayout';
import OrderService from '../../../services/Order.service';
import { AuthContext } from '../../../store/auth';
import { CartContext } from '../../../store/cart.store';
import {
	checkQTYandRemoveIfNotAvailableOrBalanceQty,
	prepareProductData
} from '../../../utils/utils';

const Checkout = () => {
	const data = useLocation();
	const { getUser } = useContext(AuthContext);
	const {clear} = useContext(CartContext);
	const user = getUser();
	const navigate = useNavigate();
	const [cart, setCart] = useState([]);
	const [orderLoading, setOrderLoading] = useState(false);
	const [orderComplete, setOrderComplete] = useState(false);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const [orderData, setOrderData] = useState({
		name: user.name,
		products: [],
		totalPrice: 0,
		deliveryAddress: '',
		state: '',
		city: '',
		zip: ''
	});

	const [paymentDetails, setPaymentDetails] = useState({
		cardType: 'credit',
		cardNumber: '',
		cardName: '',
		cardExpiry: '',
		cardCvv: ''
	});

	useEffect(() => {
		if (data.state) {
			if (data.state.cart) {
				setCart(
					checkQTYandRemoveIfNotAvailableOrBalanceQty(data.state.cart)
				);
			} else {
				toast.error('No data');
			}
		} else {
			toast.error('No data');
		}
	}, [data]);

	const onPaymentDetailsChange = (e) => {
		setPaymentDetails({
			...paymentDetails,
			[e.target.name]: e.target.value
		});
	};

	const onOrderDataChange = (e) => {
		setOrderData({
			...orderData,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const total = cart.reduce((acc, item) => {
			return acc + item.quantity * item.product.price;
		}, 0)
		if (validate()) {
			console.log('validated');
			const orderPayload = {
				...orderData,
				products: prepareProductData(cart),
				totalPrice: total,
				paymentMethod: paymentDetails.cardType
			};
			console.log(orderPayload);
			const orderId = await createOrder(orderPayload);
			console.log(orderId);
			if(orderId !== ''){
				await pay(orderId, total);
			}
		}
	};

	const createOrder = async (orderPayload) => {
		// use OrderService to create order, return order id
		let orderId = '';
		setOrderLoading(true);
		await OrderService.createOrder(orderPayload)
			.then((res) => {
				orderId = res._id;
				clear();
				setCart([]);
				setOrderComplete(true);
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setOrderLoading(false);
			});
		return orderId;
	};
	const pay = async (orderId, total) => {
		const paymentPayload = {
			order : orderId,
			amount: total,
			card: paymentDetails.cardNumber.slice(-4),
			paymentMethod: paymentDetails.cardType
		}
		OrderService.makePayment(paymentPayload).then((res) => {
			console.log(res);
			toast.success('Payment Successful');
			navigate('/orders');
		}).catch((err) => {
			toast.error(err.message);
		}).finally(() => {
			setPaymentLoading(false);
		});
	}
	const validate = () => {
		console.log(orderData);
		if (
			orderData.deliveryAddress === '' ||
			orderData.state === '' ||
			orderData.city === '' ||
			orderData.zip === ''
		) {
			toast.error('Please fill all the fields in billing details');
			return false;
		}
		if (
			paymentDetails.cardNumber === '' ||
			paymentDetails.cardName === '' ||
			paymentDetails.cardExpiry === '' ||
			paymentDetails.cardCvv === ''
		) {
			toast.error('Please fill all the fields');
			return false;
		}
		// check if card number is valid
		if (paymentDetails.cardNumber.length !== 16) {
			toast.error('Please enter a valid card number');
			return false;
		}
		// check if card expiry is valid
		const expiry = paymentDetails.cardExpiry.split('/');
		if (expiry.length !== 2) {
			toast.error('Please enter a valid card expiry');
			return false;
		}
		if (expiry[0].length !== 2 || expiry[1].length !== 2) {
			toast.error('Please enter a valid card expiry');
			return false;
		}
		// check if cvv is valid
		if (paymentDetails.cardCvv.length !== 3) {
			toast.error('Please enter a valid card cvv');
			return false;
		}
		return true;
	};
	return (
		<MainLayout>
			<div className='container'>
				<h1>
					{!data.state
						? "Seems like you don't have enough data to access this page"
						: 'Checkout'}
				</h1>
				<>
					<div className='row g-5 pt-3'>
						<CheckoutProducts products={cart} />
						<div className='col-md-7 col-lg-8'>
							{orderLoading ? (
								<Loading />
							) : orderComplete ? (
								<div className='text-center'>
									<h1>Order Placed</h1>
									<p>Please wait for the transaction.</p>
								</div>
							) : (
								<BillingDetails
									data={orderData}
									onChange={onOrderDataChange}
								/>
							)}
							{paymentLoading ? (
								<Loading />
							) : (
								<Payment
									data={paymentDetails}
									onChange={onPaymentDetailsChange}
								/>
							)}
							<hr className='my-4' />
							<button
								className='w-100 btn btn-primary btn-lg'
								type='submit'
								onClick={onSubmit}>
								Place Order
							</button>
						</div>
					</div>
				</>
			</div>
		</MainLayout>
	);
};

export default Checkout;
