import { TbCircle, TbCircleCheck } from 'react-icons/tb'

const DOT = 'flex size-6 shrink-0 items-center justify-center rounded-full'

function dotStyle(step) {
  if (step.completed && !step.current) return `${DOT} bg-success text-white`
  if (step.current) return `${DOT} bg-accent text-white ring-4 ring-accent-soft`
  return `${DOT} border-2 border-line bg-card text-muted`
}

function dotIcon(step) {
  if (step.completed && !step.current) return <TbCircleCheck className="size-4" />
  if (step.current) return <TbCircle className="size-3 fill-current" />
  return <TbCircle className="size-2.5" />
}

export default function DeliveryTimeline({ steps }) {
  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold">Delivery progress</h2>
      <ol className="mt-3">
        {steps.map((step, index) => {
          const isDone = step.completed && !step.current
          const isCurrent = Boolean(step.current)
          const isLast = index === steps.length - 1
          const reached = isDone || isCurrent
          const connector = isLast ? null : 'bg-success/35'

          return (
            <li key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className={dotStyle(step)} aria-hidden="true">
                  {dotIcon(step)}
                </span>
                {connector && (
                  <span className={`w-0.5 flex-1 ${connector}`} aria-hidden="true" />
                )}
              </div>
              <div className={isLast ? '' : 'pb-5'}>
                <p
                  className={`text-sm leading-5 font-semibold ${
                    reached ? 'text-ink' : 'text-muted'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {step.label}
                  {isCurrent && <span className="sr-only"> (current stage)</span>}
                  {isDone && <span className="sr-only"> (completed)</span>}
                </p>
                <p className="text-xs text-pretty text-muted">
                  {step.description}
                </p>
                <p className="mt-0.5 text-xs text-muted/80">{step.time}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
