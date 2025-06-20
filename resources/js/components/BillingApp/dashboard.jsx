import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { CompositeChart, AreaChart } from '@mantine/charts';
import { usePage } from '@inertiajs/inertia-react';
import { data } from './data';
import SideMenu from "./BillingAppComponents/sideMenu";
import '../../../css/BillingApp/dashboard.css';


export default function Dashbord() {
  const { user } = usePage().props;
  return (
    <div className="flex">
      <div>
        <SideMenu user={user}/>
      </div>
      <div className="bg-[#f6f7fc] w-full">
        <div className="flex h-full max-h-[15rem] " >

          <div className=" h-full w-1/2">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <AreaChart
                data={data}
                dataKey="date"
                series={[
                  { name: 'Tomatoes', color: '#e74c3c' },
                  { name: 'Apples', color: '#2ecc71' },
                  { name: 'Oranges', color: '#f39c12' },
                ]}
              />

            </MantineProvider>

          </div>
          <div className=" h-full w-1/2">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <AreaChart
                data={data}
                dataKey="date"
                series={[
                  { name: 'Tomatoes', color: '#e74c3c' },
                  { name: 'Apples', color: '#2ecc71' },
                  { name: 'Oranges', color: '#f39c12' },
                ]}
              />

            </MantineProvider>

          </div>

        </div>

       
      </div>

    </div>
  );
}