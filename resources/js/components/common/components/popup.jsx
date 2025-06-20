export default function Popup({ open, element }) {
    return (
        <>
            {
                open && (
                    <div className={open ? 'show' : 'hide'}>

                        <div className="relative z-10 bg_backdrop" aria-labelledby="dialog-title" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500/75 transition-opacity " aria-hidden="true" ></div>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto animate-dialog-panel">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
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
