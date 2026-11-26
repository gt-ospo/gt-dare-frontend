import { Link } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchEmbeddingModels } from '@/redux/asyncThunks/file'
import { EmbeddingSelection } from '@/redux/types/files'

interface Props {
  value: EmbeddingSelection
  onChange: (value: EmbeddingSelection) => void
  disabled?: boolean
}

export default function EmbeddingModelSelect({
  value,
  onChange,
  disabled,
}: Props) {
  const dispatch = useAppDispatch()
  const { embeddingModels, embeddingModelsError, embeddingModelsRequest } =
    useAppSelector((state) => state.files)
  const options = (embeddingModels?.connections ?? []).flatMap((connection) =>
    connection.models.map((model) => ({
      value: `${connection.id}:${model.id}`,
      model: model.id,
      connectionId: connection.id,
      label: `${model.name} — ${connection.label}`,
    }))
  )
  const selected =
    value.model === 'granite' && !value.connectionId
      ? 'granite'
      : `${value.connectionId ?? 'missing'}:${value.model}`
  const unavailable =
    selected !== 'granite' &&
    !options.some((option) => option.value === selected)

  return (
    <div className='space-y-2'>
      <Label htmlFor='document-embedding-model'>Document search model</Label>
      <select
        id='document-embedding-model'
        className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground'
        value={selected}
        disabled={disabled}
        onChange={(event) => {
          if (event.target.value === 'granite') {
            onChange({ model: 'granite' })
            return
          }
          const option = options.find(
            (item) => item.value === event.target.value
          )
          if (option)
            onChange({ model: option.model, connectionId: option.connectionId })
        }}
      >
        <option value='granite'>IBM Granite — GT-DARE default</option>
        {unavailable && (
          <option value={selected}>Current model unavailable</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className='text-xs text-muted-foreground'>
        This model creates the searchable index for these documents. SPIN uses
        the selected connection and its token allowance.
      </p>
      {selected !== 'granite' && (
        <p className='text-xs text-muted-foreground'>
          Only you can search this SPIN index using your key. Others opening a
          shared conversation or workflow cannot use your SPIN allowance. If
          SPIN document search is unavailable for your account, contact support.
          For SPIN documents, Advanced reprocessing and continuing scanned-page
          processing after an index is created are not available yet. You can
          reprocess using Basic or upload the document again.
        </p>
      )}
      {embeddingModelsRequest && (
        <p role='status' className='text-xs text-muted-foreground'>
          Loading SPIN models…
        </p>
      )}
      {embeddingModelsError && (
        <p role='alert' className='text-sm text-destructive'>
          Could not load SPIN models.{' '}
          <Button
            variant='link'
            type='button'
            onClick={() => dispatch(fetchEmbeddingModels())}
          >
            Try again
          </Button>
        </p>
      )}
      {embeddingModels && embeddingModels.connections.length === 0 && (
        <p className='text-xs text-muted-foreground'>
          To use SPIN, connect your own key in{' '}
          <Link className='underline' to='/billing/'>
            Cost Tracking
          </Link>
          .
        </p>
      )}
      {embeddingModels &&
        embeddingModels.connections.length > 0 &&
        options.length === 0 && (
          <p className='text-xs text-muted-foreground'>
            No document search models are available on your saved SPIN
            connections. Check your key and connection, then{' '}
            <Button
              variant='link'
              type='button'
              className='h-auto p-0 align-baseline'
              onClick={() => dispatch(fetchEmbeddingModels())}
            >
              try again
            </Button>
          </p>
        )}
      {unavailable && !embeddingModelsRequest && (
        <p role='alert' className='text-sm text-destructive'>
          This model or its connection is unavailable. Check the connection or
          choose an available model.
        </p>
      )}
    </div>
  )
}
