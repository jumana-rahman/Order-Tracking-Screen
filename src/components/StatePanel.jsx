import {
  TbAlertCircle,
  TbAlertTriangle,
  TbInfoCircle,
  TbPhotoOff,
  TbRefresh,
} from 'react-icons/tb'

const VARIANTS = {
  loading: { Icon: TbRefresh, panel: 'border-line bg-card', icon: 'text-muted' },
  error: { Icon: TbAlertCircle, panel: 'border-danger/30 bg-danger-soft', icon: 'text-danger' },
  empty: { Icon: TbPhotoOff, panel: 'border-line bg-card', icon: 'text-muted' },
  notice: { Icon: TbInfoCircle, panel: 'border-line bg-card', icon: 'text-accent' },
  warning: { Icon: TbAlertTriangle, panel: 'border-warning/30 bg-warning-soft', icon: 'text-warning' },
  danger: { Icon: TbAlertCircle, panel: 'border-danger/30 bg-danger-soft', icon: 'text-danger' },
}

const COPY = {
  loading: {
    title: 'Loading your order',
    body: 'Fetching the latest delivery updates.',
  },
  error: {
    title: 'Something went wrong',
    body: "We couldn't load your order information. Please try again.",
  },
  empty: {
    title: 'No order information',
    body: "We couldn't find an order to display.",
  },
}

export default function StatePanel({
  variant,
  title,
  body,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  spin = false,
}) {
  const config = VARIANTS[variant] ?? VARIANTS.empty
  const { Icon } = config
  const fallback = COPY[variant]
  const heading = title ?? fallback?.title
  const detail = body ?? fallback?.body

  return (
    <section
      className={`rounded-2xl border p-6 text-center shadow-sm ${config.panel}`}
    >
      <span
        aria-hidden="true"
        className={`mx-auto flex size-11 items-center justify-center rounded-full bg-card ${config.icon}`}
      >
        <Icon className={`size-5 ${spin ? 'animate-spin' : ''}`} />
      </span>
      <h2 className="mt-3 text-base font-semibold">{heading}</h2>
      {detail && (
        <p className="mx-auto mt-1.5 max-w-xs text-sm text-pretty text-muted">
          {detail}
        </p>
      )}
      {(actionLabel || secondaryLabel) && (
        <div className="mt-4 flex flex-col gap-2">
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${
                variant === 'danger'
                  ? 'bg-danger text-white hover:bg-danger/90'
                  : variant === 'warning'
                    ? 'bg-warning text-white hover:bg-warning/90'
                    : 'bg-ink text-white hover:bg-ink/90'
              }`}
            >
              {variant === 'error' && (
                <TbRefresh aria-hidden="true" className="size-4" />
              )}
              {actionLabel}
            </button>
          )}
          {secondaryLabel && (
            <button
              type="button"
              onClick={onSecondary}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-card px-4 text-sm font-semibold transition-colors hover:bg-canvas"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
