import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const UserForm = ({ getUser, usersSelect, deselectUser, setAdd }) => {
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: '',
  }
  const { handleSubmit, register, reset } = useForm()
  useEffect(() => {
    if (usersSelect) {
      reset(usersSelect)
    } else {
      reset(initialValues)
    }
  }, [usersSelect])

  const submit = (data) => {
    console.log(data)
    if (usersSelect) {
      axios
        .put(`https://users-crud1.herokuapp.com/users/${usersSelect.id}/`, data)
        .then(() => {
          getUser()
          deselectUser()
        })
        .catch((error) => console.log(error.response?.data))
    } else {
      axios
        .post('https://users-crud1.herokuapp.com/users/', data)
        .then(() => getUser())
        .catch((error) => console.log(error.response?.data))
    }
  }

  return (
    <div>
      <div
        className='top-0 right-0 bottom-0 left-0  fixed bg-gray-900/80 '
        onClick={() => setAdd(false)}
      ></div>
      <form
        onSubmit={handleSubmit(submit)}
        className='bg-white p-8 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:bg-cyan-800 pb-0  transition-transform'
      >
        <h1 className='text-[25px] font-semibold mb-3'>New User</h1>

        <div className='mb-2 flex items-center w-full'>
          <i className='fa-solid fa-user  w-[15px]'></i>
          {/* <label htmlFor="first_name">Nombre</label> */}
          <div className='w-full flex'>
            <input
              className='bg-sky-200 p-2 rounded-md ml-2 pl-2 w-1/2'
              {...register('first_name')}
              type='text'
              id='first_name'
              placeholder='ingrese su nombre'
            />
            <input
              className='bg-sky-200 p-2 rounded-md ml-2 pl-2 w-1/2'
              {...register('last_name')}
              type='text'
              id='last_name'
              placeholder='ingrese sus apellidos'
            />
          </div>
        </div>

        <div className='mb-2 flex'>
          <i className='fa-solid fa-envelope  w-[15px]'></i>
          {/* <label htmlFor="email">Email</label> */}
          <input
            className='bg-sky-200 p-2 rounded-md ml-2 pl-2 w-full'
            {...register('email')}
            type='Email'
            id='email'
            placeholder='ingrese su email'
          />
        </div>
        <div className='mb-2 flex'>
          <i className='fa-solid fa-lock  w-[15px]'></i>
          {/* <label htmlFor="password">Password</label> */}
          <input
            className='bg-sky-200 p-2 rounded-md ml-2 pl-2 w-full'
            {...register('password')}
            type='password'
            id='password'
            placeholder='ingrese su password'
          />
        </div>
        <div className='mb-2'>
          <i className='fa-solid fa-cake-candles  w-[15px]'></i>
          {'  '}
          {/* <label htmlFor="birthday">Birthday</label> */}
          <input
            className='bg-sky-200 rounded-md ml-1 pl-2 pr-3'
            {...register('birthday')}
            type='date'
            id='birthday'
            placeholder='ingrese la fecha de su birthday'
          />
        </div>
        <button className='bg-[#37acdae6]  p-2 rounded-xl w-full mt-5 h-10 hover:bg-[#2fd9efd9] duration-1000 hover:translate-y-2'>
          CREATE
        </button>
      </form>
    </div>
  )
}

export default UserForm
