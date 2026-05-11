import React from 'react'
import { useForm } from 'react-hook-form'

export const ForgotPassworForm = ({ onSwitch }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Mandar información al backend
    console.log(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <label htmlFor="" className='block text-sm font-medium text-gray-800 mb-1.5'>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder='correo@ejemplo.com'
            className='w-full px-3 py-2 border rounded-lg'  
            {...register('email', { required: 'El correo es requerido' })}
          />
        </div>
        {
          errors.email && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.email.message}
            </p>
          )
        }
        <button
          type='submit'
          className='w-full bg-main-blue text-white  py-2 rounded-lg disabled:opacity50 hover:opacity-90 cursor-pointer'
        >
          Enviar Correo
        </button>
        <p className='text-center text-sm text-gray-600'>
          ¿Recordates tu contraseña?{" "}
          <button
            type='button'
            className='text-main-blue font-medium hover:opacity-80 cursor-pointer'
            onClick={onSwitch}
          >
            Iniciar Sesión
          </button>
        </p>
    </form>
  )
}
