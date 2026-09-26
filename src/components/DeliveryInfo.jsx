import { TbCalendarEvent, TbTruckDelivery } from 'react-icons/tb'

export default function DeliveryInfo({ eta, delayed = false }) {
  return (
    <section
      className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${
        delayed ? 'border-warning/30 bg-warning-soft' : 'border-line bg-card'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
            delayed ? 'bg-warning/15 text-warning' : 'bg-accent-soft text-accent'
          }`}
        >
          {delayed ? (
            <TbCalendarEvent className="size-5" />
          ) : (
            <TbTruckDelivery className="size-5" />
          )}
        </span>
        <div className="min-w-0">
          <p
            className={`text-xs font-semibold tracking-wide uppercase ${
              delayed ? 'text-warning' : 'text-muted'
            }`}
          >
            {eta.label}
          </p>
          <p className="mt-1 text-lg leading-tight font-semibold text-balance">
            {eta.value}
          </p>
          {eta.previous && (
            <p className="mt-1 text-sm text-muted">
              Originally{' '}
              <span className="line-through decoration-muted/60">
                {eta.previous}
              </span>
            </p>
          )}
          {eta.note && (
            <p className="mt-1 text-sm text-pretty text-muted">{eta.note}</p>
          )}
        </div>
      </div>
    </section>
  )
}
