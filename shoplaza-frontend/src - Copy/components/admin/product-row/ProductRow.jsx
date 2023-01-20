import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../../services/Product.service';

const ProductRow = ({
	id,
	index,
	image,
	name,
	price,
  qty,
	description,
	category,
	isDeleted,
  onDelete
}) => {
  const handleDelete = () => {
    // get confirmation
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      // call delete product function
      ProductService.deleteProduct(id).then((res) => {
        onDelete(id);
      }).catch((err) => {
        toast.error("Error deleting product")
      }).finally(() => {
        // reload page
        // window.location.reload();
      });
    }
  }
	return (
		<tr key={id} className={`${isDeleted ? 'table-danger' : ''}`} style={{
      textDecoration: isDeleted ? 'line-through' : 'none',
    }}>
			<th scope='row'>{index + 1}</th>
			<td>
        <div style={{
          width: '100px',
          height: '100px',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // reduce opacity if product is deleted
          opacity: isDeleted ? '0.5' : '1',
        }}/>
      </td>
			<td>{name}
        <br/>
        {isDeleted && <span className='badge bg-danger rounded-pill mb-2 text-light d' style={{
          fontSize: '0.8rem',
          fontWeight: 'lighter',
          fontStyle: 'italic',
        }}>
								deleted
							</span>}
      </td>
			<td>{price}</td>
			<td>{qty}</td>
			<td style={{maxWidth: "350px"}}>{description}</td>
			<td>{category?.name}</td>
			<td>
				<Link className='btn btn-primary'
          to={`/admin/products/edit/${id}`}
          state={{
            id,
            image,
            name,
            price,
            description,
            category,
          }}
        >Edit</Link>
				{!isDeleted && (<button className='btn btn-danger' onClick={handleDelete}>Delete</button>)}
			</td>
		</tr>
	);
};

export default ProductRow;
