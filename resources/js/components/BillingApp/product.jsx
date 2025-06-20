import { useState, useEffect } from 'react'
import { usePage, useForm } from '@inertiajs/inertia-react';
import SideMenu from "./BillingAppComponents/sideMenu";
import Input from '../common/components/inputs';
import Divider from '../common/components/dividerComponent';
import Popup from '../common/components/popup';


export default function Product() {
  const { user } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    sku: '',
    category: '',
    purchase_price: '',
    selling_price: '',
    stock: '',
    unit: 'pcs',
    status: true,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pro');
  };
  const [productPopup, productPopupToggle] = useState(false);
  let products = [];
  const userNameCheck = async (event) => {


  };
  let addProduct = <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
    <h2 className="text-lg font-bold mb-4">Add New Product</h2>
    <form onSubmit={handleSubmit}>
      <Input type="text" label='Name' id='name' name='name' placeholder="Enter User Name" value={data.name} event='onChange' handler={(e) => setData('name', e.target.value)} Validator={true} onError={errors.name} errorMsg={errors.name} />
      <Input type="text" label='SKU' id='SKU' name='SKU' placeholder="Enter SKU" value={data.sku} event='onChange' handler={(e) => setData('sku', e.target.value)} Validator={true} onError={errors.sku} errorMsg={errors.sku} />
      <Input type="text" label='category' id='category' name='category' placeholder="Enter category" value={data.category} event='onChange' handler={(e) => setData('category', e.target.value)} Validator={true} onError={errors.category} errorMsg={errors.category} />

      <Input type="number" label='Price' id='price' name='purchase_price' placeholder="Enter purchase_price" value={data.purchase_price} event='onChange' handler={(e) => setData('purchase_price', e.target.value)} Validator={true} onError={errors.purchase_price} errorMsg={errors.purchase_price} />

      <Input type="number" label='selling Price' id='selling_price' name='selling_price' placeholder="Enter selling_price" value={data.selling_price} event='onChange' handler={(e) => setData('selling_price', e.target.value)} Validator={true} onError={errors.selling_price} errorMsg={errors.selling_price} />

      <Input type="number" label='stock' id='stock' name='stock' placeholder="Enter stock" value={data.stock} event='onChange' handler={(e) => setData('stock', e.target.value)} Validator={true} onError={errors.stock} errorMsg={errors.stock} />

      <Input type="select" label='unit' id='unit' name='unit' value={data.unit} event='onChange' handler={(e) => setData('unit', e.target.value)} Validator={true} onError={errors.unit} errorMsg={errors.unit} options={[
        { value: 'pcs', name: 'pcs' },
        { value: 'kg', name: 'kg' },
        { value: 'ltr', name: 'ltr' }
      ]} />

      <Input type="checbox" label='status' id='status' name='status' value={data.status} event='onChange' handler={(e) => setData('status', e.target.value)} Validator={true} onError={errors.status} errorMsg={errors.status} />


      <button type="submit" disabled={processing} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        {processing ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  </div>
  return (
    <div className="flex">
      <div>
        <SideMenu user={user} />
      </div>
      <div className="bg-[#f6f7fc] w-full">
        <div className="flex gap-4">
          <div className="grow">
            <Input type='text' id='search' name='search' placeholder="Enter cat name" handler={userNameCheck} event='onChange' />
          </div>
          <div className='flex justify-center items-center'>
            <button className='p-3 border rounded-md'>Add Button</button>
          </div>
          <div className='flex justify-center items-center'>
            <button className='p-3 border rounded-md' onClick={() => productPopupToggle(prev => !prev)}>Add Category</button>
          </div>

        </div>
        <Divider classArr={['bg-[#d8dce8]', 'h-[0.09rem]']} />
        <Popup open={productPopup} element={addProduct} />
        <div>
          <table className="w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.stock}</td>
                  <td>{p.selling_price}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}