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
    password : ''
  });
  const [emailValid, setResponse] = useState({ bool: false, message: 'Please fill out this field.' });
  const [userNameValid, userResponse] = useState({ bool: false, message: 'Please fill out this field.' });
  const [newPassValid, passwordCheck] = useState({ bool: false, message: 'The password must be at least 8 characters.' });
  const [confPassValid, confirmCheck] = useState({ bool: false, message: 'Oops! Password and confirm password must be identical.' });

  const [btnDisabled, disableBtn] = useState(true);
  const [setLogin, switchMode] = useState(true);
  const [menu, triggerMenu] = useState(false);

  const emailCheck = async (event) => {
    let email = event.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (setLogin) {
        if (email && email.length == 0) {
          setResponse({ bool: true, message: 'Please fill out this field.' });
        } else {
          setResponse({ bool: false, message: 'Please fill out this field.' });
        }
      } else {
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
          setResponse(data);
        } else {
          setResponse({ bool: true, message: 'Please fill out this field with valid email.' });
        }

      }
    } catch (error) {
      setResponse({ bool: true, message: 'Please fill out this field.' });
    } finally {
    }


  };
  const userNameCheck = async (event) => {
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
      userResponse(data);
    } catch (error) {
      userResponse({ bool: true, message: 'Please fill out this field.' });
    } finally {
    }

  };
  const passwordValid = (event) => {
    let confPass = event.target.value;
    let new_password = document.querySelector('#new_password').value
    if (new_password == confPass) {
      confirmCheck({ bool: false, message: 'The password must be at least 8 characters.' })
    } else {
      confirmCheck({ bool: true, message: 'Oops! Password and confirm password must be identical.' })
    }


  };
  const newPasswordValid = (event) => {
    let new_password = event.target.value
    if (new_password && new_password.length < 8) {
      passwordCheck({ bool: true, message: 'The password must be at least 8 characters.' })
    } else {
      passwordCheck({ bool: false, message: 'The password must be at least 8 characters.' })
    }


  };
  const signUpSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!btnDisabled) {
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
    }


  };

  const loginSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
      let required_fields = ['email' , 'password'],
      newErrors = loginData.errors,
      hasError = loginData.hasErrors;
    loginData.setLoading(true)
    e.preventDefault();
    required_fields.forEach((key) => {
      for (key in loginData.data) {
        if (Object.prototype.hasOwnProperty.call(loginData.data, key)) {
          const element = loginData.data[key];
          if (element.length == 0) {
            newErrors[key] = true;
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
          }
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
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
    if (newPassValid.bool && confPassValid.bool && userNameValid.bool && emailValid.bool) {
      disableBtn(true)
    } else {
      disableBtn(false)
    }
  }, [open, emailValid, userNameValid, newPassValid]);

  let signUp = <div> <form onSubmit={signUpSubmit}>
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="flex flex-wrap ">
        <div className='w-1/2'>
          <Input type='text' label='First Name' id='first_name' name='first_name' placeholder="Enter User Name" Validate={false} required={true} />
        </div>
        <div className='w-1/2'>
          <Input type='text' label='Last Name' id='last_name' name='last_name' placeholder="Enter User Name" Validate={false} required={true} />
        </div>
      </div>
      <Input required={true} type='text' label='User Name' id='user_name' name='user_name' placeholder="Enter User Name" Validate={true} handler={userNameCheck} onError={!userNameValid.bool} errorMsg={userNameValid.message} event='onBlur' />
      <Input required={true} type='email' label='Email' event='onBlur' handler={emailCheck} id='email' name='email' placeholder="Enter email" Validate={true} onError={!emailValid.bool} errorMsg={emailValid.message} />

      <Input required={true} type='password' label='Password' id='new_password' name='new_password' placeholder="******************" event='onChange' handler={newPasswordValid} Validate={true} onError={!newPassValid.bool} errorMsg={newPassValid.message} />
      <Input required={true} type='password' label='Confirm Password' id='conf_password' name='conf_password' placeholder="***********" event='onChange' handler={passwordValid} Validate={true} onError={!confPassValid.bool} errorMsg={confPassValid.message} />
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
      <button type="submit" disabled={btnDisabled} className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 sm:ml-3 sm:w-auto bg-" >LOGIN</button>
      {window.location.pathname != '/login' && (<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setOpen(false)}>CANCEL</button>)}
    </div>
  </form>
  </div>
  let login = <div><form onSubmit={loginSubmit}>
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <Input required={true} type='email' label='Email' event='onChange' handler={(e) => loginData.handleChange('email', e.target.value , e)} id='email' name='email' placeholder="Enter email" Validate={true} onError={!loginData.errors.email} errorMsg={loginData.errors.email} />

      <Input required={true} type='password' label='Password' id='password' name='password' placeholder="******************" event='onChange' handler={(e) => loginData.handleChange('password', e.target.value , e)} Validate={true} onError={!loginData.errors.password} errorMsg={loginData.errors.password} />

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
      <Button type = 'design2' label='Login' isLoading={loginData.loading} disabled={loginData.hasErrors} submit={true}/>
      {window.location.pathname != '/login' && (<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setOpen(false)}>CANCEL</button>)}
    </div>
  </form>
  </div>
  let guest = window.location.pathname != '/login' && (<button onClick={(event) => { setOpen(!open); event.stopPropagation(); }}>
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