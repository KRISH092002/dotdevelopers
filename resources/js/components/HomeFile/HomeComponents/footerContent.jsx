
import { FaFacebook } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import '../../../../css/HomeFile/footerContent.css';

export default function Footer() {


    
    
    return (
        <div className=' footerBg p-11 px-7 md:px-14 w-full'>
            <div className="flex flex-col">
                <div className="flex justify-center mb-8">
                    <ul className="inline-flex gap-2 text-[small] sm:text-base sm:gap-5 lg:gap-10">
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Portfolio</li>
                        <li>Blog</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="flex justify-center mb-8 ">
                    <ul className="inline-flex gap-4 text-2xl sm:text-4xl lg:gap-10">
                        <li className=""><FaFacebook /></li>
                        <li className=""><IoMail /></li>
                        <li className=""><FaGithub /></li>
                        <li className=""><RiInstagramFill /></li>
                    </ul>
                </div>

                <div className="h-0 w-full border divderColor border-solid mb-8"></div>

                <div className="flex justify-center mb-4">
                    <p className="text-sm text-zinc-600">© 2024 .Developers. All rights reserved.</p>
                </div>

            </div>
            
            
        </div>
    )


}