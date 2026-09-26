import { useEffect, useRef, useState } from 'react'
import { TbChevronDown, TbRefresh } from 'react-icons/tb'
import DeliveryInfo from './components/DeliveryInfo'
import DeliveryTimeline from './components/DeliveryTimeline'
import Modal from './components/Modal'
import OrderHeader from './components/OrderHeader'
import ProductSummary from './components/ProductSummary'
import StatusBadge from './components/StatusBadge'
import { orders, SCENARIOS } from './data/orders'

const VALID_SCENARIOS = SCENARIOS.map((item) => item.id)

function readScenario() {
  const value = new URLSearchParams(window.location.search).get('scenario')
  return VALID_SCENARIOS.includes(value) ? value : 'normal'
}

function labelFor(id) {
  return SCENARIOS.find((item) => item.id === id)?.label ?? ''
}

function phaseFor(scenario, attempt) {
  if (scenario === 'empty') return 'empty'
  if (scenario === 'error' && attempt === 0) return 'error'
  return 'ready'
}

function ScenarioPicker({ value, onChange }) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-line bg-card/60 p-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="scenario"
          className="text-xs font-medium tracking-wide text-muted uppercase"
        >
          Demo scenario
        </label>
        <div className="relative">
          <select
            id="scenario"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="max-w-[14rem] appearance-none rounded-lg border border-line bg-card py-2 pr-9 pl-3 text-sm font-medium text-ink"
          >
            {SCENARIOS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <TbChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
          />
        </div>
      </div>
    </div>
  )
}

function OrderDetails({ order }) {
  const rows = [
    ['Order ID', order.id],
    ['Quantity', String(order.product.quantity)],
    ['Payment', order.payment],
    ['Subtotal', order.totals.subtotal],
    ['Shipping', order.totals.shipping],
    ['Total', order.totals.total],
  ]

  return (
    <dl className="space-y-3 text-sm">
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className={`flex justify-between gap-4 ${
            index === rows.length - 1
              ? 'border-t border-line pt-3 font-semibold'
              : ''
          }`}
        >
          <dt className="text-muted">{label}</dt>
          <dd className="text-right font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Placeholder({ label, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-line text-sm text-muted ${className}`}
    >
      {label}
    </div>
  )
}

export default function App() {
  const [scenario, setScenario] = useState(readScenario)
  const [phase, setPhase] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [reload, setReload] = useState(0)
  const [dialog, setDialog] = useState(null)
  const [announcement, setAnnouncement] = useState('')
  const lastOrder = useRef('normal')
  const initial = useRef({ scenario, attempt })

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(phaseFor(initial.current.scenario, initial.current.attempt))
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (reload === 0) return
    const timer = setTimeout(() => setPhase('ready'), 450)
    return () => clearTimeout(timer)
  }, [reload])

  useEffect(() => {
    function onPopState() {
      const next = readScenario()
      setScenario(next)
      setAttempt(0)
      setDialog(null)
      setPhase(phaseFor(next, 0))
      setAnnouncement(`Showing ${labelFor(next)} scenario`)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function pushUrl(next) {
    const url = new URL(window.location.href)
    url.searchParams.set('scenario', next)
    window.history.pushState(null, '', url)
  }

  function chooseScenario(next) {
    if (orders[next]) lastOrder.current = next
    pushUrl(next)
    setScenario(next)
    setAttempt(0)
    setDialog(null)
    setPhase(phaseFor(next, 0))
    setAnnouncement(`Showing ${labelFor(next)} scenario`)
  }

  function retry() {
    const next = lastOrder.current
    pushUrl(next)
    setScenario(next)
    setAttempt(1)
    setDialog(null)
    setPhase('loading')
    setReload((value) => value + 1)
  }

  const order = phase === 'ready' ? orders[scenario] : null

  return (
    <div className="min-h-dvh bg-canvas">
      <main className="mx-auto w-full max-w-[430px] px-4 pt-4 pb-16 sm:px-5 lg:max-w-lg lg:py-10">
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>

        {phase === 'ready' ? (
          <div className="flex flex-col gap-3">
            <OrderHeader orderId={order.id} />
            <section className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
              <StatusBadge status={order.status} label={order.statusLabel} />
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                {order.headline}
              </h2>
              <p className="mt-1.5 text-sm text-pretty text-muted">
                {order.description}
              </p>
            </section>
            {order.timeline ? (
              <DeliveryTimeline steps={order.timeline} />
            ) : (
              <Placeholder label="No tracking data" className="h-40 w-full" />
            )}
            <DeliveryInfo eta={order.eta} delayed={order.status === 'delayed'} />
            <ProductSummary
              order={order}
              onViewDetails={() => setDialog('details')}
            />
            <Placeholder label="Support actions" className="h-28 w-full" />
          </div>
        ) : (
          <section className="mt-16 rounded-2xl border border-dashed border-line px-5 py-10 text-center">
            <p className="text-sm text-muted">
              {phase === 'loading' ? 'Loading your order' : `${phase} state`}
            </p>
            {phase === 'error' && (
              <button
                type="button"
                onClick={retry}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-medium text-white"
              >
                <TbRefresh aria-hidden="true" className="size-4" />
                Try again
              </button>
            )}
          </section>
        )}

        <ScenarioPicker value={scenario} onChange={chooseScenario} />
      </main>

      <Modal
        open={dialog === 'details'}
        title="Order details"
        description={order ? `Placed ${order.placedOn}` : null}
        onClose={() => setDialog(null)}
      >
        {order && <OrderDetails order={order} />}
      </Modal>
    </div>
  )
}
