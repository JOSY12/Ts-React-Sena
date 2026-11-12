import { currentSessionVersion, isCurrentSession } from './client'
import { toast } from 'sonner'
import { errorMessage } from './errors'

export async function notify<T>(
  task: () => Promise<T>,
  loading: string,
  success?: string
): Promise<T> {
  const session = currentSessionVersion()
  const id = toast.loading(loading)
  try {
    const result = await task()
    if (success && isCurrentSession(session)) toast.success(success, { id })
    else toast.dismiss(id)
    return result
  } catch (error) {
    if (isCurrentSession(session)) toast.error(errorMessage(error), { id })
    else toast.dismiss(id)
    throw error
  }
}
