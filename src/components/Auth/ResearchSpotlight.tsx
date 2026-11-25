import { useEffect, useState } from 'react'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ResearchGraphic from './ResearchGraphic'

const topics = [
  {
    id: 'research',
    label: 'Research',
    focus: 'converse',
    eyebrow: 'Follow your next question',
    title: 'Ideas take shape in conversation.',
    description:
      'Explore a question from different angles. Start an AI conversation, choose an available model and refine your thinking as you go.',
    href: '/register',
    action: 'Create your account',
  },
  {
    id: 'learning',
    label: 'Learning',
    focus: 'explore',
    eyebrow: 'Bring your own context',
    title: 'From reading to understanding.',
    description:
      'Bring documents into your workspace. Learn how to upload sources, check processing and use them to give a conversation more context.',
    href: '/access-help#choose-how-to-sign-up',
    action: 'How to get access',
  },
  {
    id: 'discovery',
    label: 'Discovery',
    focus: 'connect',
    eyebrow: 'Build on what you discover',
    title: 'Connect ideas. Take them further.',
    description:
      'Move from a useful conversation to reusable prompts, agents and workflows. Discover the building blocks available in your DARE workspace.',
    href: '/request-access',
    action: 'Request an invitation',
  },
] as const

const ResearchSpotlight = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'previous'>('next')
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  const isRotating = !isPaused && !isHovered && !hasFocus && !reducedMotion

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(media.matches)
    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (!isRotating) return
    const timer = window.setInterval(() => {
      setDirection('next')
      setActiveIndex((index) => (index + 1) % topics.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [isRotating])

  const changeSlide = (nextIndex: number) => {
    setDirection(nextIndex >= activeIndex ? 'next' : 'previous')
    setActiveIndex(nextIndex)
  }

  return (
    <section
      aria-label='Explore your DARE workspace'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHasFocus(false)
      }}
      className='relative m-2 overflow-hidden rounded-2xl bg-dare-gradient text-dare-foreground md:ml-0'
    >
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -top-20 -right-10 h-72 w-72 rounded-full bg-dare-foreground/10 blur-3xl'
      />
      <svg
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 h-full w-full text-dare-foreground/10'
      >
        <defs>
          <pattern
            id='gt-research-grid'
            width='48'
            height='48'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M 48 0 H 0 V 48'
              fill='none'
              stroke='currentColor'
              strokeWidth='.5'
            />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#gt-research-grid)' />
      </svg>
      <Tabs
        value={topics[activeIndex].id}
        onValueChange={(value) => {
          const nextIndex = topics.findIndex((topic) => topic.id === value)
          if (nextIndex !== -1) changeSlide(nextIndex)
        }}
        className='relative flex h-full flex-col p-5 md:p-6 lg:p-9'
      >
        <p className='mb-4 text-xs font-medium tracking-widest text-dare-foreground/80 uppercase'>
          Research · Learning · Discovery
        </p>
        <figure className='relative -mx-6 hidden flex-1 items-center py-2 md:flex lg:-mx-9'>
          <div className='mx-auto h-64 w-full lg:h-72'>
            <ResearchGraphic focus={topics[activeIndex].focus} />
          </div>
          <figcaption className='sr-only'>
            An illustration of interconnected ideas.
          </figcaption>
        </figure>
        <div aria-live={isRotating ? 'off' : 'polite'} aria-atomic='true'>
          {topics.map(({ id, eyebrow, title, description, href, action }) => (
            <TabsContent
              key={id}
              value={id}
              className={`mt-0 animate-in duration-500 ease-out fade-in-0 focus-visible:ring-dare-foreground focus-visible:ring-offset-0 data-[state=inactive]:hidden motion-reduce:animate-none ${direction === 'next' ? 'slide-in-from-right-4' : 'slide-in-from-left-4'}`}
            >
              <div className='pt-4 md:min-h-64 md:pt-0'>
                <p className='mb-3 text-xs tracking-widest text-dare-foreground/75 uppercase'>
                  {eyebrow}
                </p>
                <h2 className='max-w-md text-2xl leading-tight font-semibold tracking-tight md:text-3xl xl:text-4xl'>
                  {title}
                </h2>
                <p className='mt-3 max-w-md text-base leading-relaxed text-dare-foreground/85'>
                  {description}
                </p>
                <Link
                  to={href}
                  className='mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm border-b border-dare-foreground/50 text-sm font-medium focus-visible:ring-2 focus-visible:ring-dare-foreground focus-visible:outline-none'
                >
                  {action}
                  <ArrowUpRight
                    className='h-4 w-4 shrink-0'
                    aria-hidden='true'
                  />
                </Link>
              </div>
            </TabsContent>
          ))}
        </div>
        <div className='mt-5 flex items-center justify-between gap-2 border-t border-dare-foreground/20 pt-3'>
          <p className='text-xs font-medium tracking-wide text-dare-foreground/85'>
            {String(activeIndex + 1).padStart(2, '0')} / 03
          </p>
          <TabsList
            aria-label='Explore DARE by interest'
            className='h-11 gap-0 rounded-full bg-transparent p-0'
          >
            {topics.map(({ id, label }) => (
              <TabsTrigger
                key={id}
                value={id}
                aria-label={label}
                title={label}
                className='group h-11 w-11 rounded-full bg-transparent p-0 focus-visible:ring-dare-foreground focus-visible:ring-offset-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
              >
                <span
                  aria-hidden='true'
                  className='h-1.5 w-3 rounded-full bg-dare-foreground/35 transition-[width,background-color] duration-300 group-data-[state=active]:w-7 group-data-[state=active]:bg-dare-foreground motion-reduce:transition-none'
                />
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            aria-label={
              reducedMotion
                ? 'Automatic slides disabled for reduced motion'
                : isPaused
                  ? 'Play interest slideshow'
                  : 'Pause interest slideshow'
            }
            disabled={reducedMotion}
            onClick={() => setIsPaused((paused) => !paused)}
            className='h-11 w-11 rounded-full text-dare-foreground hover:bg-dare-foreground/15 hover:text-dare-foreground focus-visible:ring-dare-foreground disabled:opacity-40'
          >
            {isPaused || reducedMotion ? (
              <Play className='h-4 w-4' aria-hidden='true' />
            ) : (
              <Pause className='h-4 w-4' aria-hidden='true' />
            )}
          </Button>
        </div>
      </Tabs>
    </section>
  )
}

export default ResearchSpotlight
