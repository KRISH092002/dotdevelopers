
export default function Button({ type,isLoading,svg, handler, submit, progress , label , disabled ,className }) {
    let button;
    switch (type) {
        case 'design1':
            button = <button
                onClick={handler ? handler : undefined}
                disabled={disabled || isLoading}
                type={submit ? 'submit' : undefined}
                className="relative px-10 py-3 rounded-lg bg-pink-600 text-white font-semibold shadow-xl hover:bg-pink-700 disabled:opacity-60 disabled:cursor-wait transition-all duration-200"
            >
                {isLoading && (
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <div className="relative w-4 h-4">
                            <div className="absolute inset-0 rounded-full bg-pink-300 opacity-75 animate-ping"></div>
                            <div className="relative w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </span>
                )}
                {isLoading ? 'Processing...' : label}
            </button>
            break;
        case 'design2':
            button = <button
                onClick={handler ? handler : undefined}
                disabled={disabled || isLoading}
                type={submit ? 'submit' : undefined}
                className={`relative flex items-center justify-center   rounded-md text-white font-semibold  disabled:opacity-50  disabled:cursor-wait transition-all ${className && className.join(' ')}`}
            >
                {isLoading ? (
                    <svg className="w-7 h-7 animate-spin" viewBox="0 0 50 50">
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f0f2f2" />
                                <stop offset="100%" stopColor="#e5e6e8" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="url(#grad)"
                            strokeWidth="4"
                            strokeDasharray="100"
                            strokeDashoffset="60"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    label
                )}
            </button>
            break;
        case 'progress_btn':
            button = <button
                onClick={handler ? handler : undefined}
                disabled={isLoading}
                className="relative w-56 h-12 text-white bg-blue-600 rounded-md overflow-hidden shadow-md hover:bg-blue-700 disabled:cursor-wait transition-all"
            >
                <span className="relative z-10">
                    {isLoading ? `Processing... ${progress}%` : 'Submit with Progress'}
                </span>

                {/* Progress Bar */}
                {isLoading && (
                    <span
                        className="absolute left-0 top-0 h-full bg-blue-400 opacity-30 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    />
                )}
            </button>
            break;
        case "circular_progress":
            const radius = 12;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;
            button = <button
                onClick={handler ? handler : undefined}
                disabled={isLoading}
                className="relative w-56 h-12 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
            >
                {isLoading && (
                    <svg className="w-6 h-6" viewBox="0 0 30 30">
                        <circle
                            cx="15"
                            cy="15"
                            r={radius}
                            stroke="#ffffff30"
                            strokeWidth="4"
                            fill="none"
                        />
                        <circle
                            cx="15"
                            cy="15"
                            r={radius}
                            stroke="white"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="transition-all duration-75"
                        />
                    </svg>
                )}
                <span className="z-10">
                    {isLoading ? `Loading ${progress}%` : 'Start Circular Loader'}
                </span>
            </button>
            break;

        case 'drag&drop_btn':
            button = <button className="w-full border-2 border-dashed border-gray-400 rounded-lg p-6 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors">
                Drag & Drop files or <span className="underline text-blue-500">browse</span>
            </button>
            break;
        case 'icon_btn':
            // bg-gradient-to-tr from-blue-600 to-teal-400
            button = <button onClick={handler ? handler : undefined} className={` flex items-center justify-center  text-white  hover:scale-110 transition duration-300 shadow-lg ${className.join(' ')} `}>
                { (svg ? svg :<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3.5 3.5M12 12l3.5 3.5M12 3v9" />
                </svg>)}
            </button>
            break;

        case 'normal_btn':
            button = <button className={`relative px-5 py-2 rounded-md   text-white font-medium transition-all duration-300  shadow-md 
               ${className.join(' ')}  `} onClick={handler ? handler : undefined}>
               { label} 
            </button>
            break;
        case 'simple_btn':
            button = <button className={`flex items-center gap-2 px-5 py-2 rounded-md  text-white transition shadow-md ${className.join(' ')}`} onClick={handler ? handler : undefined}>
               { (svg ? svg :<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3.5 3.5M12 12l3.5 3.5M12 3v9" />
                </svg>)}
                {  label}
            </button>
            break;
        default:
            button = <button
                className="relative px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition group"
            >
                <span className="block group-hover:hidden">Upload File</span>
                <span className="hidden group-hover:block">Let’s Go 🚀</span>
            </button>
            break;
    }
    return button
}