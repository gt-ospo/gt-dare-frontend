import { expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import GuideArticle from '@/components/Documentation/GuideArticle'
import { manualTopics } from './topics'

it('explains fixed new-document search and existing SPIN documents', () => {
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
  expect(html).toContain('New uploads use IBM Granite')
  expect(html).toContain('original personal SPIN connection')
  expect(html).toContain('choose Basic for a SPIN document')
  expect(html).toContain('upload the original file again')
  expect(html).toContain('gemma-4-26B')
  expect(html).not.toContain('EmbeddingGemma 2')
  expect(html).not.toContain('Nemotron 3.5 Embed 8B')
})
