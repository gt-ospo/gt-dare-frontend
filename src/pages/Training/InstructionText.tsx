import { Fragment } from 'react'

// Link named pages only; controls such as Select Model still need to be used in the app.
const destinations = [
  ['Sign in form', '/login'],
  ['Sign up', '/register'],
  ['Request an invitation', '/request-access'],
  ['Georgia Tech VPN portal', 'https://vpn.gatech.edu/'],
  ['GT-DARE', '/login'],
  ['Conversations', '/conversation'],
  ['Sources', '/files'],
  ['Cost Tracking', '/billing/'],
  ['User Manual', '/help/user-guide'],
  ['Help & support', '/help'],
  ['Forgot Password', '/forgot-password'],
  ['gt-ospo@gatech.edu', 'mailto:gt-ospo@gatech.edu'],
] as const

const InstructionText = ({ text }: { text: string }) => {
  const parts = []
  const linked = new Set<string>()
  let cursor = 0
  while (cursor < text.length) {
    const next = destinations
      .map(([label, href]) => ({
        label,
        href,
        index: text.indexOf(label, cursor),
      }))
      .filter((match) => match.index >= 0)
      .sort((a, b) => a.index - b.index || b.label.length - a.label.length)[0]
    if (!next) {
      parts.push(text.slice(cursor))
      break
    }
    if (linked.has(next.href)) {
      parts.push(text.slice(cursor, next.index + next.label.length))
      cursor = next.index + next.label.length
      continue
    }
    linked.add(next.href)
    parts.push(
      <Fragment key={next.index}>
        {text.slice(cursor, next.index)}
        <a
          href={next.href}
          target={next.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={
            next.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
          }
          className='font-medium text-primary underline underline-offset-4'
        >
          {next.label}
          {!next.href.startsWith('mailto:') && (
            <span className='sr-only'> (opens in a new tab)</span>
          )}
        </a>
      </Fragment>
    )
    cursor = next.index + next.label.length
  }
  return <>{parts}</>
}
export default InstructionText
