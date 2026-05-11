import React, { use } from 'react'
import { useCallback } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import {useVerifyEmail} from '../hooks/useVerifyEmail'
import logo from '../../../assets/img/kinal_sports.png'

const VerifyEmailPage = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const token = new URLSearchParams(location.search).get('token')

    const handleFinish = useCallback(() => {
        setTimeout(() => {
            navigate('/login')
        }, 2000)
    }, [navigate])

    const { status, message } = useVerifyEmail(token, handleFinish)

    const displayMessage = status === 'loading' ? 'Verificando tu correo electrónico...' : message
  return (
    <div>
        <img src={logo} alt="kinal Sports" className='w-28 h-28 object-contain mb-4' />
        <p className='text-lg font-semibold tex-gray-700 text-center max-w-lg'>{displayMessage}</p>
    </div>
  )
}

export default VerifyEmailPage