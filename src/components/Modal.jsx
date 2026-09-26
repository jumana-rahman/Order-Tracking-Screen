import { useEffect, useId, useRef } from 'react'
import { TbX } from 'react-icons/tb'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Modal({ open, title, description, onClose, children }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_150ms_ease-out] bg-ink/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[88dvh] w-full max-w-md animate-[rise-in_180ms_ease-out] flex-col overflow-hidden rounded-t-2xl bg-card shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-line p-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-sm text-pretty text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mt-1 -mr-1 flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5"
          >
            <TbX aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}
