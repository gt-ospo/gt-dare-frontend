import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const headingId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

interface GuideArticleProps {
  markdown: string
  backTo: string
  backLabel: string
  inWorkspace?: boolean
}

const GuideArticle = ({
  markdown,
  backTo,
  backLabel,
  inWorkspace = false,
}: GuideArticleProps) => {
  const sections = Array.from(
    markdown.matchAll(/^## (.+)$/gm),
    (match) => match[1]
  )
  const contentRef = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else if (inWorkspace) {
      contentRef.current?.closest('main')?.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash, inWorkspace, markdown])

  const contents = (
    <ul className='space-y-1 text-sm lg:space-y-3'>
      {sections.map((section) => (
        <li key={section}>
          <a
            href={`#${headingId(section)}`}
            className='inline-flex min-h-11 items-center rounded-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:min-h-0'
          >
            {section}
          </a>
        </li>
      ))}
    </ul>
  )

  const content = (
    <div
      ref={contentRef}
      className={
        inWorkspace
          ? 'px-4 py-5 text-foreground sm:px-6 sm:py-6 lg:px-8 lg:py-8'
          : 'mx-auto max-w-6xl px-5 py-10 text-foreground sm:px-8'
      }
    >
      <nav
        aria-label='Guide navigation'
        className='mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden'
      >
        <Link
          to={backTo}
          className='rounded-sm font-semibold text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
        >
          {backLabel}
        </Link>
        <Button variant='outline' onClick={() => window.print()}>
          Print or save as PDF
        </Button>
      </nav>
      <div
        className={
          sections.length
            ? 'grid items-start gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] print:block'
            : 'print:block'
        }
      >
        {sections.length > 0 && (
          <nav
            aria-label='On this page'
            className='rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6 print:hidden'
          >
            <details className='group lg:hidden'>
              <summary className='flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'>
                On this page
                <ChevronDown
                  className='h-4 w-4 group-open:rotate-180'
                  aria-hidden='true'
                />
              </summary>
              {contents}
            </details>
            <div className='hidden lg:block'>
              <p className='mb-3 font-semibold'>On this page</p>
              {contents}
            </div>
          </nav>
        )}
        <article
          className={`prose ${inWorkspace ? 'max-w-[90ch] prose-h1:mb-8 prose-h1:border-b prose-h1:border-border prose-h1:pb-6 prose-h3:mt-8 prose-h3:border-l-2 prose-h3:border-dare prose-h3:pl-4 prose-p:max-w-[90ch] prose-ol:max-w-[90ch] prose-ul:max-w-[90ch] prose-table:my-4' : 'max-w-[75ch]'} min-w-0 [overflow-wrap:anywhere] break-words text-foreground prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-2xl prose-h1:leading-tight prose-h1:font-semibold sm:prose-h1:text-4xl prose-h2:text-2xl prose-h2:leading-snug prose-h3:text-xl prose-p:leading-relaxed prose-p:text-foreground prose-a:text-primary prose-blockquote:rounded-r-xl prose-blockquote:border-dare prose-blockquote:bg-dare/5 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:text-foreground prose-blockquote:not-italic prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground prose-li:marker:text-muted-foreground prose-th:bg-muted prose-th:p-3 prose-th:text-foreground prose-td:px-3 prose-td:py-3 prose-td:text-foreground`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) =>
                href?.startsWith('/') && !href.startsWith('//') ? (
                  <Link to={href}>{children}</Link>
                ) : (
                  <a href={href}>{children}</a>
                ),
              h2: ({ children }) => (
                <h2 id={headingId(String(children))} className='scroll-mt-6'>
                  {children}
                </h2>
              ),
              table: ({ children }) => (
                <div className='my-5 overflow-x-auto rounded-xl border border-border [&_table]:my-0'>
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )

  return content
}

export default GuideArticle
