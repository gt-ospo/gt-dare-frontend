import { expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import GuideArticle from '@/components/Documentation/GuideArticle'
import { manualTopics } from './topics'

it('explains both SPIN document models and their connection limits', () => {
  const topic = manualTopics.find(
    (entry) => entry.id === 'wallets-and-cost-tracking'
  )
  expect(topic).toBeDefined()
  const html = renderToStaticMarkup(
    <StaticRouter location='/help/user-guide/wallets-and-cost-tracking'>
      <GuideArticle
        markdown={topic!.markdown}
        backTo='/help/user-guide'
        backLabel='All manual topics'
        inWorkspace
      />
    </StaticRouter>
  )
  expect(html).toContain('EmbeddingGemma 2')
  expect(html).toContain('Nemotron 3.5 Embed 8B')
  expect(html).toContain('href="/files"')
  expect(html).toContain('upload the original document again')
})
