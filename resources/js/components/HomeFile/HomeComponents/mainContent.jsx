import '../../../../css/HomeFile/mainContent.css';



export default function Mid() {

  let goToContact = () => {
    let element = document.getElementById("contact");
    window.scroll({
      top: element && element.getBoundingClientRect().top,
      left: element && element.getBoundingClientRect().left,
      behavior: "smooth",
    });
    ;
  }
  return (
    <div className="main-shadow ">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 text-4xl sm:text-5xl font-bold smooch-sans-font
             text-white">
              <span className="">.Developers</span>
            </a>
          </div>
         
        </nav>
        
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8 midBg">
        
            <div className='container'>
                <div className='columns-1 lg:w-1/2 pb-[5rem] pt-[5rem] md:w-full'>

                    <div className="text-white pt-6 text-center sm:text-left">
                        <h1 className='text-center sm:text-left text-wrap  text-5xl md:text-6xl font-extrabold' >
                        Build Your Online Presence
                        </h1>
                        <div className='text-center sm:text-left text-balance   sm:text-pretty mt-4 text-[small] md:text-base' >
                            <p>Delivering innovative, responsive, and results-driven<br /> web solutions for businesses of all sizes</p>
                        </div>
                        <div className='text-center sm:text-left text-balance sm:text-pretty mt-4 text-[small] md:text-base' >
                            <p>Creating content for a business website development site<br/> requires a balance of providing useful information, showcasing your expertise, and<br/> making it easy for potential clients to understand how you can help them.</p>
                        </div>
                        <p className=' ring-1 p-[3px] text-center sm:w-72 w-full rounded-2xl  mt-4 md:text-sm text-[small]'>
                        Get Your Free Consultation Today! Read more 
                        </p>
                        <button type="button" onClick={goToContact} className=' mt-7 tracking-tight uppercase font-medium p-2 w-56 bg-sky-500 hover:bg-cyan-300  text-center  rounded-sm'>Hire Now </button>
                    </div>
                </div>
                <div className='columns-2 w-1/2'></div>

            </div>
        
      </div>
    </div>
  )
}
