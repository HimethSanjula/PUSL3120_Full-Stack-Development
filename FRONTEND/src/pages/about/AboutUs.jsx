import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const AboutUs = () => {
	return (
		<MainLayout>
			<div>
				<div className='container py-2'>
					<div className='row h-80 align-items-center py-2'>
						<div className='col-lg-6'>
							<h1 className='display-4'>About us </h1>
							<p className='lead text-muted mb-0'>
							Shoplaza is an e-commerce website that provides a platform for users to buy a wide 
							range of fashion products. The website offers a user-friendly interface and a convenient 
							shopping experience for users to browse, search, and purchase items with ease. 
							Shoplaza also offers a variety of 24/7 Live chat support along with payment options
							 and secure transactions to ensure a safe and secure shopping experience for customers. 
							 Overall, Shoplaza is a reliable and efficient platform for online shopping.
							</p>
							<p className='lead text-muted'>
								Start shoping with &nbsp;
								<b>Shoplaza</b>
							</p>
						</div>
						<div className='col-lg-6 d-lg-block'>
							<img
								src={"https://img.freepik.com/premium-photo/interior-men-s-clothing-store-style-fashion_120897-3074.jpg?w=2000"}
								alt=''
								className='img-fluid'
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='py-5'>
				<div className='container py-2'>
					<div className='row mb-4'>
						<div className='col-lg-7'>
							<h2 className='display-4'>About Shoplaza</h2>
							<p className='font-italic'>
								Here are some interesting things about Shoplaza
							</p>
						</div>
					</div>

					<div className='row text-center'>
						<div className='col-xl-3 col-sm-6 mb-5'>
							<div className='bg-white rounded shadow-sm py-5 px-4'>
								<img
									src='https://res.cloudinary.com/mhmd/image/upload/v1556834132/avatar-4_ozhrib.png'
									alt=''
									width='100'
									className='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
								/>
								<h5 className='mb-0'>Owner name</h5>
								<span className='small text-uppercase text-muted'>
									Himeth Sanjula - Founder
								</span>
							</div>
						</div>

						<div className='col-xl-3 col-sm-6 mb-5'>
							<div className='bg-white rounded shadow-sm py-5 px-4'>
								<img
									src='https://img.icons8.com/dusk/128/000000/date-to.png'
									alt=''
									width='100'
									className='img-fluid  rounded-circle mb-3 img-thumbnail shadow-sm'
								/>
								<h5 className='mb-0'>Start date</h5>
								<span className='small text-uppercase text-muted'>
									December 24, 2022
								</span>
							</div>
						</div>

						<div className='col-xl-3 col-sm-6 mb-5'>
							<div className='bg-white rounded shadow-sm py-5 px-4'>
								<img
									src='https://img.icons8.com/emoji/96/000000/sports-medal-emoji.png'
									alt=''
									width='100'
									className='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
								/>
								<h5 className='mb-0'>2020</h5>
								<span className='small text-uppercase text-muted'>
									Best shop award
								</span>
							</div>
						</div>

						<div className='col-xl-3 col-sm-6 mb-5'>
							<div className='bg-white rounded shadow-sm py-5 px-4'>
								<img
									src='https://img.icons8.com/bubbles/100/000000/conference-call.png'
									alt=''
									width='100'
									className='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
								/>
								<h5 className='mb-0'>Customers</h5>
								<span className='small text-uppercase text-muted'>
									3000+
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
    </MainLayout>
	);
};

export default AboutUs;
