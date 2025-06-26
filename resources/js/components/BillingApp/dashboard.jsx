import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { CompositeChart, AreaChart } from '@mantine/charts';
import { usePage } from '@inertiajs/inertia-react';
import { data } from './data';
import SideMenu from "./BillingAppComponents/sideMenu";
import '../../../css/BillingApp/dashboard.css';
import Button from '../common/components/button'
import Icon from '../common/components/icon'


export default function Dashbord() {
  const { user } = usePage().props;
  return (
    <div className="flex">
      <div className='fixed'>
        <SideMenu user={user} />
      </div>
      <div className="bg-white shadow-md rounded-md absolute left-[15rem] p-2" style={{ width: 'calc(100% - 15rem)' }} >
        <div className='flex justify-end bg-white shadow-md rounded-md h-18 mb-4 items-center p-2'>
          <div>
            <Button type='simple_btn' label='Add Invoice' className={[' hover:bg-blue-700', 'bg-blue-600']} />
          </div>
        </div>
        <div className='flex gap-1 mb-4'>
          <div className=' p-3 w-1/4 shadow-md rounded-md'>
            <div className='flex'>
              <div className=' text-black  text-base font-medium '>
                Profit
              </div>
              <div className='text-[green] text-xs'>
                <Icon name='dropdown_arrow' className='h-[0.5rem] w-[0.5rem]' /> 40%
              </div>

            </div>
            <div className='text-base'>
              ₹40,000.00
            </div>
          </div>
        </div>
        <div className="bg-white relative shadow-md rounded-md p-2 h-full  max-h-[25rem] " >
          <div className='flex mb-1'>
            <div className='font-medium text-base font-[Roboto]'>Report</div>
            <div className='text-gray-500 text-small'>2020 - 2024</div>
          </div>
          <div className="relative h-full w-full">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <AreaChart
                data={data}
                dataKey="date"
                type="stacked"
                withLegend
                legendProps={{ verticalAlign: 'bottom', height: 50 }}
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


      </div>

    </div>
  );
}