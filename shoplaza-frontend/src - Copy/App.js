import { Routes } from 'react-router-dom';
import './App.css';
import { getRoutes } from './routes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext } from 'react';
import { AuthContext } from './store/auth';
import { CartProvider } from './store/cart.store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
	const { getRole } = useContext(AuthContext);
	const currentRole = getRole();
	return (
		<CartProvider>
			<ToastContainer/>
			<div className='App'>
				<Routes>{getRoutes(currentRole)}</Routes>
			</div>
		</CartProvider>
	);
}

export default App;
