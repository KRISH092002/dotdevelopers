import "../../../../css/common/inputs.css";

export default function Input(props) {
  let { type, id, label, name, placeholder, event, handler, onError, Validate, errorMsg, required, autofocus, value, options, dataList, list, pattern, rows, cols } = props
  let input;
  switch (type) {
    case 'text': case 'email': case 'password':
      // h-[5rem]
      if (dataList) {
        input = <div className="w-full px-3 mb-3 ">
          <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
          <input className="appearance-none block w-full  text-gray-700 border-2 border-black-400 rounded-md py-2 px-2  leading-3 focus:outline-none focus:bg-white focus:border-indigo-500" id={(id ? id : undefined)} name={name ? name : undefined} placeholder={placeholder ? placeholder : undefined} type={type}  {...{ [event]: handler }} {...(required ? { required: true } : {})} value={value} list={list} />
          {Validate && (
            <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
              {errorMsg ? errorMsg : 'required field.'}
            </p>
          )}
          <datalist id={list}>
            {options.data && options.data.map((el, ind) => {
              return (<option key={ind} value={el[options.value]}>{options.name ? el[options.name] : el[options.value]}</option>)
            })}
          </datalist>

        </div>
      } else {
        input =
          <div className="w-full px-3 mb-3 ">
            <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
            <input className="appearance-none block w-full  text-gray-700 border-2 border-black-400 rounded-md py-2 px-2  leading-3 focus:outline-none focus:bg-white focus:border-indigo-500" id={(id ? id : undefined)} name={name ? name : undefined} placeholder={placeholder ? placeholder : undefined} type={type}  {...{ [event]: handler }} {...(required ? { required: true } : {})} value={value} />
            {Validate && (
              <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
                {errorMsg ? errorMsg : 'required field.'}
              </p>
            )}
          </div>

      }
      break;
    case 'number':
      input =
        <div className="w-full px-3 mb-3 ">
          <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
          <input className="appearance-none block w-full  text-gray-700 border-2 border-black-400 rounded-md py-2 px-2  leading-3 focus:outline-none focus:bg-white focus:border-indigo-500" id={(id ? id : undefined)} name={name ? name : undefined} placeholder={placeholder ? placeholder : undefined} type={type}  {...{ [event]: handler }} {...(required ? { required: true } : {})} value={value} />
          {Validate && (
            <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
              {errorMsg ? errorMsg : 'required field.'}
            </p>
          )}
        </div>
      break
    case 'select':
      input =
        <div className="w-full px-3 mb-3 ">
          <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
          <select className="appearance-none block w-full  text-gray-700 border-2 border-black-400 rounded-md py-2 px-3  leading-5 focus:outline-none focus:bg-white focus:border-indigo-500" id={(id ? id : undefined)} name={name ? name : undefined} type={type}  {...{ [event]: handler }} {...(required ? { required: true } : {})} value={value} >
            <option value=''> None</option>
            {options.data && options.data.map((el, ind) => {
              return (<option key={ind} value={el[options.value]}>{options.name ? el[options.name] : el[options.value]}</option>)
            })}
          </select>
          {Validate && (
            <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
              {errorMsg ? errorMsg : 'required field.'}
            </p>
          )}
        </div>
      break
    case 'tel':
      input =
        <div className="w-full px-3 mb-3 ">
          <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
          <input pattern={pattern} className="appearance-none block w-full  text-gray-700 border-2 border-black-400 rounded-md py-2 px-2  leading-3 focus:outline-none focus:bg-white focus:border-indigo-500" id={(id ? id : undefined)} name={name ? name : undefined} placeholder={placeholder ? placeholder : undefined} type={type}  {...{ [event]: handler }} {...(required ? { required: true } : {})} value={value} />
          {Validate && (
            <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
              {errorMsg ? errorMsg : 'required field.'}
            </p>
          )}
        </div>
      break
    case 'checkbox':
      input =
        <div className="w-full px-3 mb-3 ">
          <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-5 focus:outline-none focus:bg-white focus:border-gray-500" id={(id ? id : undefined)} name={name ? name : undefined} type={type}  {...{ [event]: handler }} {...(required ? { required: true } : {})} checked={value} />
          {Validate && (
            <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
              {errorMsg ? errorMsg : 'required field.'}
            </p>
          )}
        </div>
      break;
    case 'textarea':
      input = <div className="w-full px-3 mb-3 ">
        <label className="block font-[Roboto] uppercase tracking-wide text-zinc-800 text-xs font-bold mb-2" htmlFor={id}>{label}</label>
        <textarea className='appearance-none block w-full  text-gray-700 border-2 border-black-400 rounded-md  py-2 px-2  leading-3 focus:outline-none focus:bg-white focus:border-indigo-500' id={(id ? id : undefined)} name={name ? name : undefined} placeholder={placeholder ? placeholder : undefined} {...{ [event]: handler }} {...(required ? { required: true } : {})} value={value} rows={rows ? rows : "4"} cols={cols ? cols : "50"}></textarea>
        {Validate && (
          <p className={`text-red-500 text-xs italic ${onError ? 'hidden' : ''}`}>
            {errorMsg ? errorMsg : 'required field.'}
          </p>
        )}
      </div>
      break;
    default:
      break;
  }
  return input

}

{/* <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
      <p class="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        City
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque">
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210">
    </div>
  </div>
</form> */}