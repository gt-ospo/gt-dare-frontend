import { describe, expect, it } from 'vitest'
import { isEmbeddingAvailable } from './embedding'

const catalog = {
  connections: [
    {
      id: 'my-connection',
      label: 'SPIN',
      models: [{ id: 'embeddinggemma-2', name: 'EmbeddingGemma' }],
    },
  ],
}

describe('available document search models', () => {
  it('allows Granite without a SPIN connection', () => {
    expect(isEmbeddingAvailable({ model: 'granite' }, null)).toBe(true)
  })

  it('requires the same personal connection and model', () => {
    const selection = {
      model: 'embeddinggemma-2',
      connectionId: 'my-connection',
    }
    expect(isEmbeddingAvailable(selection, catalog)).toBe(true)
    expect(isEmbeddingAvailable(selection, { connections: [] })).toBe(false)
    expect(isEmbeddingAvailable(selection, null)).toBe(false)
    expect(isEmbeddingAvailable({ model: 'embeddinggemma-2' }, catalog)).toBe(
      false
    )
    expect(
      isEmbeddingAvailable({ ...selection, model: 'other-model' }, catalog)
    ).toBe(false)
    expect(
      isEmbeddingAvailable({ ...selection, connectionId: 'other-key' }, catalog)
    ).toBe(false)
  })
})
