import React from 'react';
import Footer from '../components/shared/footer/Footer';
import Navbar from '../components/shared/nav/Navbar';

const MainLayout = ({ ...props }) => {

	return (
		<>
			<Navbar />
			{props.children}
			{/* {currentPath === '/' && <Footer />} */}
			<Footer/>
		</>
	);
};

export default MainLayout;
