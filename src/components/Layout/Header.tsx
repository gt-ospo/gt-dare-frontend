import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { userLogout } from '../../redux/asyncThunks/user'
import { Sun, Moon } from 'lucide-react'
import { toggleMode } from '../../redux/themeSlice'
import NotificationPopover from './NotificationPopover'
import { Avatar } from './Avatar'
import { WalletPopover } from '@/components/wallet/WalletPopover'
import CoBrandLockup from '@/components/Auth/CoBrandLockup'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user)

  // Wallet state is fetched once by <WalletPopover /> on mount.

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className='flex w-full shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border bg-background px-4 py-3 sm:px-5 print:hidden'>
      <Link
        to='/dashboard'
        aria-label='GT OSPO and DARE dashboard'
        className='max-w-full min-w-0 rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
      >
        <CoBrandLockup compact />
      </Link>

      <div className='ml-auto flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-3'>
        <WalletPopover />

        <NotificationPopover />

        <Button
          variant='ghost'
          size='icon'
          onClick={() => dispatch(toggleMode())}
        >
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              aria-label='Account menu'
              className='flex min-h-11 min-w-11 items-center gap-x-2 p-0'
            >
              <Avatar user={user} size='md' />
              <div className='hidden max-w-44 flex-col items-start normal-case xl:flex'>
                <span className='w-full truncate text-sm font-medium text-foreground'>
                  {user?.name || 'John Doe'}
                </span>
                <span className='w-full truncate text-xs text-muted-foreground'>
                  {user?.email || 'Loading...'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            className='w-[200px] border border-border bg-popover p-1'
          >
            <DropdownMenuItem
              onClick={() => navigate('/profile')}
              className='cursor-pointer py-3 hover:bg-accent hover:text-accent-foreground'
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate('/billing')}
              className='cursor-pointer py-3 hover:bg-accent hover:text-accent-foreground'
            >
              Cost Tracking
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className='cursor-pointer py-3 text-destructive hover:bg-accent'
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
