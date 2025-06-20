import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import '../../../../css/HomeFile/serviceContent.css';

export default function Services() {
    
    
    let years = '1'
    let services = [
        "Custom Web Design",
        "Website Redesign",
        "E-commerce Development",
        "Content Management Systems (CMS)",
        "SEO Optimization",
        "Mobile-Responsive Design",
        "Website Maintenance & Support",
        "Custom Web Design",
        "Website Redesign",
        "E-commerce Development",
        "Content Management Systems (CMS)",
        "SEO Optimization",
        "Mobile-Responsive Design",
        "Website Maintenance & Support",
        "Custom Web Design",
        "Website Redesign",
        "E-commerce Development",
        "Content Management Systems (CMS)",
        "SEO Optimization",
        "Mobile-Responsive Design",
        "Website Maintenance & Support",

    ]


    let card = [
        {
            id: 1,
            heading: "Custom Website Design",
            content: "We create websites tailored to your brand, ensuring they are visually appealing, intuitive, and easy to navigate.",
        },
        {
            id: 2,
            heading: "E-commerce Development",
            content: "Unlock the full potential of online sales with our custom eCommerce solutions. We design secure, scalable platforms that drive conversions.",
        },
        {
            id: 3,
            heading: "SEO Optimization",
            content: "Get found online! Our SEO services improve your website’s visibility, ensuring you rank higher in search engines and attract more visitors.",
        },
        {
            id: 4,
            heading: "CMS Development",
            content: "Take control of your content with a user-friendly CMS. Whether it’s WordPress, Joomla, or custom solutions, we provide tools that empower you to manage your site.",
        },
        {
            id: 5,
            heading: "Responsive Web Design",
            content: "Your website will look great and work flawlessly on all devices, from desktop to mobile, thanks to our mobile-first design approach.",
        },
        {
            id: 6,
            heading: "Website Maintenance & Support",
            content: "Our job isn’t finished when your site goes live. We offer ongoing maintenance, updates, and support to keep your site running smoothly.",
        },

    ]
    const [slides, setSlides] = useState(services);

    // Function to toggle the flag state
    const handleUpdate = (event) => {
        let dropBox = $(event.currentTarget).parent().next('.dropBox')
        if ($(dropBox).hasClass('slide-close')) {
            $(dropBox).addClass('slide-open')
            $(dropBox).removeClass('slide-close')
            $(event.currentTarget).parents('.li').siblings().children('.dropBox').slideUp('slow')
            $(event.currentTarget).parents('.li').siblings().children('.dropBox').addClass('slide-close')
            $(event.currentTarget).parents('.li').siblings().children('.dropBox').removeClass('slide-open')
            $(dropBox).slideDown("slow");
        } else {
            $(dropBox).slideUp("slow");
            $(dropBox).removeClass('slide-open')
            $(dropBox).addClass('slide-close')
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setSlides(prevSlides => {
                const [firstSlide, ...restSlides] = prevSlides;
                return [...restSlides, firstSlide];

            });
        }, 20000);

        return () => clearTimeout(timer);
    });

    return (
        <div className='container m-10 overflow-x-hidden  mx-auto serviceBg rounded-md'>
            <div className='uppercase tracking-widest p-2 text-center text-xl font-medium text-gray-800'>
                Services
            </div>

            <div className='inline-flex gap-4 max-w-full slides p-4 '>

                {slides.map((item, index) => { return <div key={index} className="border-solid rounded-md listColor border-2 outline outline-2 outline-offset-4 p-1 move-left  w-full text-nowrap " >{item}</div> })}
            </div>

            <div className='lg:px-24 md:px-16 m-10 roboto-condensed-font text-center sm:text-left'>
                <p className='mb-2'>"We specialize in creating high-quality, custom websites that drive business growth. Whether you're a startup or an established enterprise, our team ensures that your online presence stands out."
                </p>
                <p>"With over {years} years of experience, we understand the unique needs of businesses. From eCommerce platforms to corporate websites, we tailor every project to your goals."
                </p>
            </div>
            <div className='lg:px-24 md:px-16 m-10'>
                {card.map((item, index) => {
                    return <div className="li flex lg:mx-20  flex-col" key={item.id}>
                        <div className="justify-between flex">
                            <div className="w-5/6 roboto-condensed-font">{item.heading}
                            </div>
                            <div className="iconDown" onClick={handleUpdate}><IoIosArrowDown /></div>

                        </div>
                        <span className='block sm:text-base text-[small] dropBox pl-1 m-4 d-none slide-close'>- {item.content}</span>
                    </div>
                })}

            </div>
        </div>
    )


}