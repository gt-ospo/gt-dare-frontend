import { EmbeddingModelCatalog, EmbeddingSelection } from '@/redux/types/files'

export function isEmbeddingAvailable(
  selection: EmbeddingSelection,
  catalog: EmbeddingModelCatalog | null
): boolean {
  if (selection.model === 'granite' && !selection.connectionId) return true
  if (!selection.connectionId || !catalog) return false
  return catalog.connections.some(
    (connection) =>
      connection.id === selection.connectionId &&
      connection.models.some((model) => model.id === selection.model)
  )
}
