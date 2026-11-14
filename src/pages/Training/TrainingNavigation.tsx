import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { lessons } from './lessons'
interface TrainingNavigationProps {
  index: number
  completed: string[]
  onGo: (index: number) => void
  onReset: () => void
}
const TrainingNavigation = ({
  index,
  completed,
  onGo,
  onReset,
}: TrainingNavigationProps) => {
  const [resetConfirm, setResetConfirm] = useState(false)
  return (
    <nav
      aria-label='Training lessons'
      className='training-navigation rounded-2xl border border-border bg-card p-3 lg:sticky lg:top-6 print:hidden'
    >
      <details
        key={index}
        className='rounded-xl border border-border p-3 lg:hidden'
      >
        <summary className='min-h-11 cursor-pointer py-3 text-sm font-semibold'>
          Lesson {index + 1} of {lessons.length} · Choose a lesson
        </summary>
        <div className='space-y-1'>
          {lessons.map((item, i) => (
            <button
              type='button'
              key={item.id}
              onClick={() => onGo(i)}
              aria-current={index === i ? 'step' : undefined}
              className='flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-accent'
            >
              <span>
                {completed.includes(item.id)
                  ? '✓'
                  : String(i + 1).padStart(2, '0')}
              </span>
              {item.title}
            </button>
          ))}
        </div>
      </details>
      <p className='mb-3 hidden px-3 pt-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase lg:block'>
        Your learning path
      </p>
      <ol className='hidden space-y-1 lg:block'>
        {lessons.map((item, i) => (
          <li key={item.id}>
            <button
              type='button'
              onClick={() => onGo(i)}
              aria-current={index === i ? 'step' : undefined}
              className={`flex min-h-14 w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-sm ${index === i ? 'training-nav-current bg-dare-gradient font-semibold' : 'hover:bg-accent'}`}
            >
              <span className='training-step-number mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs tabular-nums'>
                {completed.includes(item.id) ? (
                  <Check aria-label='Complete' className='h-4 w-4' />
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </span>
              <span>
                {item.title}
                <span
                  className={`mt-1 block text-xs font-normal ${index === i ? 'training-hero-copy' : 'text-muted-foreground'}`}
                >
                  {item.time}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className='mt-5 text-xs leading-relaxed text-muted-foreground'>
        You can start before signup. The practice lessons need a verified,
        approved account and an available model with enough allowance. No
        instructor is needed, but account approval still belongs to reviewers.
      </p>
      <Button
        type='button'
        variant='ghost'
        className='mt-3'
        onClick={() => setResetConfirm(true)}
      >
        <RotateCcw className='mr-2 h-4 w-4' aria-hidden='true' />
        Reset checklist
      </Button>
      {resetConfirm && (
        <div className='mt-2 space-y-2 text-sm'>
          <p>
            Clear this browser’s training progress? Your DARE account and data
            are unaffected.
          </p>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              onReset()
              setResetConfirm(false)
            }}
          >
            Clear training progress
          </Button>
          <Button
            type='button'
            variant='ghost'
            onClick={() => setResetConfirm(false)}
          >
            Keep progress
          </Button>
        </div>
      )}
    </nav>
  )
}
export default TrainingNavigation
