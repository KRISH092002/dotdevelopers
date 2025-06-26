import { useState, useEffect } from 'react'
import Input from './components/inputs';
import { axiosInstance, getRouteUrl } from '../common/components/axiosService';
import { usePage } from '@inertiajs/inertia-react';
import Icon from './components/icon';
import Popup from './components/popup';
import useCustomForm from './components/useCustomForm';
import Button from './components/button';

export default function Auth({ isOpen }) {
  const profile = '/storage/assets/default-img.png';
  const { user } = usePage().props;
  const [open, setOpen] = useState(isOpen ?? true);
  const loginData = useCustomForm({
    email: '',
    password: ''
  });
  const signUpData = useCustomForm({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    new_password: '',
    conf_password: '',


  });
  const [setLogin, switchMode] = useState(true);
  const [menu, triggerMenu] = useState(false);

  const emailCheck = async (event) => {
    if (signUpData.tm1) {
      clearTimeout(signUpData.tm1)
    }
    signUpData.tm1 = setTimeout(async () => {
      signUpData.setLoading(true)
      let email = event.target.value;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(email)) {
        const res = await fetch('/check/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        signUpData.handleChange('email', event.target.value, event)
        // signUpData.setErrors("email", data.message)
        signUpData.setLoading(false)
      } else {
        signUpData.setErrors("email", 'Please fill out this field with valid email.')
        signUpData.setHasError(true)
        signUpData.setLoading(false)
      }

    }, 1000)

  };
  const userNameCheck = async (event) => {
    if (signUpData.tm2) {
      clearTimeout(signUpData.tm2)
    }
    signUpData.tm2 = setTimeout(async () => {
      signUpData.setLoading(true)
      let userName = event.target.value;
      try {
        const res = await fetch('/check/user_name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify({ userName }),
        });

        const data = await res.json();
        signUpData.handleChange('user_name', event.target.value, event)
        // signUpData.setErrors('user_name', data.message)
        signUpData.setLoading(false)
      } catch (error) {
        signUpData.setErrors('user_name', 'Invalid User Name')
        signUpData.setHasError(true)
        signUpData.setLoading(false)
      } finally {
      }

    }, 1000)

  };
  const passwordValid = (event) => {
    let confPass = event.target.value;
    let new_password = document.querySelector('#new_password').value
    if (new_password == confPass) {
      signUpData.handleChange('conf_password', event.target.value, event)
    } else {
      signUpData.setErrors('conf_password', 'Oops! Password and confirm password must be identical.')
      signUpData.setHasError(true)
    }


  };

  const signUpSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    let required_fields = ['first_name', 'last_name', 'user_name', 'email', 'new_password', 'conf_password'],
      newErrors = signUpData.errors,
      hasError = signUpData.hasErrors;
    signUpData.setLoading(true)
    e.preventDefault();
    required_fields.forEach((key) => {
      for (key in signUpData.data) {
        if (Object.prototype.hasOwnProperty.call(signUpData.data, key)) {
          const element = signUpData.data[key];
          if (element.length == 0) {
            newErrors[key] = 'The field is required';
            hasError = true;

          }

        }
      }

    })
    signUpData.setErrors(newErrors);
    signUpData.setHasError(hasError);
    if (!hasError) {
      let fd = new FormData(e.target)
      axiosInstance.post('/signup', fd)
        .then((response) => {
          response = response.data;
          if (response.redirect) {
            window.location.href = response.redirect;
          }
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    } else {
      // signUpData.reset()
      signUpData.setLoading(false)
    }


  };

  const loginSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    let required_fields = ['email', 'password'],
      newErrors = loginData.errors,
      hasError = loginData.hasErrors;
    loginData.setLoading(true)
    e.preventDefault();
    required_fields.forEach((key) => {
      for (key in loginData.data) {
        if (Object.prototype.hasOwnProperty.call(loginData.data, key)) {
          const element = loginData.data[key];
          if (element.length == 0) {
            newErrors[key] = 'The field is required';
            hasError = true;

          }

        }
      }

    })
    loginData.setErrors(newErrors);
    loginData.setHasError(hasError);
    if (!hasError) {
      let fd = new FormData(e.target)
      axiosInstance.post('/login', fd)
        .then((response) => {
          response = response.data;
          if (response.redirect) {
            window.location.href = response.redirect;
          } else if (response.error == 'Invalid') {
            loginData.reset();
            signUpData.handleChange('email', loginData.data.email)
            switchMode(!setLogin)
          }
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    } else {
      loginData.setLoading(false)
    }


  };


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
  useEffect(() => {
    if (open) {
      // Do something when opened
    } else {
      // Do something when closed
    }

  }, [open, loginData, signUpData]);

  let signUp = <div> <form onSubmit={signUpSubmit}>
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="flex flex-wrap ">
        <div className='w-1/2'>
          <Input type='text' label='First Name' id='first_name' event='onChange' name='first_name' placeholder="Enter First Name" value={signUpData.data.first_name} required={false} handler={(e) => signUpData.handleChange('first_name', e.target.value, e)} Validate={true} onError={!signUpData.errors.first_name} errorMsg={signUpData.errors.first_name} />
        </div>
        <div className='w-1/2'>
          <Input type='text' label='Last Name' value={signUpData.data.last_name} id='last_name' name='last_name' placeholder="Enter last Name" Validate={true} required={false} event='onChange' onError={!signUpData.errors.last_name} errorMsg={signUpData.errors.last_name} handler={(e) => signUpData.handleChange('last_name', e.target.value, e)} />
        </div>
      </div>
      <Input required={false} type='text' label='User Name' id='user_name' name='user_name' placeholder="Enter User Name" Validate={true} handler={userNameCheck} onError={!signUpData.errors.user_name} errorMsg={signUpData.errors.user_name} event='onChange' />

      <Input required={false} type='email' label='Email' event='onChange' handler={emailCheck} id='email' name='email' placeholder="Enter email" Validate={true} onError={!signUpData.errors.email} errorMsg={signUpData.errors.email} />

      <Input required={false} type='password' label='Password' id='new_password' name='new_password' placeholder="***********" event='onChange' value={signUpData.data.new_password} handler={(e) => signUpData.handleChange('new_password', e.target.value, e)} Validate={true} onError={!signUpData.errors.new_password} errorMsg={signUpData.errors.new_password} />

      <Input required={false} type='password' value={signUpData.data.conf_password} label='Confirm Password' id='conf_password' name='conf_password' placeholder="***********" event='onChange' handler={passwordValid} Validate={true} onError={!signUpData.errors.conf_password} errorMsg={signUpData.errors.conf_password} />
    </div>
    <div className='text-gray-500 text-sm text-center'>

      {setLogin && (
        <span onClick={() => { switchMode(!setLogin) }}>Don't have an account</span>
      )}
      {!setLogin && (
        <span onClick={() => { switchMode(!setLogin) }}>Already have an account</span>
      )}
    </div>
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <Button type='design2' label='Login' className={['sm:w-24', 'sm:h-10', 'bg-sky-500', 'hover:bg-sky-400']} isLoading={signUpData.loading} disabled={signUpData.hasErrors} submit={true} />

    </div>
  </form>
  </div>
  let login = <div><form onSubmit={loginSubmit}>
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <Input required={false} type='email' label='Email' event='onChange' handler={(e) => loginData.handleChange('email', e.target.value, e)} id='email' value={loginData.data.email} name='email' placeholder="Enter email" Validate={true} onError={!loginData.errors.email} errorMsg={loginData.errors.email} />

      <Input required={false} type='password' label='Password' value={loginData.data.password} id='password' name='password' placeholder="******************" event='onChange' handler={(e) => loginData.handleChange('password', e.target.value, e)} Validate={true} onError={!loginData.errors.password} errorMsg={loginData.errors.password} />

    </div>
    <div className='text-gray-500 text-sm text-center'>
      {setLogin && (
        <span onClick={() => { switchMode(!setLogin) }}>Don't have an account</span>
      )}
      {!setLogin && (
        <span onClick={() => { switchMode(!setLogin) }}>Already have an account</span>
      )}
    </div>
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <Button type='design2' label='Login' className={['sm:w-24', 'sm:h-10', 'bg-sky-500', 'hover:bg-sky-400']} isLoading={loginData.loading} disabled={loginData.hasErrors} submit={true} />
      {/* {window.location.pathname != '/login' && (<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setOpen(false)}>CANCEL</button>)} */}
    </div>
  </form>
  </div>
  let guest = window.location.pathname != '/login' && (<button className='uppercase font-medium' onClick={(event) => { setOpen(!open); event.stopPropagation(); }}>
    Sign up
  </button>);
  let auth = user ? <div className='flex text-[0.7rem] gap-[0.5rem]'>
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
    <div className='flex justify-center items-center'>
      <div className='w-[2rem] h-[2rem] rounded-[50%] border-2 border-white'>
        <img src={profile} alt="Profile" />
      </div>
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
  </div> : guest
  return (
    <>
      {user && user.id ? auth : guest}
      <Popup open={open} element={setLogin ? login : signUp} handler={() => setOpen(false)} />

    </>
  )
}