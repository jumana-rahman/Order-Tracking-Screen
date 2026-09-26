import { TbAlertTriangle, TbHeadset } from 'react-icons/tb'

export default function SupportActions({ onReportIssue, onContactSupport }) {
  return (
    <section className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold">Need a hand?</h2>
      <p className="mt-1 text-sm text-pretty text-muted">
        If something looks wrong with this delivery, tell us and we will sort it
        out.
      </p>
      <div className="mt-3 grid gap-2">
        <button
          type="button"
          onClick={onReportIssue}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
        >
          <TbAlertTriangle aria-hidden="true" className="size-4" />
          Report an issue
        </button>
        <button
          type="button"
          onClick={onContactSupport}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 text-sm font-semibold transition-colors hover:bg-canvas"
        >
          <TbHeadset aria-hidden="true" className="size-4" />
          Contact Support
        </button>
      </div>
    </section>
  )
}
