import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react';
import Button from '../../common/components/button'
// import MultiRingLoader from '../../common/components/loader';
const Bill = () => {
    const { invoice } = usePage().props;
    
    if(invoice && invoice.items){
        invoice.items =typeof invoice.items == 'string' ?   JSON.parse(invoice.items) : invoice.items

    }
    
    const [loader, setLoader] = useState(false);


   
    return (

        <div className="bg-gray-100 min-h-screen p-10">
            {/* {(loader && <div className='h-[100vh]'><MultiRingLoader /></div>)} */}
            {(!loader && <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <div>
                            <p><strong>Invoice #:</strong> {invoice.id}</p>
                            <p><strong>Date:</strong> {(function () {
                       let d =  new Date(invoice.created_at)
                       return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
                      })()}</p>
                        </div>
                        <div>
                            <p><strong>Billed To:</strong> {invoice.customer.name}</p>
                            <p><strong>Email:</strong> {invoice.customer.email}</p>
                        </div>
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="py-2 px-3 font-semibold text-gray-700">Item Description</th>
                            <th className="py-2 px-3 font-semibold text-gray-700">Quantity</th>
                            <th className="py-2 px-3 font-semibold text-gray-700">Unit Price</th>
                            <th className="py-2 px-3 font-semibold text-gray-700">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-3">{item.name}</td>
                                <td className="py-2 px-3">{item.quantity}</td>
                                <td className="py-2 px-3">₹{item.selling_price}</td>
                                <td className="py-2 px-3">₹{item.quantity * item.selling_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right mt-6 text-lg font-semibold text-gray-800">
                    Grand Total: ₹{ invoice.total_amt}
                </div>

                <p className="text-center text-xs text-gray-500 mt-8">Thank you for your business!</p>
                <div className='fixed flex left-0 justify-between p-3 bottom-0 w-full '>
                    <div>
                        <Button type='normal_btn' label='Back' className={[' hover:bg-gray-700', 'bg-gray-600']} handler={() => window.history.back()} />

                    </div>
                    <div>
                        <Button type='simple_btn' label='Take Print' className={[' hover:bg-blue-700', 'bg-blue-600' , 'hover:scale-105']}  />
                    </div>
                </div>
            </div>)}

        </div>
    );
};

export default Bill;
