import { currentSessionVersion, isCurrentSession } from './client'
import { errorMessage } from './errors'

export async function userTask<T>(
  task: () => Promise<T>,
  apply: (data: T) => void,
  fail: (message: string) => void
): Promise<boolean> {
  const session = currentSessionVersion()
  try {
    const data = await task()
    if (!isCurrentSession(session)) return false
    apply(data)
    return true
  } catch (error) {
    if (isCurrentSession(session)) fail(errorMessage(error))
    return false
  }
}

export function deduplicateUserLoad(
  load: () => Promise<boolean>
): () => Promise<boolean> {
  let pending: { session: number; promise: Promise<boolean> } | null = null
  return () => {
    const session = currentSessionVersion()
    if (pending?.session === session) return pending.promise
    const promise = load().finally(() => {
      if (pending?.promise === promise) pending = null
    })
    pending = { session, promise }
    return promise
  }
}
