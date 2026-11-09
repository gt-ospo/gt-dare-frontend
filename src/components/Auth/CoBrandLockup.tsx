import { Logo } from '@/components/Logo'

interface CoBrandLockupProps {
  compact?: boolean
}

const CoBrandLockup = ({ compact = false }: CoBrandLockupProps) => (
  <div
    className={
      compact
        ? 'flex flex-wrap items-center gap-x-4 gap-y-2'
        : 'flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6'
    }
  >
    <div className='max-w-full'>
      <img
        src='/brand/gt-ospo-navy-bold.png'
        alt='Georgia Tech Open Source Program Office'
        width='2172'
        height='724'
        className={
          compact
            ? 'h-9 w-36 max-w-full object-cover dark:brightness-0 dark:invert'
            : 'h-14 w-52 max-w-full object-cover dark:brightness-0 dark:invert'
        }
      />
    </div>
    <div
      className={
        compact
          ? 'border-l border-border pl-4'
          : 'border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6'
      }
    >
      <Logo size={compact ? 'md' : 'lg'} showTagline />
    </div>
  </div>
)

export default CoBrandLockup
