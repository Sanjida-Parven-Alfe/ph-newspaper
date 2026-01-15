# 📰 PH Newspaper

**PH Newspaper** is a modern, full-stack news portal built with **Next.js 15 (App Router)** and **MongoDB**. It features a dynamic data-driven interface, interactive map integration for district-wise news, and advanced filtering capabilities without complex state management.

🔗 **Live Link:** [Insert Your Vercel Live Link Here]

---

## 🚀 Features

### 🌍 Interactive Map Interface ("Sara Desh")
- A fully interactive map of Bangladesh using **Leaflet.js**.
- Users can click on any district to view specific news and statistics.
- Visual markers and "FlyTo" animations for better user experience.

### 📰 Dynamic News & Categories
- **Breaking News Ticker:** Real-time scrolling ticker for urgent updates.
- **Featured Slider:** Highlights top stories.
- **Category Filtering:** Dynamic routing for categories (Tech, Sports, Politics, etc.).
- **Pagination & Sorting:** Server-side pagination and sorting (by Date or Popularity) using URL `searchParams`.

### ⚡ Technical Highlights
- **Server-Side Rendering (SSR):** Optimized for SEO and fast initial load.
- **Dynamic SEO:** `generateMetadata` implemented for social media previews (Open Graph).
- **View Count System:** Auto-incrementing popularity counter on news read.
- **Dark Mode:** Fully responsive dark/light theme toggle.
- **Data Visualization:** Recharts integration for district-wise news statistics.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB (Mongoose)
- **Styling:** Tailwind CSS, DaisyUI
- **Map Library:** React Leaflet
- **Charts:** Recharts
- **Icons:** React Icons
- **Theme:** next-themes

---

## ⚙️ Installation & Run Locally

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ph-newspaper.git](https://github.com/your-username/ph-newspaper.git)
   cd ph-newspaper

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up Environment Variables: Create a .env.local file in the root directory and add the following:**
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. **Run the development server:**
   ```bash
   npm run dev

5. **Open your browser: Visit http://localhost:3000 to see the application.**

