# Order Tracking

A mobile-first order tracking screen for an e-commerce app, built with React,
Vite and Tailwind CSS. All data is local mock data — there is no backend, no API
and no database.

## Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- JavaScript
- `react-icons` (Tabler set) for icons
- `sonner` for toast notifications

## Features

- Responsive, mobile-first order tracking screen
- Delivery timeline with completed, current and upcoming stages
- Estimated delivery date with delayed-order comparison
- Product summary with quantity and price
- Order details dialog
- Support actions: contact support and report an issue
- Four order states: normal, delayed, delivered but not received, and tracking
  unavailable
- Loading, error and empty states
- Demo scenario selector, synced with the URL
- Query parameter support for every state
- Keyboard accessible dialogs with focus management

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Scenario Testing

Use the "Demo scenario" control at the bottom of the screen, or set the
scenario with a query parameter:

```text
/?scenario=normal
/?scenario=delayed
/?scenario=delivered-not-received
/?scenario=no-tracking
/?scenario=error
/?scenario=empty
```

Any missing or unrecognised value falls back to `normal`.

## Project Structure

```text
src/
├── components/
│   ├── OrderHeader.jsx
│   ├── StatusBadge.jsx
│   ├── DeliveryTimeline.jsx
│   ├── DeliveryInfo.jsx
│   ├── ProductSummary.jsx
│   ├── SupportActions.jsx
│   ├── StatePanel.jsx
│   └── Modal.jsx
├── data/
│   └── orders.js
├── App.jsx
├── main.jsx
└── index.css
```

`Modal.jsx` is a single shared dialog used by order details, contact support and
report issue. `StatePanel.jsx` covers every non-content state (loading, error,
empty and the contextual notices) from one config-driven component.

## Deployment

`vercel.json` rewrites all paths to `index.html` so deep links and query
parameters work on refresh. Any static host works the same way.
