import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { AppDispatch, RootState } from '../../redux/store'
import { createConversation } from '../../redux/asyncThunks/conversation'
import { Button } from '../ui/button'
import {
  resetConversation,
  updateActiveConversation,
  updateSelectedTags,
} from '@/redux/conversationSlice'

const NewConversation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const conversations = useSelector(
    (state: RootState) => state.conversation?.conversations || []
  )

  const hasNoConversations = conversations.length === 0

  const handleCreate = async () => {
    if (creating) return
    setCreating(true)
    setError('')
    try {
      dispatch(updateSelectedTags([]))
      const conversation = await dispatch(createConversation()).unwrap()
      dispatch(resetConversation())
      dispatch(updateActiveConversation(conversation))
      navigate(`/conversation/${conversation.conversationId}`)
    } catch {
      setError('The conversation could not be created. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className='flex h-full flex-col items-center justify-center gap-4'>
      {hasNoConversations && (
        <Button
          onClick={handleCreate}
          disabled={creating}
          size='lg'
          className='gap-2 rounded-full px-6 py-3 text-base font-medium'
        >
          <Plus className='h-5 w-5' />
          {creating ? 'Creating conversation…' : 'Create New Conversation'}
        </Button>
      )}
      <h3 className='text-center text-2xl font-semibold text-foreground'>
        {hasNoConversations
          ? 'Start your first conversation'
          : 'Choose a conversation to continue'}
      </h3>
      <p className='max-w-md px-4 text-center text-sm leading-relaxed text-muted-foreground'>
        {hasNoConversations
          ? 'Create a conversation first. Then choose a model and type your question in the toolbar below.'
          : 'Open New Chat or another conversation in the list. Use the + button to start a separate discussion.'}
      </p>
      {error && (
        <p role='alert' className='px-4 text-center text-sm text-destructive'>
          {error}
        </p>
      )}
    </div>
  )
}

export default NewConversation
