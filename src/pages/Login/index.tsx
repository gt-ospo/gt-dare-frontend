import React, { useEffect, useState } from 'react'
import AuthCard from '../../components/Auth/AuthCard'
import AuthFormFooter from '../../components/Auth/AuthFormFooter'
import {
  LoginFormValues,
  loginInitialValues,
  loginValidationSchema,
} from './validation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import {
  getUserData,
  userLogin,
  resendVerification,
} from '../../redux/asyncThunks/user'
import { resetError } from '../../redux/userSlice'
import { useAppSelector } from '../../redux/hooks'
import { toast } from '@/hooks/use-toast'
import GTLoginLayout from '@/components/Auth/GTLoginLayout'

const LoginScreen: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAppSelector((state) => state.user)
  const [resendSuccess, setResendSuccess] = useState(false)

  useEffect(() => {
    dispatch(resetError())
  }, [dispatch])

  useEffect(() => {
    const checkAndShowToast = () => {
      const sessionExpiredToast = localStorage.getItem('sessionExpiredToast')

      if (sessionExpiredToast) {
        try {
          const toastData = JSON.parse(sessionExpiredToast)

          const currentTime = Date.now()
          const timeDiff = currentTime - toastData.timestamp
          const isRecent = timeDiff < 30000

          if (isRecent) {
            toast({
              title: toastData.title,
              description: toastData.description,
              variant: toastData.variant,
              permanent: true, // Make session expired toast permanent
            })
          }

          localStorage.removeItem('sessionExpiredToast')
        } catch (error) {
          console.error('Error parsing session expired toast:', error)
          localStorage.removeItem('sessionExpiredToast')
        }
      }
    }

    checkAndShowToast()

    const timeoutId = setTimeout(() => {
      checkAndShowToast()
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(userLogin(values)).unwrap()
      await dispatch(getUserData()).unwrap()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const handleResendVerification = async (values: LoginFormValues) => {
    try {
      const resultAction = await dispatch(resendVerification(values))
      if (resendVerification.rejected.match(resultAction)) {
        return
      }
      setResendSuccess(true)
    } catch (error) {
      console.error('Failed to resend verification email:', error)
    }
  }

  const formikConfig = {
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  }

  const inputs = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ]

  return (
    <GTLoginLayout>
      <AuthCard<LoginFormValues>
        title='Sign in'
        embedded
        inputs={inputs}
        formikConfig={formikConfig}
        buttonText='Sign In'
        showForgotPassword
        onResendVerification={handleResendVerification}
        footer={
          <>
            <AuthFormFooter
              text="Don't have an account?"
              route='/register'
              routeText='Sign up'
            />

            {resendSuccess && (
              <div className='mt-3 max-w-full rounded-md bg-accent px-4 py-2 text-xs font-medium text-accent-foreground shadow-xs'>
                Verification email resent successfully. Please check your inbox.
              </div>
            )}
          </>
        }
      />
    </GTLoginLayout>
  )
}

export default LoginScreen
