import { useEffect, useRef, useState } from 'react'
import { TbChevronDown, TbChevronRight } from 'react-icons/tb'
import { Toaster, toast } from 'sonner'
import DeliveryInfo from './components/DeliveryInfo'
import DeliveryTimeline from './components/DeliveryTimeline'
import Modal from './components/Modal'
import OrderHeader from './components/OrderHeader'
import ProductSummary from './components/ProductSummary'
import StatePanel from './components/StatePanel'
import StatusBadge from './components/StatusBadge'
import SupportActions from './components/SupportActions'
import { orders, SCENARIOS } from './data/orders'

const VALID_SCENARIOS = SCENARIOS.map((item) => item.id)

const SUPPORT_TOPICS = [
  'Delivery is running late',
  'My parcel has not arrived',
  'I need to change my order',
  'Something else',
]

const ISSUE_TYPES = [
  'Order has not arrived',
  'Parcel arrived damaged',
  'Wrong item received',
  'An item is missing from the parcel',
]

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

function reference() {
  return `DSP-${Math.floor(10000 + Math.random() * 90000)}`
}

function ScenarioPicker({ value, onChange }) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-line bg-card/60 p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="scenario"
          className="text-xs font-medium tracking-wide text-muted uppercase"
        >
          Demo scenario
        </label>
        <div className="relative w-full sm:w-60">
          <select
            id="scenario"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full appearance-none rounded-lg border border-line bg-card py-2 pr-9 pl-3 text-sm font-medium text-ink"
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

function ChoiceList({ options, onSelect }) {
  return (
    <ul className="grid gap-2">
      {options.map((option) => (
        <li key={option}>
          <button
            type="button"
            onClick={() => onSelect(option)}
            className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 text-left text-sm font-medium transition-colors hover:bg-canvas"
          >
            {option}
            <TbChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
          </button>
        </li>
      ))}
    </ul>
  )
}

function NoticePanel({ notice, onAction }) {
  if (!notice) return null
  return (
    <StatePanel
      variant={notice.tone}
      title={notice.title}
      body={notice.body}
      actionLabel={notice.action?.label}
      onAction={onAction}
    />
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

  function submitIssue(type) {
    setDialog(null)
    toast.success('Report submitted', {
      description: `${type} · Reference ${reference()}. We'll email you within 24 hours.`,
    })
  }

  function submitTopic(topic) {
    setDialog(null)
    toast.success('Support request sent', {
      description: `We'll reply about "${topic}" within one working day.`,
    })
  }

  const order = phase === 'ready' ? orders[scenario] : null
  const noticeAction = order?.notice
    ? () => setDialog(order.notice.action.dialog)
    : undefined

  return (
    <div className="min-h-dvh bg-canvas">
      <main className="mx-auto w-full max-w-[430px] px-4 pt-4 pb-16 sm:px-5 lg:max-w-lg lg:py-10">
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>

        {phase === 'ready' && order ? (
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
              <>
                <DeliveryTimeline steps={order.timeline} />
                <DeliveryInfo
                  eta={order.eta}
                  delayed={order.status === 'delayed'}
                />
                <NoticePanel notice={order.notice} onAction={noticeAction} />
              </>
            ) : (
              <>
                <NoticePanel notice={order.notice} onAction={noticeAction} />
                <DeliveryInfo eta={order.eta} />
              </>
            )}

            <ProductSummary
              order={order}
              onViewDetails={() => setDialog('details')}
            />

            <SupportActions
              onReportIssue={() => setDialog('report')}
              onContactSupport={() => setDialog('support')}
            />
          </div>
        ) : phase === 'loading' ? (
          <div className="mt-16">
            <StatePanel variant="loading" spin />
          </div>
        ) : phase === 'error' ? (
          <div className="mt-16">
            <StatePanel
              variant="error"
              actionLabel="Try again"
              onAction={retry}
            />
          </div>
        ) : (
          <div className="mt-16">
            <StatePanel
              variant="empty"
              actionLabel="Back to orders"
              onAction={() => chooseScenario(lastOrder.current)}
            />
          </div>
        )}

        <ScenarioPicker value={scenario} onChange={chooseScenario} />
      </main>

      <Modal
        open={dialog === 'details'}
        title="Order details"
        description={order ? `Order ${order.id}` : null}
        onClose={() => setDialog(null)}
      >
        {order && <OrderDetails order={order} />}
      </Modal>

      <Modal
        open={dialog === 'report'}
        title="Report an issue"
        description="Tell us what went wrong and we will investigate."
        onClose={() => setDialog(null)}
      >
        <ChoiceList options={ISSUE_TYPES} onSelect={submitIssue} />
        <button
          type="button"
          onClick={() => setDialog(null)}
          className="mt-3 min-h-11 w-full rounded-xl border border-line bg-card text-sm font-semibold transition-colors hover:bg-canvas"
        >
          Close
        </button>
      </Modal>

      <Modal
        open={dialog === 'support'}
        title="How can we help?"
        description="Choose a topic and our support team will pick it up."
        onClose={() => setDialog(null)}
      >
        <ChoiceList options={SUPPORT_TOPICS} onSelect={submitTopic} />
        <button
          type="button"
          onClick={() => setDialog(null)}
          className="mt-3 min-h-11 w-full rounded-xl border border-line bg-card text-sm font-semibold transition-colors hover:bg-canvas"
        >
          Close
        </button>
      </Modal>

      <Toaster
        position="bottom-center"
        richColors
        closeButton
        offset={24}
        toastOptions={{ className: 'font-sans' }}
      />
    </div>
  )
}
