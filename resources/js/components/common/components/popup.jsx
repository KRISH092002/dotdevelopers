import { IoCloseSharp } from "react-icons/io5";
export default function Popup({ open, element, handler , type}) {
    if (type == 'large') {
        return (

            <>
                {
                    open && (
                        <div className={open ? 'show' : 'hide'}>


                            <div className="relative z-10 bg_backdrop" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                                <div className="fixed inset-0 bg-gray-500/75 transition-opacity " aria-hidden="true" ></div>

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto animate-dialog-panel">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 flex-col">
                                        {handler && (<div className="container relative flex justify-end">
                                            <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-[50%]  absolute top-0 -right-6 bg-[#504d4d94] hover:bg-neutral-400 text-white
                                        " onClick={handler}><IoCloseSharp /></div></div>)}
                                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:mt-6 sm:my-8 container ">
                                            {element}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </>
        )
    } else {
        return (

            <>
                {
                    open && (
                        <div className={open ? 'show' : 'hide'}>


                            <div className="relative z-10 bg_backdrop" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                                <div className="fixed inset-0 bg-gray-500/75 transition-opacity " aria-hidden="true" ></div>

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto animate-dialog-panel">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 flex-col">
                                        {handler && (<div className="sm:w-full sm:max-w-lg relative flex justify-end">
                                            <div className="w-[1.5rem] h-[1.5rem] flex justify-center items-center rounded-[50%]  absolute top-0 -right-6 bg-[#504d4d94] hover:bg-neutral-400 text-white
                                            " onClick={handler}><IoCloseSharp /></div></div>)}
                                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:mt-6 sm:my-8 sm:w-full sm:max-w-lg ">
                                            {element}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </>

        )

    }
}
