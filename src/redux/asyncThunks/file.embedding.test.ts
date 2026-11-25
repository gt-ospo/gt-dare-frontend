import { beforeEach, describe, expect, it, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import { uploadNewFile } from './file'
import { uploadFileAPI } from '../../api/files'

vi.mock('../../api/files', () => ({ uploadFileAPI: vi.fn() }))

const store = configureStore({ reducer: (state = {}) => state })
const upload = vi.mocked(uploadFileAPI)
const files = Array.from(
  { length: 6 },
  (_, i) => new File(['sample'], `document-${i}.txt`, { type: 'text/plain' })
)

beforeEach(() => {
  upload.mockReset()
  upload.mockResolvedValue([])
})

describe('document embedding upload', () => {
  it('leaves legacy uploads without embedding fields', async () => {
    await store
      .dispatch(uploadNewFile({ files: [files[0]], tags: [] }))
      .unwrap()
    const data = upload.mock.calls[0][0]
    expect(data.has('embedding_model')).toBe(false)
    expect(data.has('embedding_connection_id')).toBe(false)
  })

  it('preserves the legacy upload format for Granite', async () => {
    await store
      .dispatch(
        uploadNewFile({
          files: [files[0]],
          tags: [],
          embedding: { model: 'granite' },
        })
      )
      .unwrap()
    const data = upload.mock.calls[0][0]
    expect(data.has('embedding_model')).toBe(false)
    expect(data.has('embedding_connection_id')).toBe(false)
  })

  it('pins the same personal connection and model to every batch', async () => {
    await store
      .dispatch(
        uploadNewFile({
          files,
          tags: [],
          embedding: {
            model: 'embeddinggemma-2',
            connectionId: 'personal-connection',
          },
        })
      )
      .unwrap()
    expect(upload).toHaveBeenCalledTimes(2)
    for (const [data] of upload.mock.calls) {
      expect(data.get('embedding_model')).toBe('embeddinggemma-2')
      expect(data.get('embedding_connection_id')).toBe('personal-connection')
    }
    expect(upload.mock.calls[0][0].getAll('files')).toHaveLength(5)
    expect(upload.mock.calls[1][0].getAll('files')).toHaveLength(1)
  })
})
