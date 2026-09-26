import { TbChevronRight } from 'react-icons/tb'

export default function ProductSummary({ order, onViewDetails }) {
  const { product, totals, payment, placedOn } = order
  const Icon = product.icon

  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold">Your item</h2>

      <div className="mt-3 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${product.tint}`}
        >
          <Icon className="size-7" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-5 font-medium text-pretty">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            Qty {product.quantity} · {product.price}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold">{product.price}</p>
      </div>

      <dl className="mt-4 space-y-2 border-t border-line pt-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Order placed</dt>
          <dd className="text-right font-medium">{placedOn}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Payment</dt>
          <dd className="text-right font-medium">{payment}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Shipping</dt>
          <dd className="text-right font-medium">{totals.shipping}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onViewDetails}
        className="mt-3 flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-line px-3 text-sm font-semibold transition-colors hover:bg-canvas"
      >
        View order details
        <TbChevronRight aria-hidden="true" className="size-4 text-muted" />
      </button>
    </section>
  )
}
