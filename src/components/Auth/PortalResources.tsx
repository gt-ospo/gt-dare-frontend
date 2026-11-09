import { ArrowUpRight, BookOpen, LifeBuoy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Resource {
  title: string
  description: string
  href: string
}

interface ResourceSection {
  id: string
  label: string
  icon: LucideIcon
  resources: Resource[]
}

const sections: ResourceSection[] = [
  {
    id: 'start',
    label: 'Getting access',
    icon: BookOpen,
    resources: [
      {
        title: 'Connect to GT-DARE',
        description: 'The site address, VPN access and connection help.',
        href: '/access-help#connect-to-gt-dare',
      },
      {
        title: 'Your path to GT-DARE',
        description:
          'Invitations, code-free signup and choosing your password.',
        href: '/access-help#choose-how-to-sign-up',
      },
      {
        title: 'Verification & approval',
        description: 'Understand what happens before your account is ready.',
        href: '/access-help#understand-your-account-status',
      },
      {
        title: 'Your first sign-in',
        description: 'Complete onboarding and find your way around.',
        href: '/access-help#complete-onboarding',
      },
    ],
  },
  {
    id: 'help',
    label: 'Account help',
    icon: LifeBuoy,
    resources: [
      {
        title: 'Reset your password',
        description: 'Request a reset link for your registered email.',
        href: '/forgot-password',
      },
      {
        title: 'Resolve a sign-in problem',
        description: 'Missing emails, pending approval and invitation issues.',
        href: '/access-help#resolve-common-problems',
      },
      {
        title: 'Contact GT-OSPO',
        description: 'What to include when you need help from our team.',
        href: '/access-help#contact-gt-ospo',
      },
    ],
  },
]

const PortalResources = () => (
  <section
    id='documentation'
    aria-labelledby='resources-heading'
    className='scroll-mt-6 rounded-3xl border border-border bg-muted/40 p-4 sm:p-6'
  >
    <div className='mb-5 flex flex-wrap items-end justify-between gap-3'>
      <div>
        <p className='text-xs font-medium tracking-widest text-muted-foreground uppercase'>
          Find your next step
        </p>
        <h2
          id='resources-heading'
          className='mt-1 text-2xl font-semibold tracking-tight'
        >
          Need help getting access?
        </h2>
      </div>
      <Link
        to='/access-help'
        className='inline-flex items-center gap-1 rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
      >
        Access and account help{' '}
        <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
      </Link>
    </div>
    <Tabs defaultValue='start'>
      <TabsList
        aria-label='Documentation topics'
        className='grid h-auto w-full grid-cols-2 gap-1 rounded-xl p-1.5 sm:w-fit'
      >
        {sections.map(({ id, label, icon: Icon }) => (
          <TabsTrigger
            key={id}
            value={id}
            className='min-h-11 min-w-0 gap-1.5 rounded-lg px-2 py-2 text-xs whitespace-normal sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm'
          >
            <Icon
              className='hidden h-4 w-4 shrink-0 sm:block'
              aria-hidden='true'
            />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map(({ id, resources }) => (
        <TabsContent key={id} value={id} className='mt-4'>
          <div className='grid gap-3 md:grid-cols-3'>
            {resources.map(({ title, description, href }, index) => {
              const content = (
                <>
                  <div className='mb-4 flex items-center justify-between'>
                    <span
                      className='flex h-8 w-8 items-center justify-center rounded-lg border border-dare/15 bg-dare/5 text-xs font-semibold text-dare'
                      aria-hidden='true'
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight
                      className='h-4 w-4 text-dare transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='flex items-start justify-between gap-3'>
                    <h3 className='text-base leading-snug font-semibold'>
                      {title}
                    </h3>
                  </div>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                    {description}
                  </p>
                </>
              )
              const className =
                'group block h-full rounded-xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] hover:border-dare/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none'
              return (
                <Link key={href} to={href} className={className}>
                  {content}
                </Link>
              )
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </section>
)

export default PortalResources
