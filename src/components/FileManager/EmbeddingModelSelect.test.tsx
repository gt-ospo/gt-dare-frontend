import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import EmbeddingModelSelect from './EmbeddingModelSelect'

const fixtures = vi.hoisted(() => ({
  files: {
    embeddingModels: null as null | {
      connections: {
        id: string
        label: string
        models: { id: string; name: string }[]
      }[]
    },
    embeddingModelsError: null,
    embeddingModelsRequest: null,
  },
}))

vi.mock('@/redux/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: (selector: (state: typeof fixtures) => unknown) =>
    selector(fixtures),
}))
vi.mock('@/redux/asyncThunks/file', () => ({ fetchEmbeddingModels: vi.fn() }))

function render(model: string, connectionId?: string) {
  return renderToStaticMarkup(
    <StaticRouter location='/sources/'>
      <EmbeddingModelSelect
        value={{ model, connectionId }}
        onChange={() => {}}
      />
    </StaticRouter>
  )
}

beforeEach(() => {
  fixtures.files.embeddingModels = { connections: [] }
})

describe('document search model selection', () => {
  it('shows Granite and directs users without a key to Cost Tracking', () => {
    const html = render('granite')
    expect(html).toContain('IBM Granite')
    expect(html).toContain('connect your own key')
    expect(html).toContain('href="/billing/"')
  })

  it('lists an available personal model and its connection', () => {
    fixtures.files.embeddingModels = {
      connections: [
        {
          id: 'one',
          label: 'My SPIN',
          models: [{ id: 'gemma', name: 'EmbeddingGemma' }],
        },
      ],
    }
    const html = render('gemma', 'one')
    expect(html).toContain('EmbeddingGemma — My SPIN')
    expect(html).not.toContain('Current model unavailable')
  })

  it('explains when a saved SPIN connection offers no document models', () => {
    fixtures.files.embeddingModels = {
      connections: [{ id: 'one', label: 'My SPIN', models: [] }],
    }
    const html = render('granite')
    expect(html).toContain('No document search models are available')
    expect(html).toContain('Check your key and connection')
    expect(html).not.toContain('connect your own key')
  })

  it('does not present a removed connection as the default model', () => {
    const html = render('gemma', 'deleted')
    expect(html).toContain('Current model unavailable')
    expect(html).toContain('Check the connection or')
  })
})
