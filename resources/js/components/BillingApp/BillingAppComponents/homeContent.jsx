import Icon from '../../common/components/icon';
import "../../../../css/BillingApp/homeContent.css"

export default function HomeContent() {
    let url = process.env.MIX_APP_URL
    let about = [
        { icon: "fast_accurate_billing", heading: "Fast & Accurate Billing", content: "Streamline your invoicing process with our efficient billing system. Generate professional invoices in just a few clicks, complete with automated tax calculations, discounts, and payment tracking. Say goodbye to manual errors and delays—our smart tools ensure every bill is accurate, clear, and delivered on time" },
        { icon: "comprehensive_reports", heading: "Comprehensive Reports", content: "Gain deep insights into your financial performance with real-time, data-driven reports. Track revenue, expenses, and trends through interactive charts and detailed analytics. Export reports in multiple formats and make informed decisions with ease." },
        { icon: "user_friendly_interface", heading: "User-Friendly Interface", content: "Navigate effortlessly with our clean and intuitive design. Our platform is built for simplicity, ensuring a smooth experience for users of all skill levels. Get things done quickly with an organized layout and easy-to-use features." },
        { icon: "secure_reliable", heading: "Secure & Reliable", content: "Your data is protected with advanced encryption and regular backups. Our platform ensures secure transactions, reliable performance, and 24/7 system integrity, so you can manage your finances with confidence." },
    ]
    return (
        <>
            <div className="w-full  flex gap-5 headerBg text-white p-10">
                <div>
                    <h1><span className="capitalize text-4xl/[3rem]   font-extralight">Effortlessly manage your billing</span><br /><span className="capitalize text-4xl/[3rem] font-extralight"> and</span><br /><span className="capitalize text-4xl/[3rem] font-extralight"> reporting with our powerful,</span><br /><span className="capitalize text-4xl/[3rem] font-extralight">easy-to-use platform.</span>
                    </h1>

                    <p className="mt-4 text-balance text-base">Managing invoices and tracking business performance has never been easier. Our platform offers a seamless solution for generating bills, monitoring transactions, and analyzing detailed reports—all in one place.</p>

                    <h1 className='mt-9 font-extrabold text-lg'>Get Started Today!</h1>
                    <p className="mt-2  text-base">Take control of your billing and reporting with {process.env.MIX_BILLING_APP_NAME}. Start saving time and improving efficiency now!</p>
                </div>
                <div className="w-full">

                </div>
            </div>
            <div className="contianer mx-auto">
                <div className='px-12 m-5'>
                    <h1 className='uppercase font-bold'>
                        Why Choose {process.env.MIX_BILLING_APP_NAME}?
                    </h1>
                    <p>

                        We provide a smart and efficient way to handle your finances with features designed to save time and improve accuracy.
                    </p>

                </div>
                <div className='flex justify-center flex-col gap-4 items-center px-14'>
                    {
                        about.map((el, i) => {
                            return (
                                <div key={i} className='container flex w-4/5 border-indigo-800 border-2 rounded p-2'>
                                    <div>
                                        <Icon name={el.icon} />
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='font-semibold '>{el.heading}</h1>
                                        <p className='text-left text-thin w-full'>{el.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>
        </>
    )
}