import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input, Alert, Loading } from '../../components/shared';
import AuthService from '../../services/Auth.service';
import { AuthContext } from '../../store/auth';
import { trim } from '../../utils/utils';
import './auth.styles.css';

const Login = ({ role }) => {
	const { setAuthInfo } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		loginError: ''
	});

	// clear errors
	const clearErrors = () => {
		setErrors({
			email: '',
			password: ''
		});
	};

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: trim(e.target.value)
		});
		clearErrors();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validate(data);
		if (Object.keys(errors).length === 0) {
			setLoading(true);
			const { email, password } = data;
			AuthService.login(email, password)
				.then((res) => {
					setLoading(false);
					setAuthInfo(res);
				})
				.catch((err) => {
					setErrors({ ...errors, loginError: err.data.message });
					setLoading(false);
				});
		} else {
			setErrors(errors);
			return;
		}
	};

	const validate = (data) => {
		const errors = {};
		if (!data.email) errors.email = 'Email is required';
		if (!data.password) errors.password = 'Password is required';
		return errors;
	};

	return (
		<div className='d-flex auth-co-wrap'>
			<div id='main-wrapper' className='container m-auto'>
				<div className='row justify-content-center'>
					<div className='col-xl-10'>
						<div className='card border-0'>
							<div className='card-body p-0'>
								<div className='row no-gutters'>
									<div className='col-lg-6'>
										<div className='p-5'>
											<div className='mb-5'>
												<h3 className='h4 font-weight-bold text-theme'>
													Shoplaza Login
												</h3>
											</div>

											<h6 className='h5 mb-0'>
												Welcome back!
											</h6>
											<p className='text-muted mt-2 mb-5'>
												Enter your email address and
												password to login.
											</p>

											<form onSubmit={handleSubmit}>
												<Input
													type='email'
													name='email'
													label='Email address'
													placeholder='Enter email'
													value={data.email}
													onChange={handleChange}
													error={errors.email}
												/>
												<Input
													type='password'
													name='password'
													label='Password'
													placeholder='Password'
													value={data.password}
													onChange={handleChange}
													error={errors.password}
												/>
												{errors.loginError && (
													<Alert
														type={'error'}
														message={
															errors.loginError
														}
													/>
												)}
												<button
													type='submit'
													className='btn btn-theme'>
													{loading ? (
														<Loading />
													) : (
														'Login'
													)}
												</button>
												{/* <Link
													to='#l'
													className='forgot-link float-right text-primary d-block'>
													Forgot password?
												</Link> */}
											</form>
										</div>
									</div>

									<div className='col-lg-6 d-none d-lg-inline-block'>
										<div className='account-block rounded-right'>
											<div className='overlay rounded-right'></div>
											<div className='account-testimonial'>
												<h4 className='text-white mb-4'>
													Experience the eligance!
												</h4>
												<p className='lead text-white'>
													Shoplaza is a e-commerce
													website for fashion items.
													It is a complete solution
													for your online store.
												</p>
												<p>- Shoplaza team</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<p className='text-muted text-center mt-3 mb-0'>
							Don't have an account?{' '}
							<Link
								to='/register'
								className='text-primary ml-1'>
								register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
