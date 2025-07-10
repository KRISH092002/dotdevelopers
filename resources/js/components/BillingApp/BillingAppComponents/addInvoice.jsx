import { useState, useEffect } from 'react'
import Button from '../../common/components/button'
import Input from '../../common/components/inputs'
import Icon from '../../common/components/icon'
import { RiMenuAddFill } from "react-icons/ri";
import { axiosInstance, getRouteUrl } from '../../common/components/axiosService';
import hashids from '../../common/components/hashids';



export default function AddInvoice({ products , user }) {
    const [clients, updateClinets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customer, selectedCust] = useState('');
    const [sum, addSum] = useState(0)
    const [billrow, setBills] = useState([
        {
            name: '',
            sku: '',
            quantity: 0,
            unit: 0,
            selling_price: 0,
            total_amount: 0
        }
    ])
    const quantityChange = (e, ind) => {
        setBills(prevBills => {
            let obj = prevBills[ind]
            obj.quantity = e.target.value
            obj.total_amount = obj.quantity * obj.selling_price;

            const updatedBills = [...prevBills];
            updatedBills[ind] = obj;
            return updatedBills;
        })
    }
    const handleChange = (e, ind) => {
        const selectedProduct = products.find(el => el.sku === e.target.value);
        if (selectedProduct) {
            setBills(prevBills => {
                const updatedRow = {
                    ...prevBills[ind],
                    ...(selectedProduct || {})
                };

                const updatedBills = [...prevBills];
                updatedBills[ind] = updatedRow;

                return updatedBills;
            });

        }
    };
    const addRow = () => {
        let newRow = [
            {
                name: '',
                sku: '',
                quantity: 0,
                unit: 0,
                selling_price: 0,
                total_amount: 0
            }
        ]
        setBills(bills => [...bills, ...newRow])
    }
    const addInvoice = () => {
        if (customer) {
            setLoading(true);
            let fd = new FormData;
            fd.append('user_id' , user.id)
            fd.append('customer_id' , customer)
            fd.append('invoice_json' , JSON.stringify(billrow))
            fd.append('payment_mode' , 'pending')
            fd.append('total_amt' , sum)
            axiosInstance.post(getRouteUrl('billingapp.add.new.invoice'), fd).then((response) => {

                if (response.data.status) {

                    setLoading(false)
                   
                    window.location.href = getRouteUrl('billingapp.preview.invoice' , {id : hashids.encode(response.data.invoice_id)}) 
                }
            });
        } else {
            alert('select Customer')
            setLoading(false)
        }

    }
    useEffect(() => {
        addSum((prev) => {
            let sum = billrow.map((el) => Number(el.total_amount)).reduce((a, b) => a + b, 0)
            return sum;
        })
    }, [billrow]);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axiosInstance.post(getRouteUrl('billingapp.get.clients'), {});
                if (response.data.status) {
                    updateClinets(response.data.clients);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchClients();
    }, []);

    return (
        <div className='h-full'>
            <div className='p-2 bg-slate-50 rounded-md text-black font-extrabold 
            uppercase font-[Roboto]'>
                Add Invoice
            </div>
            <div className='flex '>
                <div className='w-1/2'>
                    <Input type="select" label='Customer' id='customer' name='customer' placeholder="Enter Customer" list='customers' dataList={true} options={{ data: clients, value: 'id', name: 'name' }} event='onChange' handler={(e) => selectedCust(e.target.value)} />

                </div>

                <div className='flex items-center justify-end mt-2 ml-10'>
                    <Button type='simple_btn' className={['bg-cyan-700', 'w-36', 'h-9', 'rounded-md']} svg={<RiMenuAddFill />} label='Add row' handler={() => addRow()} />
                </div>

            </div>
            <div className='bg-white shadow-md p-2 rounded-md'>
                <table className='text-center table-fixed w-full my-2'>
                    <thead className=' '>
                        <tr className='border-b-2  border-black-500 uppercase roboto-condensed-font'>
                            <th className=' p-1 '>Product Name</th>
                            <th className=' p-1 '>SKU</th>
                            <th className=' p-1 '>Quantity</th>
                            <th className=' p-1 '>Unit</th>
                            <th className='p-1'>Selling Price</th>
                            <th className='p-1 '>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            billrow && billrow.map((row, ind) => {
                                return (<tr className='' key={ind}>
                                    <td className=' p-2 '><Input type='select' name='name' value={row.sku} handler={(e) => handleChange(e, ind)} options={{ data: products, name: 'name', value: 'sku' }} event='onChange' /></td>
                                    <td className=' p-2 '>{row.sku}</td>
                                    <td className='p-2 '><Input type='number' name='quantity' value={row.quantity} handler={(e) => quantityChange(e, ind)} event='onChange' /></td>
                                    <td className='  p-2'>{row.unit}</td>
                                    <td className=''>{row.selling_price}</td>
                                    <td className=''>{row.total_amount}</td>
                                </tr>)
                            })
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{`₹${sum}`}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button type='design1' isLoading={loading} label='Proceed' className={['sm:w-36', 'sm:h-10', 'bg-sky-500', 'hover:bg-sky-400']} svg={<Icon name='submit_invoice' />} handler={() => addInvoice()} />

                </div>
            </div>

        </div>
    )
}