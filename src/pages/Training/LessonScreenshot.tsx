import { useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react'
import type { Lesson } from './lessons'
interface LessonScreenshotProps {
  lesson: Lesson
}
const LessonScreenshot = ({ lesson }: LessonScreenshotProps) => {
  const [selected, setSelected] = useState(0)
  const scenes = lesson.scenes ?? [
    {
      image: lesson.image,
      title: lesson.title,
      alt: lesson.alt,
      caption: '',
      wide: false,
    },
  ]
  const scene = scenes[selected] ?? scenes[0]
  return (
    <figure className='training-screenshot min-w-0 overflow-hidden rounded-xl border border-border bg-muted/20 p-3 sm:p-4'>
      <figcaption className='mb-4'>
        <p className='flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
          <span className='h-2 w-2 rounded-full bg-dare' aria-hidden='true' />
          Follow on your screen
        </p>
        {scenes.length > 1 && (
          <nav
            aria-label='Screenshot steps'
            className='mt-3 flex flex-wrap gap-2'
          >
            {scenes.map((item, i) => (
              <button
                key={item.image}
                type='button'
                aria-current={i === selected ? 'step' : undefined}
                onClick={() => setSelected(i)}
                className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${i === selected ? 'border-dare bg-dare-gradient text-dare-foreground' : 'border-border bg-card hover:bg-accent'}`}
              >
                <span className='font-semibold'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.title}
              </button>
            ))}
          </nav>
        )}
      </figcaption>
      <div
        className={`min-h-32 rounded-lg border border-border bg-white p-2 sm:p-3 ${scene.wide ? 'overflow-x-auto' : 'flex items-center justify-center'}`}
      >
        <a
          className={`relative ${scene.wide ? 'inline-block max-w-none' : 'block max-w-full'}`}
          href={`/training-assets/${scene.image}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Open full screenshot: ${scene.title}`}
        >
          <img
            src={`/training-assets/${scene.image}`}
            alt={scene.alt}
            className={`block h-auto rounded-md ${scene.wide ? 'w-[40rem] max-w-none' : 'max-h-[30rem] w-auto max-w-full'}`}
            loading='lazy'
          />
          {scene.markers?.map((marker) => (
            <span
              key={marker.label}
              aria-hidden='true'
              className='training-image-pin pointer-events-none absolute flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-dare text-xs font-bold text-dare-foreground shadow-md'
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            >
              {marker.label}
            </span>
          ))}
        </a>
      </div>
      {scene.wide && (
        <p className='mt-2 text-xs text-muted-foreground'>
          Swipe or scroll the image sideways to see the whole toolbar, or open
          the full screenshot.
        </p>
      )}
      {scene.caption && (
        <p className='mt-3 text-sm leading-relaxed'>{scene.caption}</p>
      )}
      {scenes.length > 1 && (
        <div className='mt-3 flex items-center justify-between gap-2 border-t border-border pt-3'>
          <button
            type='button'
            disabled={selected === 0}
            onClick={() => setSelected(selected - 1)}
            className='inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm disabled:opacity-40'
          >
            <ArrowLeft className='h-4 w-4' aria-hidden='true' /> Previous image
          </button>
          <span className='text-xs text-muted-foreground'>
            {selected + 1} / {scenes.length}
          </span>
          <button
            type='button'
            disabled={selected === scenes.length - 1}
            onClick={() => setSelected(selected + 1)}
            className='inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm disabled:opacity-40'
          >
            Next image <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>
      )}
      <p className='mt-3 text-xs leading-relaxed text-muted-foreground'>
        Light appearance shown. Your model list, layout and balance can differ.{' '}
        <a
          className='inline-flex min-h-8 items-center gap-1 font-medium text-primary underline'
          href={`/training-assets/${scene.image}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Maximize2 className='h-3 w-3' aria-hidden='true' /> Open full
          screenshot
        </a>
      </p>
      {scenes.length === 1 && (
        <ul className='mt-3 space-y-2 border-t border-border pt-3 text-sm leading-relaxed'>
          {lesson.callouts.map((text, i) => (
            <li key={text}>
              <strong className='training-callout mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs'>
                {i + 1}
              </strong>
              {text}
            </li>
          ))}
        </ul>
      )}
    </figure>
  )
}
export default LessonScreenshot
