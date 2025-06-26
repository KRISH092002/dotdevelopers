import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { CompositeChart, AreaChart } from '@mantine/charts';
import { usePage } from '@inertiajs/inertia-react';
import { data } from './data';
import SideMenu from "./BillingAppComponents/sideMenu";
import '../../../css/BillingApp/dashboard.css';
import Button from '../common/components/button'


export default function Dashbord() {
  const { user } = usePage().props;
  return (
    <div className="flex">
      <div>
        <SideMenu user={user} />
      </div>
      <div className="bg-white w-full p-2">
        <div className='flex justify-end bg-white shadow-md rounded-md h-18 mb-4 items-center p-2'>
          <div>
            <Button type='simple_btn' label='Add Invoice' className={[' hover:bg-blue-700' , 'bg-blue-600']} />
          </div>
        </div>
        <div className='flex gap-1 mb-4'>
          <div className='w-1/4 text-black p-3 text-base font-medium shadow-md rounded-md'>
            Profit
          </div>

        </div>
        <div className="bg-white shadow-md rounded-md p-2 h-full max-h-[15rem] " >

          <div className=" h-full w-full">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <AreaChart
                data={data}
                dataKey="date"
                series={[
                  { name: 'Tomatoes', color: '#e74c3c' },
                  { name: 'Apples', color: '#2ecc71' },
                  { name: 'Oranges', color: '#f39c12' },
                ]}
                curveType="bump"
              />

            </MantineProvider>

          </div>
          

        </div>


      </div>

    </div>
  );
}