import { useState, useEffect } from 'react'
import { FaBook } from "react-icons/fa";
import './../../../../css/BillingApp/sideMenu.scss';
import Divider from "../../common/components/dividerComponent";
import Icon from "../../common/components/icon";
import { axiosInstance, getRouteUrl } from '../../common/components/axiosService';
import { Inertia } from '@inertiajs/inertia';

export default function SideMenu({ user }) {
    const [menu, triggerMenu] = useState(false);
    const profile = '/storage/assets/default-img.png';
    let sideMenuList = [
        { name: 'Dashboard', icon: 'dashboard', url: 'billingapp.dashboard' },
        { name: 'Products', icon: 'dashboard', url: 'billingapp.product' },
        { name: 'Store', icon: 'dashboard',  url: "billingapp.store"},
        { name: 'Messages', icon: 'dashboard' },
        { name: 'Statistics', icon: 'dashboard' },
        { name: 'Invoices', icon: 'dashboard' },
        { name: 'To Do list', icon: 'dashboard' },
        { name: 'Finances', icon: 'dashboard' }
    ]
    const redirectToComp = (url) => {
        if (url) {
            Inertia.visit(url);
        }
    }
    const handleMouseEnter = () => {
        triggerMenu(true);
    };
    const logout = () => {
        axiosInstance.post('/logout', {})
            .then((response) => {
                window.location.href = getRouteUrl('billingapp.home')
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    }
    const handleMouseLeave = () => {
        triggerMenu(false);
    };
    return (
        <div className="sidebg rounded-lg shadow-lg p-2">
            <div className="rounded-md mb-2 bg-gray-600 p-4 relative flex justify-start gap-1 text-[#d8dce8] ">
                <div className="text-4xl ">
                    <FaBook />
                </div>

                <div>
                    <a href={getRouteUrl('billingapp.home')} className="text-xl font-bold  block leading-3">{process.env.MIX_BILLING_APP_NAME || `Billing App`}</a>
                    <a href={process.env.MIX_APP_URL} target="_blank" className="ms-5 leading-5 text-xs">by {process.env.MIX_APP_NAME}</a>

                </div>
            </div>
            <Divider classArr={['bg-[#d8dce8]', 'h-[0.09rem]' , 'mb-2']} />
            <div className="text-white mb-2 bg-gray-600 p-2 rounded-md">
                {(user && <div className='flex justify-evenly text-[0.7rem] gap-[0.5rem]'>
                    <div className='flex justify-center items-center'>
                        <div className='w-[2rem] h-[2rem] rounded-[50%] border-2 border-white'>
                            <img src={profile} alt="Profile" />
                        </div>
                    </div>
                    <div>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <div className=' relative flex justify-center items-center roboto-condensed-font text-[0.8rem] ' onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <Icon name='dropdown_arrow' className='h-[0.5rem] w-[0.5rem] fill-white' />
                        {(menu && <div className={`rounded-md absolute top-6 right-0 w-[9rem] h-[auto] bg-[#FFFFFF] text-black  transition-opacity duration-300 ${menu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            <ul className="list-none p-0 rounded-[inherit]">
                                <li className="p-2 hover:bg-cyan-400 hover:text-white hover:rounded-[inherit]"><button onClick={() => window.location.href = '/dashboard'}>Dashboard</button></li>
                                <li className="p-2 hover:bg-cyan-400 hover:text-white hover:rounded-[inherit]"><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>)}
                    </div>
                </div>)}

            </div>
            <div className="rounded-md mb-2 bg-gray-600 text-[#676d79] smooch-sans-font">
                <div className="flex flex-col ">
                    {sideMenuList.map((el, ind) => {
                        // #9498a0
                        return (
                            <div className={`flex  gap-2 text-[#fff] px-6 py-4 ${el.url ? (getRouteUrl(el.url) == window.location.href ? 'active last:rounded-b-md first:rounded-t-md' : '') : ''} hover:bg-[#9498a0] last:hover:rounded-b-md first:hover:rounded-t-md`} key={ind} onClick={() => { redirectToComp(el.url ? getRouteUrl(el.url) : '') }}>
                                <div className="flex justify-center items-center">
                                    <Icon name={el.icon} size="1.5rem" />
                                </div>
                                <div>{el.name}</div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}