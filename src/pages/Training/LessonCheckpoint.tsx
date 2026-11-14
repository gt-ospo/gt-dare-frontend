import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { lessons } from './lessons'
import type { Lesson } from './lessons'
interface LessonCheckpointProps {
  lesson: Lesson
  index: number
  answer: number | undefined
  checked: boolean
  onAnswer: (answer: number) => void
  onCheck: (checked: boolean) => void
  onPrevious: () => void
  onComplete: () => void
}
const LessonCheckpoint = ({
  lesson,
  index,
  answer,
  checked,
  onAnswer,
  onCheck,
  onPrevious,
  onComplete,
}: LessonCheckpointProps) => {
  const quizPassed = !lesson.quiz || answer === lesson.quiz.answer
  return (
    <>
      {lesson.quiz && (
        <fieldset className='mt-6 rounded-xl border border-dare/25 bg-dare/5 p-5'>
          <legend className='px-2 font-semibold text-dare'>Quick check</legend>
          <p className='mb-3'>{lesson.quiz.question}</p>
          {lesson.quiz.options.map((option, i) => (
            <label
              key={option}
              className='flex min-h-12 cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-accent'
            >
              <input
                type='radio'
                name={lesson.id}
                checked={answer === i}
                onChange={() => onAnswer(i)}
                className='h-4 w-4 accent-primary'
              />
              <span>{option}</span>
            </label>
          ))}
          {answer !== undefined && (
            <p
              role='status'
              className={`mt-3 text-sm ${quizPassed ? 'text-primary' : 'text-destructive'}`}
            >
              {quizPassed ? 'Correct. ' : 'Try again. '}
              {lesson.quiz.feedback}
            </p>
          )}
        </fieldset>
      )}
      <div className='training-checkpoint mt-6 rounded-xl border border-border bg-muted/20 p-5'>
        <label className='flex min-h-11 cursor-pointer items-start gap-3'>
          <input
            type='checkbox'
            checked={checked}
            onChange={(event) => onCheck(event.target.checked)}
            className='mt-1 h-4 w-4 shrink-0 accent-primary'
          />
          <span className='leading-relaxed'>{lesson.check}</span>
        </label>
        <p className='mt-2 text-xs text-muted-foreground'>
          Confirm the task in GT-DARE, then complete this lesson. This course
          does not inspect or change your account.
        </p>
        <div className='mt-4 flex flex-wrap justify-between gap-3'>
          <Button
            type='button'
            variant='outline'
            disabled={index === 0}
            onClick={onPrevious}
          >
            <ArrowLeft className='mr-2 h-4 w-4' aria-hidden='true' />
            Previous
          </Button>
          <Button
            type='button'
            disabled={!checked || !quizPassed}
            className='bg-dare-gradient text-dare-foreground hover:opacity-90'
            onClick={onComplete}
          >
            {index === lessons.length - 1
              ? 'Finish checklist'
              : 'Complete and continue'}
            <ArrowRight className='ml-2 h-4 w-4' aria-hidden='true' />
          </Button>
        </div>
        {!quizPassed && (
          <p className='mt-3 text-sm text-muted-foreground'>
            Answer the quick check correctly before completing this lesson.
          </p>
        )}
      </div>
    </>
  )
}
export default LessonCheckpoint
