import { cartType } from './types/cartType';

type Props = {
  data: cartType,
  handleRemoveItem: (id?: string) => void
  handleQuantity: (item: cartType, action: string) => void
}

const TableRow = ( { data, handleRemoveItem, handleQuantity }: Props ) => {
  return (
    <tr>
      <td>
        <div className='product'>
          <img src='https://picsum.photos/100/120' alt='' />
          <div className='info'>
            <div className='name'>{data.name}</div>
            <div className='category'>{data.category}</div>
          </div>
        </div>
      </td>
      <td>R$ {data.price}</td>
      <td>
        <div className='qty'>
          <button onClick={() => handleQuantity(data, 'decrease')}>
            <i className='bx bx-minus'></i>
          </button>
          <span>{data.quantity}</span>
          <button onClick={() => handleQuantity(data, 'increase')}>
            <i className='bx bx-plus'></i>
          </button>
        </div>
      </td>
      <td>R$ {data.price * data.quantity}</td>
      <td>
        <button onClick={() => handleRemoveItem(data._id)} className='remove'>
          <i className='bx bx-x'></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
