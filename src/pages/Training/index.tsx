import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Download, ExternalLink, BookOpen } from 'lucide-react'
import PublicLayout from '@/components/Auth/PublicLayout'
import { lessons } from './lessons'
import TrainingNavigation from './TrainingNavigation'
import LessonScreenshot from './LessonScreenshot'
import InstructionText from './InstructionText'
import LessonPractice from './LessonPractice'
import LessonCheckpoint from './LessonCheckpoint'
import { emptyProgress, parseProgress, TRAINING_STORAGE_KEY } from './progress'
import type { TrainingProgress } from './progress'
import './training.css'

interface TrainingProps {
  inWorkspace?: boolean
}
const Training = ({ inWorkspace = false }: TrainingProps) => {
  const [params, setParams] = useSearchParams()
  const heading = useRef<HTMLHeadingElement>(null)
  const [progress, setProgress] = useState<TrainingProgress>(() => {
    try {
      return parseProgress(localStorage.getItem(TRAINING_STORAGE_KEY))
    } catch {
      return emptyProgress()
    }
  })
  const requestedIndex = lessons.findIndex(
    (item) => item.id === params.get('lesson')
  )
  const firstIncomplete = lessons.findIndex(
    (item) => !progress.completed.includes(item.id)
  )
  const index =
    requestedIndex >= 0 ? requestedIndex : Math.max(0, firstIncomplete)
  const lesson = lessons[index]
  const [storageNotice, setStorageNotice] = useState('')
  const [acknowledged, setAcknowledged] = useState<string[]>([])
  const answer = progress.answers[lesson.id]
  const quizPassed = !lesson.quiz || answer === lesson.quiz.answer
  const complete = progress.completed.includes(lesson.id)
  const checked = acknowledged.includes(lesson.id) || complete
  const finished = progress.completed.length === lessons.length

  useEffect(() => {
    try {
      localStorage.setItem(
        TRAINING_STORAGE_KEY,
        JSON.stringify({ version: 1, ...progress })
      )
    } catch {
      setStorageNotice(
        'This browser cannot save progress. You can still use the course, but your checklist will reset when you leave.'
      )
    }
  }, [progress])
  useEffect(() => {
    heading.current?.focus()
  }, [lesson.id])

  const go = (next: number) => {
    setParams({ lesson: lessons[next].id })
  }
  const markComplete = () => {
    if (!checked || !quizPassed) return
    setProgress((value) => ({
      ...value,
      completed: [...new Set([...value.completed, lesson.id])],
    }))
    if (index < lessons.length - 1) go(index + 1)
  }
  const content = (
    <main className='training-course mx-auto w-full max-w-[1760px] px-4 py-5 sm:px-8 lg:py-6 xl:w-[96%]'>
      <header className='training-hero mb-6 overflow-hidden rounded-2xl bg-dare-gradient p-5 sm:p-6'>
        <p className='training-hero-kicker mb-3 text-xs font-semibold tracking-widest uppercase'>
          GT-DARE / Start here
        </p>
        <div className='flex flex-wrap items-end justify-between gap-5'>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-4xl'>
              Learn at your own pace
            </h1>
            <p className='training-hero-copy mt-4 hidden max-w-3xl leading-relaxed sm:block'>
              From your first sign-in to an answer you can check against a
              document. Follow eight short lessons in order, or resume where you
              stopped. Allow 30–45 minutes of active work; account review can
              take longer.
            </p>
            <p className='training-hero-copy mt-3 text-sm leading-relaxed sm:hidden'>
              Eight lessons from signup to your first document-based
              conversation. About 30–45 minutes, plus account review.
            </p>
          </div>
          <a
            href='/login'
            target='_blank'
            rel='noopener noreferrer'
            className='training-hero-link inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold'
          >
            Open GT-DARE <ExternalLink className='h-4 w-4' aria-hidden='true' />
          </a>
        </div>
        <div className='training-progress mt-6 flex flex-wrap items-center gap-3 rounded-xl p-4 text-sm'>
          <progress
            aria-label='Training completion'
            max={lessons.length}
            value={progress.completed.length}
            className='training-progress-bar h-2 w-24 sm:w-40'
          />
          <span>
            {progress.completed.length} of {lessons.length} lessons complete
          </span>
          <span className='training-hero-copy hidden text-xs sm:inline'>
            Saved on this browser only · no account details collected
          </span>
        </div>
        <nav
          aria-label='Course stages'
          className='mt-4 grid grid-cols-3 gap-2 sm:mt-5'
        >
          {[
            ['Get access', 'Lessons 1–4', 0],
            ['Try it yourself', 'Lessons 5–7', 4],
            ['Keep going', 'Lesson 8', 7],
          ].map(([title, label, target]) => (
            <button
              key={title}
              type='button'
              onClick={() => go(Number(target))}
              className='training-phase flex min-h-12 flex-wrap items-center justify-center gap-1 rounded-lg px-2 py-2 text-center text-xs sm:justify-between sm:gap-3 sm:px-3 sm:text-left sm:text-sm'
            >
              <span className='font-semibold'>{title}</span>
              <span className='training-hero-copy hidden text-xs sm:inline'>
                {label}
              </span>
            </button>
          ))}
        </nav>
        {storageNotice && (
          <p role='status' className='mt-3 text-sm text-destructive'>
            {storageNotice}
          </p>
        )}
      </header>
      {finished && (
        <section
          aria-label='Training completed'
          className='mb-6 rounded-xl border border-border bg-primary/5 p-5'
        >
          <h2 className='text-xl font-semibold'>
            Your starter checklist is complete
          </h2>
          <p className='mt-2'>
            You have confirmed the tasks and answered the knowledge checks. This
            records your own progress; it does not verify activity in your
            account or issue a certificate. Choose a manual topic below for your
            next task.
          </p>
        </section>
      )}
      <div className='grid items-start gap-5 lg:grid-cols-[14rem_minmax(0,1fr)] xl:gap-6'>
        <TrainingNavigation
          index={index}
          completed={progress.completed}
          onGo={go}
          onReset={() => {
            setProgress(emptyProgress())
            setAcknowledged([])
          }}
        />
        <article
          className='training-article min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6'
          aria-labelledby='lesson-title'
        >
          <p className='mb-3 inline-flex rounded-full bg-dare/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-dare uppercase'>
            Lesson {index + 1} / {lessons.length} · {lesson.time}
          </p>
          <h2
            id='lesson-title'
            ref={heading}
            tabIndex={-1}
            className='text-2xl font-semibold tracking-tight outline-none sm:text-3xl'
          >
            {lesson.title}
          </h2>
          <p className='mt-3 max-w-[80ch] leading-relaxed text-muted-foreground'>
            {lesson.intro}
          </p>
          <div className='mt-6 grid items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(24rem,1.1fr)]'>
            <div className='min-w-0'>
              {lesson.paths && (
                <fieldset className='mb-6 space-y-2'>
                  <legend className='mb-2 font-semibold'>
                    Read the path that matches you
                  </legend>
                  {lesson.paths.map(([title, text]) => (
                    <details
                      key={title}
                      className='rounded-lg border border-border p-3'
                    >
                      <summary className='min-h-11 cursor-pointer py-2 font-medium'>
                        {title}
                      </summary>
                      <p className='mt-2 leading-relaxed'>
                        <InstructionText text={text} />
                      </p>
                    </details>
                  ))}
                </fieldset>
              )}
              <ol className='list-decimal space-y-4 pl-5 leading-relaxed'>
                {lesson.steps.map((step) => (
                  <li
                    key={step}
                    className='pl-1 marker:font-semibold marker:text-dare'
                  >
                    {lesson.download &&
                    step.includes('workshop-note.txt') &&
                    step.startsWith('Download ') ? (
                      <>
                        Download{' '}
                        <a
                          download
                          href='/training-assets/workshop-note.txt'
                          className='font-medium text-primary underline underline-offset-4'
                        >
                          workshop-note.txt
                        </a>
                        . Keep the filename unchanged.
                      </>
                    ) : (
                      <InstructionText text={step} />
                    )}
                  </li>
                ))}
              </ol>
              <a
                href={lesson.action[1]}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-dare-gradient px-4 py-3 text-sm font-semibold text-primary-foreground'
              >
                {lesson.action[0]}{' '}
                <ExternalLink className='h-4 w-4' aria-hidden='true' />
                <span className='sr-only'> in a new tab</span>
              </a>
              {lesson.download && (
                <div className='mt-5 rounded-lg border border-border p-4'>
                  <a
                    download
                    href='/training-assets/workshop-note.txt'
                    className='inline-flex min-h-11 items-center gap-2 font-medium text-primary underline'
                  >
                    <Download className='h-4 w-4' aria-hidden='true' />
                    Download workshop-note.txt
                  </a>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    A plain-text practice file. The date and venue are sample
                    details, not a meeting invitation.
                  </p>
                </div>
              )}
            </div>
            <LessonScreenshot key={lesson.id} lesson={lesson} />
          </div>
          <LessonPractice key={lesson.id} lesson={lesson} />
          <section
            className='mt-6 grid gap-4 sm:grid-cols-2'
            aria-label='Outcome and recovery'
          >
            <div className='border-l-2 border-primary pl-4'>
              <h3 className='font-semibold'>What you should see</h3>
              <p className='mt-2 text-sm leading-relaxed'>{lesson.expect}</p>
            </div>
            <details className='rounded-lg bg-muted/40 px-4'>
              <summary className='min-h-11 cursor-pointer py-3 font-semibold'>
                Not seeing that?
              </summary>
              <p className='pb-4 text-sm leading-relaxed'>
                <InstructionText text={lesson.trouble} />
              </p>
              <Link
                className='mb-4 inline-block text-sm text-primary underline'
                to={
                  index < 4
                    ? '/access-help'
                    : '/help/user-guide/troubleshooting-and-support'
                }
              >
                {index < 4 ? 'Open account help' : 'Open troubleshooting'}
              </Link>
            </details>
          </section>
          <LessonCheckpoint
            lesson={lesson}
            index={index}
            answer={answer}
            checked={checked}
            onAnswer={(value) =>
              setProgress((current) => ({
                ...current,
                answers: { ...current.answers, [lesson.id]: value },
                completed:
                  value === lesson.quiz?.answer
                    ? current.completed
                    : current.completed.filter((id) => id !== lesson.id),
              }))
            }
            onCheck={(value) => {
              setAcknowledged((ids) =>
                value
                  ? [...ids, lesson.id]
                  : ids.filter((id) => id !== lesson.id)
              )
              if (!value)
                setProgress((current) => ({
                  ...current,
                  completed: current.completed.filter((id) => id !== lesson.id),
                }))
            }}
            onPrevious={() => go(index - 1)}
            onComplete={markComplete}
          />
          <section className='mt-8 border-t border-border pt-5'>
            <h3 className='flex items-center gap-2 font-semibold'>
              <BookOpen className='h-4 w-4' aria-hidden='true' />
              Continue with the User Manual
            </h3>
            <div className='mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm text-primary underline'>
              {[
                ['Conversations', 'conversations-and-models'],
                ['Documents', 'sources-and-documents'],
                ['Prompts', 'reusable-prompts'],
                ['Agents', 'agents'],
                ['Workflows', 'workflows'],
                ['Troubleshooting', 'troubleshooting-and-support'],
              ].map(([title, id]) => (
                <Link
                  key={id}
                  to={`/help/user-guide/${id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {title}
                </Link>
              ))}
            </div>
            <p className='mt-4 text-sm text-muted-foreground'>
              Manual topics require sign-in. Questions?{' '}
              <a
                className='text-primary underline'
                href='mailto:gt-ospo@gatech.edu'
              >
                Contact GT-OSPO
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  )
  return inWorkspace ? content : <PublicLayout wide>{content}</PublicLayout>
}
export default Training
