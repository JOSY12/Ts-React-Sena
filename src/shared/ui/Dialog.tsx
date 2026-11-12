import { useEffect, useRef, type ReactNode } from 'react'

export default function Dialog({
  open,
  onClose,
  title,
  children
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return
    const previousFocus = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [open])
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClose={() => {
        if (!ref.current?.open) onClose()
      }}
      className='fixed inset-0 m-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border-0 bg-white p-0 text-gray-900 shadow-lg backdrop:bg-black/50'
    >
      {children}
    </dialog>
  )
}
