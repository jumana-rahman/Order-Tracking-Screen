# 📦 Order Tracking Screen

A responsive **Order Tracking Screen** built with **React, Vite, and Tailwind CSS** as part of a frontend development assessment.

### 🚀 Live Demo

🔗 **Live URL:** https://order-tracking-screen-vs.vercel.app/

### 📌 Overview

This project implements a clean and responsive order-tracking interface that allows users to view:

* 🧾 Order information
* 📍 Current order status
* 📊 Order progress timeline
* 🛍️ Product details
* 🚚 Delivery information
* 📱 Responsive layouts for different screen sizes

### 🛠️ Tech Stack

* ⚛️ **React.js**
* ⚡ **Vite**
* 🎨 **Tailwind CSS**
* 🟨 **JavaScript**
* 🌐 **HTML5**
* 🎨 **CSS3**

### ✨ Features

#### 📋 Order Summary

Displays essential order information, including:

* Order number
* Order date
* Current order status
* Estimated delivery date

#### 📍 Order Tracking Timeline

The timeline visually represents the different stages of an order:

1. ✅ Order Placed
2. ✅ Order Confirmed
3. 📦 Processing / Shipped
4. 🚚 Out for Delivery
5. 🏠 Delivered

The current order stage is clearly highlighted to help users understand the delivery progress.

#### 🛍️ Product Information

Displays product-related information such as:

* Product image
* Product name
* Quantity
* Price

#### 🚚 Delivery Information

Displays relevant delivery details, including:

* Delivery address
* Estimated delivery date
* Delivery status

#### 📱 Responsive Design

The interface is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

Tailwind CSS responsive utilities are used to adapt the layout to different screen sizes.

### 📂 Project Structure

```text
order-tracking/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DeliveryInfo.jsx
│   │   ├── DeliveryTimeline.jsx
│   │   ├── Modal.jsx
│   │   ├── OrderHeader.jsx
│   │   ├── ProductSummary.jsx
│   │   ├── StatePanel.jsx
│   │   ├── StatusBadge.jsx
│   │   └── SupportActions.jsx
│   ├── data/
│   │   └── orders.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> **Note:** Component names may vary depending on the final implementation.

### ⚙️ Installation & Setup

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/jumana-rahman/Order-Tracking-Screen.git
```

#### 2️⃣ Navigate to the project directory

```bash
cd order-tracking
```

#### 3️⃣ Install dependencies

```bash
npm install
```

#### 4️⃣ Start the development server

```bash
npm run dev
```

The application will usually be available at:

```text
http://localhost:5173
```

### 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### 📊 Data Handling

The order information is currently handled using **static/local data**.

Example:

```javascript
const order = {
  orderNumber: "ORD-2026-001",
  status: "Out for Delivery",
  estimatedDelivery: "September 28, 2026",
  items: [
    {
      name: "Product Name",
      quantity: 1,
      price: 1200
    }
  ]
};
```

This keeps the assessment focused on the frontend interface and user experience.

### 🎨 Design Approach

The UI focuses on:

* ✨ Clean and modern design
* 📐 Clear visual hierarchy
* 📍 Easy-to-understand order progress
* 📱 Responsive layouts
* 🧩 Reusable React components
* 🎯 Consistent spacing and typography
* 🧹 Clean and maintainable code

The tracking timeline uses different visual states for:

* ✅ Completed steps
* 🔵 Current step
* ⚪ Upcoming steps

### ♿ Accessibility

Basic accessibility practices are followed, including:

* Semantic HTML elements
* Descriptive text for important information
* Readable typography
* Clear interactive elements
* Responsive layouts
* Appropriate visual contrast

### 🧪 Testing Checklist

Before submission, verify:

* [ ] Application starts successfully with `npm run dev`
* [ ] Production build works with `npm run build`
* [ ] Order information displays correctly
* [ ] Current order status is clearly visible
* [ ] Tracking timeline works correctly
* [ ] Product information is displayed
* [ ] Delivery information is displayed
* [ ] Layout works on mobile
* [ ] Layout works on desktop
* [ ] No console errors are present
* [ ] All images and assets load correctly

### 🌐 Deployment

The project can be deployed using platforms such as:

* ▲ **Vercel**
* 🌐 **Netlify**

For Vercel, the typical build configuration is:

```text
Build Command: npm run build
Output Directory: dist
```

### 📝 Assessment Notes

This project was developed as part of a **frontend development assessment**.

The implementation focuses on:

* ⚛️ React component-based development
* 🎨 Responsive UI design
* 📦 Clean project structure
* 🧩 Reusable components
* 📱 Mobile-friendly experience
* 🎯 Accurate implementation of the provided requirements
