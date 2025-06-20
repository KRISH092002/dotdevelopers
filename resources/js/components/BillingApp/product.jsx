import { useState, useEffect } from 'react'
import { usePage ,useForm } from '@inertiajs/inertia-react';
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
  const [productPopup , productPopupToggle] = useState(false);
  let products =[];
  const userNameCheck = async (event) => {


  };
  let addProduct=  <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
          <Input  type="text" label='Name' id='name' name='name' placeholder="Enter User Name" value={data.name} event='onChange' handler={(e) => setData('name', e.target.value)} Validator={true} onError={errors.name} errorMsg={errors.name}/>
        

        <label className="block mb-2">
          SKU:
          <input type="text" value={data.sku} onChange={e => setData('sku', e.target.value)} className="w-full border p-2" />
          {errors.sku && <span className="text-red-500 text-sm">{errors.sku}</span>}
        </label>

        <label className="block mb-2">
          Category:
          <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} className="w-full border p-2" />
        </label>

        <label className="block mb-2">
          Purchase Price:
          <input type="number" value={data.purchase_price} onChange={e => setData('purchase_price', e.target.value)} className="w-full border p-2" />
        </label>

        <label className="block mb-2">
          Selling Price:
          <input type="number" value={data.selling_price} onChange={e => setData('selling_price', e.target.value)} className="w-full border p-2" />
        </label>

        <label className="block mb-2">
          Stock:
          <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="w-full border p-2" />
        </label>

        <label className="block mb-2">
          Unit:
          <select value={data.unit} onChange={e => setData('unit', e.target.value)} className="w-full border p-2">
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="ltr">ltr</option>
          </select>
        </label>

        <label className="block mb-2">
          <input type="checkbox" checked={data.status} onChange={e => setData('status', e.target.checked)} />
          Active
        </label>

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
        <Popup open={productPopup}  element = {addProduct} />
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