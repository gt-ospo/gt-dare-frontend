import type { ReactNode } from 'react'
import { BookOpen, Moon, Network, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import CoBrandLockup from './CoBrandLockup'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/redux/hooks'
import { toggleMode } from '@/redux/themeSlice'

interface PublicLayoutProps {
  children: ReactNode
  showResourcesLink?: boolean
  wide?: boolean
}

const PublicLayout = ({
  children,
  showResourcesLink = false,
  wide = false,
}: PublicLayoutProps) => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <a
        href='#page-content'
        className='sr-only z-50 rounded-md bg-card px-4 py-3 text-foreground shadow-lg focus:not-sr-only focus:fixed focus:top-4 focus:left-4'
      >
        Skip to content
      </a>
      <header
        className={`mx-auto flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10 print:hidden ${wide ? 'max-w-[1760px] xl:w-[96%]' : 'max-w-[1440px]'}`}
      >
        <Link
          to='/'
          aria-label='GT OSPO and DARE home'
          className='max-w-full rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
        >
          <CoBrandLockup />
        </Link>
        <nav
          aria-label='Public navigation'
          className='flex items-center gap-4 sm:gap-6'
        >
          <Link
            to='/training'
            aria-current={pathname === '/training' ? 'page' : undefined}
            className='inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            Start here
          </Link>
          <Link
            to='/access-help'
            aria-current={
              pathname === '/access-help' || pathname === '/user-guide'
                ? 'page'
                : undefined
            }
            className='inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            <BookOpen className='h-4 w-4' aria-hidden='true' />
            Access help
          </Link>
          {showResourcesLink && (
            <a
              href='#documentation'
              className='inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
            >
              Resources
            </a>
          )}
          <Button
            type='button'
            variant='outline'
            size='icon'
            className='relative h-11 w-11'
            onClick={() => dispatch(toggleMode())}
            aria-label='Toggle theme'
          >
            <Sun
              className='h-4 w-4 scale-100 rotate-0 transition-transform motion-reduce:transition-none dark:scale-0 dark:-rotate-90'
              aria-hidden='true'
            />
            <Moon
              className='absolute h-4 w-4 scale-0 rotate-90 transition-transform motion-reduce:transition-none dark:scale-100 dark:rotate-0'
              aria-hidden='true'
            />
          </Button>
        </nav>
      </header>
      <div
        id='page-content'
        tabIndex={-1}
        className='w-full flex-1 outline-none'
      >
        {children}
      </div>
      <footer
        className={`mx-auto mt-8 flex w-full flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-5 text-xs text-muted-foreground sm:px-8 print:hidden ${wide ? 'max-w-[1760px] xl:w-[96%]' : 'max-w-[1440px]'}`}
      >
        <div className='w-full space-y-3 border-b border-border pb-4'>
          <a
            href='https://dare.cmu.edu/'
            className='inline-flex items-center gap-2 rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            <img
              src='/icons/Logo.png'
              alt=''
              aria-hidden='true'
              className='h-8 w-auto'
            />
            Powered by DARE
          </a>
          <p className='max-w-xl text-xs leading-relaxed'>
            An Open Forum for AI (OFAI) initiative, Carnegie Mellon University
            Libraries.
          </p>
        </div>
        <p className='flex items-center gap-2'>
          <Network className='h-4 w-4 shrink-0' aria-hidden='true' />
          Off campus? Connect to the Georgia Tech VPN.
        </p>
        <a
          href='mailto:gt-ospo@gatech.edu'
          className='inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
        >
          Questions? Contact GT-OSPO <span aria-hidden='true'>↗</span>
        </a>
      </footer>
    </div>
  )
}

export default PublicLayout
