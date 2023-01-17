import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/shared/alert/Alert';
import Input from '../../components/shared/input/Input';
import Loading from '../../components/shared/loading/Loading';
import AuthService from '../../services/Auth.service';
import { AuthContext } from '../../store/auth';
import { getType } from '../../utils/utils';
import './auth.styles.css';

const Register = () => {
	const { setAuthInfo } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirm_Password: '',
		role: 'user'
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		confirm_Password: ''
	});

	// clear errors
	const clearErrors = () => {
		setErrors({
			name: '',
			email: '',
			password: '',
			confirm_Password: '',
			registerError: ''
		});
	};

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
		clearErrors();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate(data);
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			setLoading(true);
			const { name, email, password, role } = data;
			AuthService.register({ name, email, password, role })
				.then((res) => {
					setLoading(false);
					setAuthInfo(res);
				})
				.catch((err) => {
					setErrors({ ...errors, registerError: err.data.message });
					setLoading(false);
				});
		}
	};

	const validate = (data) => {
		const errors = {};
		if (!data.name) errors.name = 'Name is required';
		if (!data.email) errors.email = 'Email is required';
		if (!data.password) errors.password = 'Password is required';
		if (!data.confirm_Password)
			errors.confirm_Password = 'Confirm Password is required';
		if (data.password !== data.confirm_Password)
			errors.confirm_Password = 'Passwords must match';
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
													Shoplaza Register
												</h3>
											</div>

											<h6 className='h5 mb-0'>
												Welcome to Shoplaza!
											</h6>
											<p className='text-muted mt-2 mb-5'>
												Enter details to register your account.
											</p>

											<form onSubmit={handleSubmit}>
												{Object.keys(data).map(
													(key) => {
														return (
															key !== 'role' && (
																<Input
																label={key.split('_').join(' ')}
																	className={
																		'text-capitalize'
																	}
																	key={key}
																	type={getType(
																		key
																	)}
																	// label={key.split('_').join(' ')}
																	name={key}
																	value={
																		data[
																			key
																		]
																	}
																	onChange={
																		handleChange
																	}
																	errorMessage={
																		errors[
																			key
																		]
																	}
																	isError={
																		errors[
																			key
																		]
																			? true
																			: false
																	}
																	placeHolder={key
																		.split(
																			'_'
																		)
																		.join(
																			' '
																		)}
																/>
															)
														);
													}
												)}
												<div className='form-group mb-3 text-start'>
													<label className='form-control-label'>
														Role
													</label>
													<select
														className='form-control'
														name='role'
														value={data.role}
														onChange={handleChange}>
														<option value='user'>
															User
														</option>
														<option value='admin'>
															Admin
														</option>
													</select>
												</div>

												{errors.registerError && (
													<Alert
														type={'error'}
														message={
															errors.registerError
														}
													/>
												)}
												<button
													type='submit'
													className='btn btn-theme'>
													{loading ? (
														<Loading />
													) : (
														'Register'
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
							Already have an account?{' '}
							<Link to='/login' className='text-primary ml-1'>
								login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
