import React, { useState } from 'react';
import { toast } from 'react-toastify';
import OrderService from '../../../services/Order.service';
import { Loading } from '../../shared';

const OrderUpdate = ({ orderId }) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setStatus(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    OrderService.updateStatus(orderId, {status}).then(res => {
      toast.success('Order status updated');
    }).catch(err => {
      toast.error('Error updating order status');
    }).finally(() => {
      setLoading(false);
    });
  }
	return (
		<div className='row'>
			<h4>Update Order</h4>

			<div className='row mt-2'>    
				<div className='col-md-12'>
					<div className='form-group'>
						<label className='text mb-1'>Update Order Status</label>
						<select className='form-control' value={status} onChange={onChange}>
							<option>Not Processed</option>
							<option>Processing</option>
							<option>Dispatched</option>
							<option>Delivered</option>
						</select>
					</div>
				</div>
        <div className='col-md-12 mt-2'>
          <button className='btn btn-primary w-100' onClick={onSubmit}>
            {loading ? <Loading/> : 'Update'}
          </button>
        </div>
			</div>
		</div>
	);
};

export default OrderUpdate;
