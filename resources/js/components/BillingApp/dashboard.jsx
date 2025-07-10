import { useState, useEffect } from 'react'
import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { CompositeChart, AreaChart } from '@mantine/charts';
import { usePage } from '@inertiajs/inertia-react';
import { data } from './data';
import SideMenu from "./BillingAppComponents/sideMenu";
import '../../../css/BillingApp/dashboard.css';
import Button from '../common/components/button'
import Icon from '../common/components/icon'
import Popup from '../common/components/popup';
import { FaUserPlus } from "react-icons/fa";
import AddInvoice from '../BillingApp/BillingAppComponents/addInvoice'
import AddCustomerForm from '../BillingApp/BillingAppComponents/addCustomer';
import { axiosInstance, getRouteUrl } from '../common/components/axiosService';
import MultiRingLoader from '../common/components/loader';
import hashids from '../common/components/hashids';
export default function Dashbord() {
  const { user, products, clients } = usePage().props;
  const [cust_popup, toggleCustPopup] = useState(false);
  const [invoice, toggleInvoice] = useState(false)
  const [loader, setLoader] = useState(true);
  const [invoices, updateInvoices] = useState([]);
  const dashlist = [
    {
      name: 'Profit',
      percent: '40%',
      amt: '40,000.00'
    },
    {
      name: 'Sales',
      percent: '40%',
      amt: '40,000.00'
    },
    {
      name: 'Expenses',
      percent: '40%',
      amt: '40,000.00'
    }
  ]
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axiosInstance.post(getRouteUrl('billingapp.get.invoices'), { type: 'pending' });
        if (response.data.status) {
          updateInvoices(response.data.invoices);
          setLoader(false);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchInvoices();
  }, [])
  return (
    <div className="flex">
      <div className='fixed'>
        <SideMenu user={user} />
      </div>
      <div className="bg-white shadow-md rounded-md absolute left-[15rem] p-2" style={{ width: 'calc(100% - 15rem)', minHeight: '100vh' }} >
        {(loader && <div className='h-[100vh]'><MultiRingLoader /></div>)}
        {(!loader && <> <div className='flex gap-3 justify-end bg-white shadow-md rounded-md h-18 mb-4 items-center p-2'>
          <div className=''>
            <Button type='icon_btn' className={['bg-sky-600', 'w-9', 'h-9', 'rounded-md']} svg={<FaUserPlus />} handler={() => toggleCustPopup(prev => !prev)} />
          </div>
          <div>
            <Button type='simple_btn' label='Add Invoice' className={[' hover:bg-blue-700', 'bg-blue-600']} handler={() => toggleInvoice(prev => !prev)} />
          </div>
        </div>
          <div className='flex gap-1 mb-4 justify-evenly'>
            {dashlist.map((l, ind) => {

              return (
                <div className=' p-3 w-1/4 shadow-md rounded-md' key={ind}>
                  <div className='flex gap-2'>
                    <div className=' text-black  text-base font-medium '>
                      {l.name}
                    </div>
                    <div className='text-[green] text-xs flex justify-center items-center'>
                      <Icon name='dropdown_arrow' className='h-[0.5rem] w-[0.5rem]' /> {l.percent}
                    </div>

                  </div>
                  <div className='text-base'>
                    ₹{l.amt}
                  </div>
                </div>

              )
            })}
          </div>
          <div className="bg-white relative shadow-md rounded-md p-2 h-full   " >
            <div className='flex mb-3 gap-2 items-center justify-start'>
              <div className='font-medium text-base font-[Roboto]'>Report</div>
              <div className='text-gray-500 text-small'>2020 - 2024</div>
            </div>
            <div className="relative  w-full h-[15rem]">
              <MantineProvider withGlobalStyles withNormalizeCSS>
                <AreaChart
                  data={data}
                  dataKey="date"
                  type="stacked"
                  // withLegend
                  // legendProps={{ verticalAlign: 'bottom', height: 50 }}
                  series={[
                    { name: 'Sales', color: '#8763ed' },
                    { name: 'Expenses', color: '#efb123' },
                    { name: 'Profit', color: '#7bc01d' },
                  ]}
                  curveType="linear"
                />

              </MantineProvider>

            </div>


          </div>
          <div className='bg-white shadow-md p-2 rounded-md max-h-40 overflow-auto'>
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

          </div></>)}

      </div>

      <Popup open={invoice} element={<AddInvoice products={products} user={user} />} type='large' handler={() => toggleInvoice(prev => !prev)} />
      <Popup open={cust_popup} handler={() => toggleCustPopup(prev => !prev)} element={<AddCustomerForm user={user} />} />



    </div>
  );
}