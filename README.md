# 📸 Picsum Image Gallery

An interactive and **responsive image gallery** featuring **infinite scrolling, modal previews, error handling, and image downloads** using the **Picsum Photos API**.

This project is built with **Next.js, React, TypeScript, and shadcn**, ensuring a modern, efficient, and scalable experience.

---

## 🚀 Features Implemented

### ✅ **Core Features**
- **Infinite Scroll Loading** – Loads more images as you scroll.
- **Modal View on Click** – Enlarges images and displays details.
- **Responsive Grid Layout**:
  - 🖥️ **Desktop**: 3 columns
  - 📱 **Tablet**: 2 columns
  - 📱 **Mobile**: 1 column
- **Loading States & Animations** – Smooth transitions and indicators.
- **Error Handling** – Gracefully handles network and API failures.

### 🌐 **API Integration**
- Uses **Picsum Photos API** (No API key required).
- Fetches **9 images per request** for infinite scrolling.

### 🖼️ **Modal View**
- Displays **large image preview** with:
  - 📌 **Author name**
  - 📏 **Image dimensions**
- **Closes when** clicking overlay, ESC key, or close button.
- **Smooth animations** for better user experience.

### ⚠️ **Error Handling**
- Shows **error messages** when API fails.
- Handles cases like **no images, slow internet, and network errors**.

### 📥 **Image Download**
- Allows users to **download images** with a single click.

---

## 🛠️ Setup & Installation

### **1️⃣ Prerequisites**
Make sure you have:

- **Node.js** installed ([Download Here](https://nodejs.org/))
- **Git** installed ([Download Here](https://git-scm.com/))

### **2️⃣ Clone the Repository**
Open your terminal and run:

```bash
git clone https://github.com/Benzson92/infinite-scroll-image-gallery.git
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
