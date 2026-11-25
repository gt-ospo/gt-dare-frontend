import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

interface AuthFormFooterProps {
  text: string
  route?: string
  routeText: string
  onClick?: () => void
}

const AuthFormFooter: React.FC<AuthFormFooterProps> = ({
  text,
  route,
  routeText,
  onClick,
}) => {
  return (
    <p className='mt-1 text-center text-sm text-muted-foreground'>
      {text}{' '}
      {route ? (
        <Link
          to={route}
          className='font-body inline-flex min-h-11 items-center rounded-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
        >
          {routeText}
        </Link>
      ) : (
        <Button onClick={onClick} className='font-body min-h-11 font-bold'>
          {routeText}
        </Button>
      )}
    </p>
  )
}

export default AuthFormFooter
