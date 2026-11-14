import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Lesson } from './lessons'
interface LessonPracticeProps {
  lesson: Lesson
}
const LessonPractice = ({ lesson }: LessonPracticeProps) => {
  const [copyNotice, setCopyNotice] = useState('')
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyNotice('Question copied. Paste it into your GT-DARE conversation.')
    } catch {
      setCopyNotice(
        'Copy is unavailable here. Select the question text and copy it manually.'
      )
    }
  }
  return (
    <>
      {lesson.prompts && (
        <section aria-label='Practice questions' className='mt-6 space-y-4'>
          {lesson.prompts.map(([title, text, result]) => (
            <div
              key={title}
              className='training-practice rounded-xl border border-border bg-muted/20 p-4 sm:p-5'
            >
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <h3 className='font-semibold'>{title}</h3>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => copy(text)}
                >
                  <Copy className='mr-2 h-4 w-4' aria-hidden='true' />
                  Copy question
                </Button>
              </div>
              <blockquote className='my-4 border-l-2 border-primary pl-4 leading-relaxed select-text'>
                {text}
              </blockquote>
              <details>
                <summary className='min-h-11 cursor-pointer py-3 text-sm font-medium'>
                  Check the expected result
                </summary>
                <p className='pb-2 leading-relaxed'>{result}</p>
              </details>
            </div>
          ))}
        </section>
      )}
      <p role='status' className='mt-2 text-sm text-muted-foreground'>
        {copyNotice}
      </p>
    </>
  )
}
export default LessonPractice
