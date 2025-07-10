import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react';
import { axiosInstance, getRouteUrl } from '../common/components/axiosService';
import Divider from '../common/components/dividerComponent';
import MultiRingLoader from '../common/components/loader';
import SideMenu from "./BillingAppComponents/sideMenu";
import Input from '../common/components/inputs';
import hashids from '../common/components/hashids';
import Button from '../common/components/button'
export default function Invoices() {
    const { user } = usePage().props;
    const [loader, setLoader] = useState(true);
    const [invoices, updateInvoices] = useState([]);
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axiosInstance.post(getRouteUrl('billingapp.get.invoices'), {});
                if (response.data.status) {
                    updateInvoices(response.data.invoices);
                    setLoader(false);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchInvoices();
    }, []);
    const userNameCheck = async (event) => {


    };
    return (
        <div className="flex">
            <div className='fixed shadow-md'>
                <SideMenu user={user} />
            </div>
            <div className="bg-white shadow-md rounded-md absolute left-[15rem] p-2" style={{ width: 'calc(100% - 15rem)' }} >
                {(loader && <div className='h-[100vh]'><MultiRingLoader /></div>)}
                {(!loader && <div className='p-4'>
                    <div className="flex gap-4">
                        <div className="grow">
                            <Input type='text' id='search' name='search' placeholder="Enter cat name" handler={userNameCheck} event='onChange' />
                        </div>
                        <div className='flex justify-center items-center'>

                        </div>
                        <div className='flex justify-center items-center'>

                        </div>

                    </div>
                    <Divider classArr={['bg-[#d8dce8]', 'h-[0.09rem]']} />
                    <div className='bg-white shadow-md p-2 rounded-md'>
                        <table className='text-center table-fixed w-full my-2'>
                            <thead className=' '>
                                <tr className='border-b-2  border-black-500 uppercase roboto-condensed-font'>
                                    <th className=' p-1 '>Customer Name</th>
                                    <th className=' p-1 '>Payment Mode</th>
                                    <th className=' p-1 '>Total amout</th>
                                    <th className=' p-1 '>Bill Date</th>
                                    <th className=' p-1 '>Action</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {
                                    invoices && invoices.map((row, ind) => {
                                        return (<tr className='' key={ind}>

                                            <td className=' p-2 '>{row.customer.name}</td>

                                            <td className='  p-2'>{row.payment_mode}</td>
                                            <td className=''>{row.total_amt}</td>
                                            <td className=''>{(function () {
                                                let d = new Date(row.created_at)
                                                return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
                                            })()}</td>
                                            <td className=''><Button type='normal_btn' label='View' className={[' hover:bg-gray-700', 'bg-gray-600']} handler={() => window.location.href = getRouteUrl('billingapp.preview.invoice', { id: hashids.encode(row.id) })} /></td>
                                        </tr>)
                                    })
                                }

                            </tbody>
                        </table>

                    </div>

                </div>
                )}

            </div>

        </div>
    );
}

