import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react';
import SideMenu from "./BillingAppComponents/sideMenu";
import Input from '../common/components/inputs';
import Divider from '../common/components/dividerComponent';
import Popup from '../common/components/popup';
import { axiosInstance, getRouteUrl } from '../common/components/axiosService';
import Button from '../common/components/button';
import MultiRingLoader from '../common/components/loader';
import useCustomForm from '../common/components/useCustomForm';

export default function Store() {
    const { user } = usePage().props;
    const [loader, setLoader] = useState(true);
    const [products, updateProducts] = useState([]);
    const [categories, updateCategory] = useState([]);
    const [productPopup, productPopupToggle] = useState(false);
    const [catPopup, catPopupToggle] = useState(false);
    const addCategoryData = useCustomForm({
        category: '',
        status: true,
        user_id: user.id
    });
    const addProductData = useCustomForm({
        name: '',
        sku: '',
        category_id: '',
        purchase_price: '',
        selling_price: '',
        stock: '',
        unit: 'pcs',
        status: true,
        user_id: user.id
    });
    const addNewProduct = (e) => {
        let required_fields = ['name', 'sku', 'category_id', 'purchase_price', 'selling_price', 'stock', 'unit', 'status'],
            newErrors = addProductData.errors,
            hasError = addProductData.hasErrors;
        addProductData.setLoading(true)
        e.preventDefault();
        required_fields.forEach((key) => {
            for (key in addProductData.data) {
                if (Object.prototype.hasOwnProperty.call(addProductData.data, key)) {
                    const element = addProductData.data[key];
                    if (element.length == 0) {
                        newErrors[key] = true;
                        hasError = true;

                    }

                }
            }

        })
        addProductData.setErrors(newErrors);
        addProductData.setHasError(hasError);
        if (!hasError) {
            axiosInstance.post(getRouteUrl('billingapp.add.new.product'), addProductData.data)
                .then((response) => {
                    updateProducts(response.data.products)
                    addProductData.setLoading(false);
                    addProductData.reset();
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });
        } else {
            addProductData.setLoading(false);
        }

    };
    const addNewCategory = (e) => {
        let required_fields = ['category'],
            newErrors = addCategoryData.errors,
            hasError = addCategoryData.hasErrors;
        addCategoryData.setLoading(true)
        e.preventDefault();
        required_fields.forEach((key) => {
            for (key in addCategoryData.data) {
                if (Object.prototype.hasOwnProperty.call(addCategoryData.data, key)) {
                    const element = addCategoryData.data[key];
                    if (element.length == 0) {
                        newErrors[key] = true;
                        hasError = true;

                    }

                }
            }

        })
        addCategoryData.setErrors(newErrors);
        addCategoryData.setHasError(hasError);
        if (!hasError) {
            axiosInstance.post(getRouteUrl('billingapp.add.new.category'), addCategoryData.data)
                .then((response) => {
                    let object = [response.data.categories]
                    updateCategory(prev => ([...prev, ...object]))
                    updateProducts(response.data.products)
                    addCategoryData.setLoading(false);
                    addCategoryData.reset();
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });

        } else {
            addCategoryData.setLoading(false);
        }

    };


    let getCategories = () => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(getRouteUrl('billingapp.get.categories'), { user_id: user.id })
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.categories);

                    }
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error);
                });

        })
    }

    async function fetchCategories() {
        if (categories.length == 0) {
            let data = await getCategories();
            updateCategory(data);
        }

    }

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
        fetchCategories();
        fetchProducts();
    }, []);
    const userNameCheck = async (event) => {


    };

    let addCat = <div className='p-2'> <form onSubmit={addNewCategory}>
        <Input type="text" label='category' id='category' name='category' placeholder="Enter category Name" value={addCategoryData.data.category} event='onChange' handler={(e) => addCategoryData.handleChange('category', e.target.value)} Validate={true} onError={!addCategoryData.errors.category} errorMsg='Category field is required' />


        <Button submit={true} isLoading={addCategoryData.loading} type='design1' label='Add Category' disabled={addCategoryData.hasErrors} />
    </form></div>

    let addProduct = <div className='p-2'>
        <form onSubmit={addNewProduct}>
            <Input type="text" label='Name' id='name' name='name' placeholder="Enter Name" value={addProductData.data.name} event='onChange' handler={(e) => addProductData.handleChange('name', e.target.value)} Validate={true} onError={!addProductData.errors.name} errorMsg='The field is required' />
            <Input type="text" label='SKU' id='SKU' name='sku' placeholder="Enter SKU" value={addProductData.data.sku} event='onChange' handler={(e) => addProductData.handleChange('sku', e.target.value)} Validate={true} onError={!addProductData.errors.sku} errorMsg='The field is required' />
            <Input type="select" label='category' id='category' name='category_id' placeholder="Enter category" value={addProductData.data.category_id} event='onChange' handler={(e) => addProductData.handleChange('category_id', Number(e.target.value))} Validate={true} onError={!addProductData.errors.category_id} errorMsg='The field is required' options={{ data: categories, value: 'id', name: 'category' }} />

            <Input type="number" label='Price' id='price' name='purchase_price' placeholder="Enter purchase_price" value={addProductData.data.purchase_price} event='onChange' handler={(e) => addProductData.handleChange('purchase_price', e.target.value)} Validate={true} onError={!addProductData.errors.purchase_price} errorMsg='The field is required' />

            <Input type="number" label='selling Price' id='selling_price' name='selling_price' placeholder="Enter selling_price" value={addProductData.data.selling_price} event='onChange' handler={(e) => addProductData.handleChange('selling_price', e.target.value)} Validate={true} onError={!addProductData.errors.selling_price} errorMsg='The field is required' />

            <Input type="number" label='stock' id='stock' name='stock' placeholder="Enter stock" value={addProductData.data.stock} event='onChange' handler={(e) => addProductData.handleChange('stock', e.target.value)} Validate={true} onError={!addProductData.errors.stock} errorMsg='The field is required' />

            <Input type="select" label='unit' id='unit' name='unit' value={addProductData.data.unit} event='onChange' handler={(e) => addProductData.handleChange('unit', e.target.value)} Validate={true} onError={!addProductData.errors.unit} errorMsg='The field is required' options={{
                data: [
                    { value: 'pcs', name: 'pcs' },
                    { value: 'kg', name: 'kg' },
                    { value: 'ltr', name: 'ltr' }
                ], value: 'value', name: 'name'
            }} />

            <Input type="checkbox" label='status' id='status' name='status' value={addProductData.data.status} event='onChange' handler={(e) => addProductData.handleChange('status', e.target.checked)} Validate={true} onError={!addProductData.errors.status} errorMsg='The field is required' />

            <Button submit={true} isLoading={addProductData.loading} type='design1' label='Add Product' disabled={addProductData.hasErrors} />


        </form></div>



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
                            <Input type='text' id='search' name= 'search' placeholder="Enter cat name" handler={userNameCheck} event='onChange' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <Button type='simple_btn' label='Add Product' handler={() => { productPopupToggle(prev => !prev) }} className={[' hover:bg-blue-700' , 'bg-blue-600']}/>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Button type='simple_btn' label='Add Category' className={[' hover:bg-blue-700' , 'bg-blue-600']} handler={() => catPopupToggle(prev => !prev)}/>
                        </div>

                    </div>
                    <Divider classArr={['bg-[#d8dce8]', 'h-[0.09rem]']} />
                    <Popup open={productPopup} element={addProduct} handler={() => productPopupToggle(prev => !prev)} />
                    <Popup open={catPopup} element={addCat} handler={() => catPopupToggle(prev => !prev)} />
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
                                            <th className='p-2 '>Selling Price</th>
                                        </tr>
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
