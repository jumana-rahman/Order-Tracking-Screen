import { TbArrowLeft } from 'react-icons/tb'

export default function OrderHeader({ orderId }) {
  return (
    <header className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5 active:bg-black/10"
      >
        <TbArrowLeft aria-hidden="true" className="size-5" />
      </button>
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold">Order Tracking</h1>
        <p className="truncate text-sm text-muted">Order #{orderId}</p>
      </div>
    </header>
  )
}
