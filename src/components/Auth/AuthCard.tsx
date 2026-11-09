import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { Formik, Form, FormikConfig, FormikValues } from 'formik'
import TextInput from '../ui/TextInput'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import { Button } from '../ui/button'
import PublicLayout from './PublicLayout'

interface InputField {
  name: string
  label: string
  type: string
}

interface AuthCardProps<T extends FormikValues> {
  title: string
  subtitle?: string
  subtitleClassName?: string
  inputs: InputField[]
  formikConfig: FormikConfig<T>
  buttonText: string
  showBackButton?: boolean
  showForgotPassword?: boolean
  showprivacyPolicy?: boolean
  footer?: React.ReactNode
  children?: React.ReactNode
  roleSelect?: React.ReactNode
  embedded?: boolean
  onResendVerification?: (values: T) => void
}

const AuthCard = <T extends FormikValues>({
  title,
  subtitle,
  subtitleClassName = '',
  inputs,
  formikConfig,
  buttonText,
  showBackButton = false,
  showForgotPassword = false,
  showprivacyPolicy = false,
  footer,
  children,
  roleSelect,
  embedded = false,
  onResendVerification,
}: AuthCardProps<T>) => {
  const Heading = embedded ? 'h2' : 'h1'
  const error = useSelector((state: RootState) => state.user.error)
  const loading = useSelector((state: RootState) => state.user.loading)

  const showResendButton =
    onResendVerification &&
    error &&
    error.toLowerCase().includes('e-mail is not verified')

  const content = (
    <div
      className={
        embedded ? 'w-full' : 'mx-auto w-full max-w-xl px-5 py-6 sm:px-8'
      }
    >
      <div
        className={
          embedded
            ? 'flex w-full flex-col items-center gap-3'
            : 'relative flex w-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8'
        }
      >
        {showBackButton && (
          <Link
            to='/login'
            className='inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm font-medium text-dare underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            <ArrowLeftIcon className='h-4 w-4' aria-hidden='true' />
            Back to login
          </Link>
        )}

        <Heading
          className={
            embedded
              ? 'w-full text-2xl font-semibold tracking-tight text-foreground'
              : 'w-full text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl'
          }
        >
          {title}
        </Heading>
        {subtitle && (
          <p
            className={`w-full text-base leading-relaxed text-muted-foreground ${subtitleClassName || 'text-start'}`}
          >
            {subtitle}
          </p>
        )}

        {children}

        <Formik {...formikConfig}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='w-full [&_input]:min-h-11 [&_input]:text-base'>
              {inputs.map((input) => (
                <TextInput
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  value={values[input.name] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors[input.name] && touched[input.name]
                      ? String(errors[input.name])
                      : ''
                  }
                />
              ))}

              {roleSelect}

              {showForgotPassword && (
                <div className='mb-4 flex justify-end text-sm'>
                  <Link
                    to='/forgot-password'
                    className='inline-flex min-h-11 items-center rounded-sm font-medium text-dare underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              {buttonText && (
                <Button
                  type='submit'
                  variant='default'
                  className='text-md mt-3 flex min-h-11 w-full items-center justify-center rounded-md px-4 py-2 font-medium'
                >
                  {loading ? <Loader /> : buttonText}
                </Button>
              )}

              {error && (
                <div className='mt-3'>
                  <p className='text-center text-xs font-medium text-destructive'>
                    {error}
                  </p>
                  {showResendButton && (
                    <div className='flex justify-center'>
                      <Button
                        type='button'
                        onClick={() =>
                          onResendVerification && onResendVerification(values)
                        }
                        disabled={loading}
                        className='mt-3 min-h-11 max-w-full rounded-md bg-secondary text-xs font-medium text-secondary-foreground shadow-xs hover:bg-secondary/80'
                      >
                        Resend Verification Email?
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>

        {footer && <div className='w-full'>{footer}</div>}

        {showprivacyPolicy && (
          <p className='text-center text-xs leading-relaxed text-muted-foreground'>
            By signing up, you are agreeing to DARE's Terms of Service and
            Privacy Policy.
          </p>
        )}
      </div>
    </div>
  )

  return embedded ? (
    content
  ) : (
    <PublicLayout>
      <main>{content}</main>
    </PublicLayout>
  )
}

export default AuthCard
