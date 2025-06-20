import { FaBook } from "react-icons/fa";
import Auth from "../../common/auth";
import "../../../../css/BillingApp/header.css"

export default function Header() {
    let url = process.env.MIX_APP_URL
    return (
        <div className="w-full headerBg text-white flex">
            <div className=" p-4 relative flex justify-start gap-1 w-full">
                <div className="text-4xl ">
                    <FaBook />

                </div>

                <div>
                    <p className="text-xl font-bold leading-3">{process.env.MIX_BILLING_APP_NAME || `Billing App`}</p>
                    <a href={url} target="_blank" className="ms-5 leading-5 text-xs">by {process.env.MIX_APP_NAME}</a>

                </div>
            </div>
            <div className="flex justify-end w-full p-4">
                <Auth isOpen={false} />

            </div>

        </div>

    )
}