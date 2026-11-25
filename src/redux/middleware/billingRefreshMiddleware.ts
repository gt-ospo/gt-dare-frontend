import {
  createAction,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit'
import { SenderType } from '@/utils/constants/conversation'
import type { Message } from '../types/conversation'
import { getWallets } from '../asyncThunks/billing'
import { getUserStats, userLogin, userLogout } from '../asyncThunks/user'

interface BillingRefreshState {
  user: { isAuthenticated: boolean }
}

const messageReceived = createAction<Message>('socket/message')
const streamReceived = createAction<
  Partial<Message> & { isComplete?: boolean }
>('socket/ai_stream')

export function createBillingRefreshMiddleware() {
  const listener = createListenerMiddleware<BillingRefreshState>()
  const completed = new Set<string>()

  listener.startListening({
    matcher: isAnyOf(
      messageReceived,
      streamReceived,
      userLogin.pending,
      userLogout.pending
    ),
    effect: (action, api) => {
      if (userLogin.pending.match(action) || userLogout.pending.match(action)) {
        completed.clear()
        return
      }

      if (streamReceived.match(action)) {
        if (action.payload.id !== undefined && !action.payload.isComplete) {
          completed.delete(action.payload.id)
        }
        return
      }

      if (!messageReceived.match(action)) return
      const message = action.payload
      if (message.streaming) {
        completed.delete(message.id)
        return
      }
      if (
        !api.getState().user.isAuthenticated ||
        message.senderType !== SenderType.AI_ASSISTANT ||
        message.streaming !== false ||
        completed.has(message.id)
      ) {
        return
      }

      // The final message is emitted after billing; stream-end chunks precede it.
      completed.add(message.id)
      api.dispatch(getWallets())
      api.dispatch(getUserStats())
    },
  })

  return listener.middleware
}
