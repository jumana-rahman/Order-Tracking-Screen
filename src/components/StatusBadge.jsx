import {
  TbAlertTriangle,
  TbCircleCheck,
  TbClock,
  TbTruckDelivery,
} from 'react-icons/tb'

const TONES = {
  shipped: { chip: 'bg-accent-soft text-accent', Icon: TbTruckDelivery },
  delayed: { chip: 'bg-warning-soft text-warning', Icon: TbAlertTriangle },
  delivered: { chip: 'bg-success-soft text-success', Icon: TbCircleCheck },
  pending: { chip: 'bg-canvas text-muted', Icon: TbClock },
}

export default function StatusBadge({ status, label }) {
  const tone = TONES[status] ?? TONES.pending
  const Icon = tone.Icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone.chip}`}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </span>
  )
}
