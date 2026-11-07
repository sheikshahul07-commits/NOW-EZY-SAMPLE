# BachelorsNest 🏡⚡

A specialized, verified housing and flatmate-finding platform tailored specifically for bachelors, students, and young working professionals. Designed to eliminate the **"No Bachelors Allowed"** barrier, arbitrary curfews, hidden brokerages, and roommate friction.

---

## 🌟 Key Features

1. **100% Bachelor-Friendly Verified Listings**
   * Pre-vetted properties where landlords explicitly welcome bachelors.
   * Zero brokerage and direct owner communication.

2. **The "Official Bachelor Policy Card"**
   * Upfront transparent house rules on every property:
     - 🌙 **Curfew:** No Curfew / Flexible / Fixed
     - 👥 **Overnight Guests:** Allowed Anytime / With Prior Notice
     - 👫 **Opposite-Gender Visitors:** Allowed / Daytime Only
     - 🍗 **Food Policy:** Non-Veg Allowed & Cooking OK / Veg Only
     - 🍻 **Smoking & Drinks:** Balcony Only / Inside Permitted
     - 🔒 **Security Deposit:** Capped at 2 months max

3. **Algorithmic Roommate Compatibility Matcher**
   * Live lifestyle persona customizer (Sleep cycle, Diet, WFH routine, Cleanliness scale 1-5, Party vibe).
   * Instant recalculation of match percentage (e.g. 96% Match, 88% Match).
   * Highlights specific reasons why two bachelors match and flags potential habit clashes.

4. **Landlord & Master-Tenant Listing Wizard**
   * 4-step listing modal with the **Bachelor Friendly Pledge**.
   * Instant addition into the live properties feed.

5. **Direct Connect & Inquiry Manager**
   * Verified bachelor tenant profile previews (occupation, company/college, LinkedIn).
   * Scheduled visits and instant direct contact drawer.

---

## 🚀 Running the Project Locally

```bash
# Navigate to the project directory
cd "D:\All Codes\bachelors-nest"

# Run development server (starts on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🗄️ Project Structure

```
D:\All Codes\bachelors-nest\
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout & SEO metadata
│   │   ├── page.tsx           # Main homepage with reactive state
│   │   └── globals.css        # Tailwind CSS styles
│   ├── components/
│   │   ├── Navbar.tsx              # Top navigation, city switcher & tabs
│   │   ├── HeroSection.tsx         # Bachelor-centric hero & search
│   │   ├── FilterBar.tsx           # Bachelor policy filter badges
│   │   ├── PropertyCard.tsx        # Listing cards with rule chips
│   │   ├── PropertyDetailModal.tsx # In-depth view & Bachelor Policy Card
│   │   ├── BachelorRuleBadge.tsx   # Policy matrix component
│   │   ├── FlatmateMatcher.tsx     # Interactive compatibility engine
│   │   ├── ListPropertyModal.tsx   # Landlord listing flow
│   │   ├── InquiryModal.tsx        # Schedule visit / Direct contact
│   │   └── InquiryListModal.tsx    # Saved homes & Inquiries drawer
│   ├── data/
│   │   └── mockData.ts        # Seed properties, flatmates, and cities
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces & types
│   └── utils/
│       └── compatibility.ts   # Roommate compatibility algorithm
├── package.json
└── tsconfig.json
```

---

## 🔌 Supabase / PostgreSQL Integration Guide

To connect a persistent Supabase database:
1. Create a free project on [Supabase.com](https://supabase.com).
2. Install the client: `npm install @supabase/supabase-js`.
3. Add your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the schema migrations from `bachelor_platform_architecture.md`.
