import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const ContactUs = () => {
	return (
		<MainLayout>
      <section className='container mt-5 pb-5'>
			<div className='row text-center mb-5'>
				<h1>Contact us</h1>
			</div>
			<div className='row pb-5'>
				<div className='col-sm-12 col-md-12'>
					<div className='mb-4'>
						<iframe
							title='gym-location'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21563.53621778428!2d79.86126552431551!3d6.92090771806898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bcfdee7764d%3A0xdf97fbb66912b0c5!2sOne%20Galle%20Face%20Mall!5e1!3m2!1sen!2slk!4v1673672606702!5m2!1sen!2slk'
							width='100%'
							height='450'
							frameBorder='0'
							style={{ border: '0' }}
							allowFullScreen=''
							aria-hidden='false'
							tabIndex='0'></iframe>
					</div>

					<div className='row text-center'>
						<div className='col-md-4'>
							<div className='px-3 py-2 rounded text-white mb-2 d-inline-block'>
								<img
									alt='icon of address'
									src='https://img.icons8.com/cotton/64/000000/worldwide-location--v1.png'
								/>
							</div>
							<div>
								{' '}
								<h3>Visit us</h3>
                03rd Floor,<br/>
								One Galle face mall, Colombo 03
							</div>
						</div>
						<div className='col-md-4'>
							<div className='px-3 py-2 rounded text-white mb-2 d-inline-block'>
								<img
									alt='icon of phone'
									src='https://img.icons8.com/cotton/64/000000/phone-message.png'
								/>
							</div>
							<div>
								<h3>Call us</h3>
								011-22242543
							</div>
						</div>
						<div className='col-md-4'>
							<div className=' px-3 py-2 rounded text-white mb-2 d-inline-block'>
								<img
									alt='icon of email'
									src='https://img.icons8.com/cotton/64/000000/email-open.png'
								/>
							</div>
							<div>
								<h3>Mail us</h3>contact@shoplaza.com
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    </MainLayout>
	);
};

export default ContactUs;
