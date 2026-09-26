import {
  TbBox,
  TbHeadphones,
  TbPackage,
  TbWatch,
} from 'react-icons/tb'

const normalOrder = {
  scenario: 'normal',
  id: 'ORD-10492',
  status: 'shipped',
  statusLabel: 'Shipped',
  headline: 'Your order is on the way',
  description:
    'It left the depot this morning and is with your courier today.',
  placedOn: 'Sep 24, 2026',
  eta: {
    label: 'Estimated delivery',
    value: 'Today, 6:00 PM',
    note: 'Your courier is on the way to your address.',
  },
  product: {
    name: 'Wireless Noise-Cancelling Headphones',
    quantity: 1,
    price: '$89.00',
    icon: TbHeadphones,
    tint: 'bg-accent-soft text-accent',
  },
  totals: { subtotal: '$89.00', shipping: 'Free', total: '$89.00' },
  payment: 'Paid with Visa ending 4242',
  timeline: [
    {
      label: 'Processing',
      description: 'Order confirmed and packed',
      time: 'Sep 24, 9:12 AM',
      completed: true,
    },
    {
      label: 'Shipped',
      description: 'Handed over to the carrier',
      time: 'Sep 25, 4:38 PM',
      completed: true,
    },
    {
      label: 'Out for Delivery',
      description: 'On the van with your courier',
      time: 'Today, 9:05 AM',
      completed: false,
      current: true,
    },
    {
      label: 'Delivered',
      description: 'Left at your delivery address',
      time: 'Expected today',
      completed: false,
    },
  ],
  notice: null,
}

const delayedOrder = {
  scenario: 'delayed',
  id: 'ORD-10431',
  status: 'delayed',
  statusLabel: 'Delayed',
  headline: 'Delivery is running late',
  description:
    'Your order is taking longer than expected. A weather delay at the regional hub has pushed it back a day.',
  placedOn: 'Sep 19, 2026',
  eta: {
    label: 'Updated delivery estimate',
    value: 'Tomorrow, 8:00 PM',
    note: 'We will keep tracking this for you.',
    previous: 'Sep 24, 6:00 PM',
  },
  product: {
    name: 'Fitness Tracker Watch',
    quantity: 1,
    price: '$129.00',
    icon: TbWatch,
    tint: 'bg-warning-soft text-warning',
  },
  totals: { subtotal: '$129.00', shipping: 'Free', total: '$129.00' },
  payment: 'Paid with Mastercard ending 8831',
  timeline: [
    {
      label: 'Processing',
      description: 'Order confirmed and packed',
      time: 'Sep 19, 10:02 AM',
      completed: true,
    },
    {
      label: 'Shipped',
      description: 'Handed over to the carrier',
      time: 'Sep 20, 2:20 PM',
      completed: true,
    },
    {
      label: 'Out for Delivery',
      description: 'Held at the regional hub',
      time: 'Expected tomorrow',
      completed: false,
      current: true,
    },
    {
      label: 'Delivered',
      description: 'Left at your delivery address',
      time: 'Est. Sep 27',
      completed: false,
    },
  ],
  notice: {
    tone: 'warning',
    title: 'Why is it late?',
    body: 'Severe weather closed two sorting centres, so your parcel is moving one day behind schedule. Nothing is lost and no action is needed from you.',
    action: { label: 'Report a delivery issue', dialog: 'report' },
  },
}

const deliveredMissingOrder = {
  scenario: 'delivered-not-received',
  id: 'ORD-10387',
  status: 'delivered',
  statusLabel: 'Marked as delivered',
  headline: 'Marked as delivered, but not received',
  description:
    'The courier marked this order as delivered on Sep 25 at 2:14 PM. You have told us the parcel never arrived.',
  placedOn: 'Sep 21, 2026',
  eta: {
    label: 'Marked delivered',
    value: 'Sep 25, 2:14 PM',
    note: 'Left with a neighbour? Check with them before reporting.',
  },
  product: {
    name: 'Everyday Canvas Backpack',
    quantity: 1,
    price: '$64.00',
    icon: TbPackage,
    tint: 'bg-danger-soft text-danger',
  },
  totals: { subtotal: '$64.00', shipping: 'Free', total: '$64.00' },
  payment: 'Paid with Apple Pay',
  timeline: [
    {
      label: 'Processing',
      description: 'Order confirmed and packed',
      time: 'Sep 21, 11:30 AM',
      completed: true,
    },
    {
      label: 'Shipped',
      description: 'Handed over to the carrier',
      time: 'Sep 22, 5:45 PM',
      completed: true,
    },
    {
      label: 'Out for Delivery',
      description: 'On the van with your courier',
      time: 'Sep 25, 8:40 AM',
      completed: true,
    },
    {
      label: 'Delivered',
      description: 'Marked delivered by the driver',
      time: 'Sep 25, 2:14 PM',
      completed: true,
      current: true,
    },
  ],
  notice: {
    tone: 'danger',
    title: "Didn't receive your order?",
    body: 'We can open a carrier investigation and arrange a replacement or a refund. Most missing parcels are found within 24 hours of a report.',
    action: { label: 'Report an issue', dialog: 'report' },
  },
}

const noTrackingOrder = {
  scenario: 'no-tracking',
  id: 'ORD-10517',
  status: 'pending',
  statusLabel: 'Tracking pending',
  headline: "Tracking isn't available yet",
  description:
    'Your order is confirmed and waiting to be handed over to the carrier. Live tracking appears as soon as that happens.',
  placedOn: 'Sep 25, 2026',
  eta: {
    label: 'Estimated delivery',
    value: 'Sep 30 – Oct 2',
    note: 'An exact date appears once your parcel is scanned by the carrier.',
  },
  product: {
    name: 'Mechanical Keyboard',
    quantity: 1,
    price: '$118.00',
    icon: TbBox,
    tint: 'bg-canvas text-muted',
  },
  totals: { subtotal: '$118.00', shipping: '$5.00', total: '$123.00' },
  payment: 'Paid with Visa ending 9017',
  timeline: null,
  notice: {
    tone: 'info',
    title: 'Nothing is wrong with your order',
    body: 'Your order has been confirmed. Tracking details will appear on this page once the package is handed over to the carrier, usually within one working day.',
    action: { label: 'Contact Support', dialog: 'support' },
  },
}

export const orders = {
  normal: normalOrder,
  delayed: delayedOrder,
  'delivered-not-received': deliveredMissingOrder,
  'no-tracking': noTrackingOrder,
}

export const SCENARIOS = [
  { id: 'normal', label: 'Normal' },
  { id: 'delayed', label: 'Delayed' },
  { id: 'delivered-not-received', label: 'Delivered but not received' },
  { id: 'no-tracking', label: 'Tracking unavailable' },
  { id: 'error', label: 'Error' },
  { id: 'empty', label: 'Empty' },
]
