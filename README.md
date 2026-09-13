# UXI TECH 2.0 — Production Digital Studio Platform

A complete redesign of the official **UXI TECH** website (`uxitech.in`) engineered as a distinctive, premium, futuristic digital studio experience.

The website strictly follows the **100% light canvas visual requirement** (warm off-white `#FFFDF9`, soft warm `#FFF8F3`, primary text `#171717`, secondary `#6F6F6F`, accent UXI orange `#FF8A3D` and coral `#FF5B5B`). It features the signature **3D UXI FLOW** sculpture, interactive ecosystem, multi-step project intake, and full MongoDB Atlas database integration.

---

## 🎨 Visual Identity & Principles

- **Pure Light Canvas**: NO dark mode, NO black hero, NO cyberpunk/neon palettes. The futuristic feeling comes from expressive geometric typography, whitespace, subtle depth, smooth motion, and reactive UX.
- **Color Palette**:
  - Pure White: `#FFFFFF`
  - Warm Off-White: `#FFFDF9`
  - Soft Warm Background: `#FFF8F3`
  - Light Neutral: `#F5F5F3`
  - Soft Surface: `#FAFAF8`
  - Primary Typography: `#171717`
  - Secondary Copy: `#6F6F6F`
  - UXI Signature Orange: `#FF8A3D`
  - UXI Signature Coral: `#FF5B5B`
- **Signature 3D Sculpture — "UXI FLOW"**:
  - Custom fluid glass technological sculpture inspired by $U \rightarrow X \rightarrow I$.
  - Translucent physical glass material (`transmission: 0.92`, `roughness: 0.14`), internal warm orange refraction, gentle inertia pointer tracking.
  - Zero-lag graceful CSS vector fallback for devices without WebGL.
- **Preloader**:
  - Rapid 1.1s loading transition: $U \quad X \quad I \rightarrow UXI$ with subtle pulse and smooth lift.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI & Language**: React 18, TypeScript, Tailwind CSS
- **Motion & Smooth Scroll**: Framer Motion, Lenis Smooth Scroll
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Database**: MongoDB Atlas via Mongoose with global connection caching
- **Iconography**: Lucide React

---

## 📂 Site Architecture & Routes

| Route | Description |
| :--- | :--- |
| `/` | **Home**: Hero, Statement, Interactive Ecosystem, 9 Services, Storytelling ("From Idea to Reality"), AI Automation Simulator, Branding Construction, Growth Funnel, Academic Prototype, Case Studies, UXI Lab, Why UXI, 6-Phase Process, Founder (Pavan Vedesh), Testimonials, Final CTA. |
| `/work` | **Work Catalog**: Asymmetric showcase of authentic client systems. |
| `/work/[slug]` | **Case Studies**: Deep dives for `WASSHOT`, `Bhuvika Studio`, and `FLIXIOS` (Challenge, Idea, Build, Result, Next Project). |
| `/services` | **Services Overview**: All 9 official offerings grouped across 6 categories (Build, Intelligence, Systems, Identity, Growth, Education). |
| `/services/[slug]` | **Service Deep-Dive**: Solves vs. Builds, full capability matrix, 4-phase execution roadmap. |
| `/lab` | **UXI Lab**: Emerging technologies, active research, and experiments. |
| `/lab/[slug]` | **Lab Experiment Protocol**: Technical specifications and interactive sandboxes. |
| `/about` | **About Studio**: Philosophy, convictions, and founder note from Pavan Vedesh. |
| `/contact` | **Project Intake Wizard**: 6-step interactive project builder directly saving to MongoDB. |
| `/admin` | **Studio Command Center**: Passcode-protected console for reviewing incoming project enquiries in MongoDB. |
| `/api/enquiry` | **Enquiry API**: Validates and stores submissions in MongoDB with duplicate protection. |
| `/api/projects` | **Projects API**: RESTful endpoint returning case studies. |
| `/api/services` | **Services API**: RESTful endpoint returning services. |
| `/api/lab` | **Lab API**: RESTful endpoint returning lab experiments. |

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ (verified on Node v24.12.0)
- npm 9+

### 2. Environment Configuration
Create a `.env.local` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://uxitechin_db_user:BDK4yjpxdPLKOYAv@cluster0.lhsx2kq.mongodb.net/uxitech?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=uxitech
NEXT_PUBLIC_SITE_URL=https://uxitech.in
```

### 3. Seed Database
Populate services, projects, and lab experiments in MongoDB:
```bash
npm run seed
```

### 4. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔒 Admin Access
To review incoming client inquiries, navigate to `/admin` and enter the studio access code:
```text
uxi2026
```

---

## © License & Brand
© UXI TECH. Built with curiosity.
Founder: Pavan Vedesh.
Positioning: *Digital Solutions for Modern Businesses.*
