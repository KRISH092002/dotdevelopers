import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react';
import SideMenu from "./BillingAppComponents/sideMenu";
import Input from '../common/components/inputs';
import Divider from '../common/components/dividerComponent';
import Popup from '../common/components/popup';
import { axiosInstance, getRouteUrl } from '../common/components/axiosService';
import Button from '../common/components/button';
import MultiRingLoader from '../common/components/loader';
import { Table } from '@mantine/core';


export default function Store() {
    const { user } = usePage().props;
    const [loader, setLoader] = useState(true);
    const [products, updateProducts] = useState([]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.post(getRouteUrl('billingapp.get.products'), { user_id: user.id, order_by: 'category' });
                if (response.data.status) {
                    updateProducts(response.data.products);
                    setLoader(false);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);
    const userNameCheck = async (event) => {


    };




    return (
        <div className="flex">
            <div className='fixed shadow-md'>
                <SideMenu user={user} />
            </div>
            <div className="bg-white shadow-md rounded-md absolute left-[15rem] p-2" style={{width : 'calc(100% - 15rem)' }} >
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
                    {products && products.map((cat, ind) => {
                        return (<div key={ind}>


                            <div className='p-2 my-1 rounded-md text-white uppercase roboto-condensed-font text-center bg-indigo-400 w-full'>{cat.category}</div>
                            {(cat.products.length > 0 && <div className='bg-white shadow-md p-2 rounded-md'>
                                <table className='text-center table-fixed w-full my-4'>
                                    <thead className=' '>
                                        <tr className='border-b-2  border-black-500 uppercase roboto-condensed-font'>
                                            <th className=' p-2 '>Product Name</th>
                                            <th className=' p-2 '>SKU</th>
                                            <th className=' p-2 '>Stock</th>
                                            <th className=' p-2 '>Purchase Price</th>
                                            <th className='p-2 '>Selling Price</th>                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {
                                            cat.products && cat.products.map((prod, ind2) => {
                                                return (<tr className='' key={ind2}>
                                                    <td className=' p-2 '>{prod.name}</td>
                                                    <td className=' p-2 '>{prod.sku}</td>
                                                    <td className='p-2 '>{prod.stock}{prod.unit}</td>
                                                    <td className='  p-2'>{prod.purchase_price}</td>
                                                    <td className=''>{prod.selling_price}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>)}
                            {(cat.products.length == 0 && 
                                <div>
                                    <p>No Product under this Category</p>
                                </div>
                            )}
                        </div>
                        )
                    })
                    }
                </div>
                )}

            </div>

        </div>
    );
}
