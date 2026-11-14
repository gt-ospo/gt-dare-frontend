import type { ReactNode } from 'react'
import { ArrowUpRight, BookOpen, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PublicLayout from './PublicLayout'
import ResearchSpotlight from './ResearchSpotlight'
import PortalResources from './PortalResources'

interface GTLoginLayoutProps {
  children: ReactNode
}

const GTLoginLayout = ({ children }: GTLoginLayoutProps) => (
  <PublicLayout showResourcesLink>
    <main className='mx-auto max-w-[1440px] space-y-7 px-5 pb-8 sm:px-8 lg:px-10'>
      <div className='grid overflow-hidden rounded-3xl border border-border bg-card shadow-lg md:grid-cols-[1fr_1.1fr]'>
        <section
          id='sign-in'
          aria-labelledby='welcome-heading'
          className='scroll-mt-6 px-6 py-7 sm:px-8 lg:px-12 lg:py-8'
        >
          <div className='mx-auto max-w-md'>
            <p className='mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
              <span
                className='h-1.5 w-1.5 rounded-full bg-dare'
                aria-hidden='true'
              />
              Your GT-DARE workspace
            </p>
            <h1
              id='welcome-heading'
              className='text-3xl leading-tight font-semibold tracking-tight xl:text-4xl'
            >
              Good ideas
              <br />
              start with a question.
            </h1>
            <p className='mt-3 mb-5 text-base leading-relaxed text-muted-foreground'>
              Sign in to explore AI conversations, work with documents and
              continue your research.
            </p>
            {children}
            <Link
              to='/training'
              className='mt-5 flex min-h-16 items-center gap-3 rounded-xl border border-dare/25 bg-dare/5 p-4 transition-colors hover:bg-dare/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dare-gradient text-dare-foreground'>
                <BookOpen className='h-5 w-5' aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1'>
                <span className='block text-sm font-semibold text-foreground'>
                  New to GT-DARE? Start here
                </span>
                <span className='mt-1 block text-sm leading-relaxed text-muted-foreground'>
                  Follow signup, verification and your first conversation.
                </span>
              </span>
              <ArrowRight
                className='h-4 w-4 shrink-0 text-dare'
                aria-hidden='true'
              />
            </Link>
            <div className='mt-6 border-t border-border pt-5'>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                No invitation yet? Register without a code and wait for
                administrator approval, or request an invitation first. Both
                paths require email verification.
              </p>
              <Link
                to='/request-access'
                className='mt-3 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-dare underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
              >
                Request an invitation{' '}
                <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
              </Link>
            </div>
          </div>
        </section>

        <ResearchSpotlight />
      </div>

      <PortalResources />
    </main>
  </PublicLayout>
)

export default GTLoginLayout
