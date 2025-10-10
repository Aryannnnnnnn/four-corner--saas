# 🏡 Four Corner Properties - Vermont Real Estate SaaS Platform

A modern, full-stack real estate platform built with Next.js 15, React 19, and TypeScript. Features AI-powered property analysis, user-submitted listings, and comprehensive property management.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

---

## ✨ Features

### 🔍 **Property Analysis**
- AI-powered property insights using Zillow data
- ROI calculations and value projections
- Comparable properties analysis
- Interactive charts and visualizations
- PDF export functionality

### 🏠 **Property Listings**
- User-submitted property listings
- Multi-step submission wizard
- Image upload with automatic optimization (WebP conversion)
- AWS S3 + CloudFront CDN for fast image delivery
- Admin approval workflow with email notifications

### 👤 **User Management**
- Google OAuth authentication
- Email/password authentication with bcrypt
- User dashboard and profile management
- Property library for saved analyses
- Settings and preferences

### 🔐 **Admin Panel**
- Property listing approval/rejection
- Image management and reordering
- User management
- Dashboard with analytics

### 🛡️ **Security & Performance**
- Rate limiting with Upstash Redis
- Row-level security (Supabase)
- Image optimization and CDN delivery
- Error monitoring with Sentry
- Production-safe logging

---

## 🚀 Tech Stack

### **Frontend**
- **Framework:** Next.js 15.5.4 (App Router)
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS + Radix UI
- **Animations:** Framer Motion
- **State:** Zustand 5.0.8
- **Forms:** React Hook Form + Zod validation

### **Backend**
- **Database:** PostgreSQL (Supabase)
- **Authentication:** NextAuth.js 5.0 (beta)
- **File Storage:** AWS S3 + CloudFront CDN
- **Image Processing:** Sharp (WebP optimization)
- **Rate Limiting:** Upstash Redis
- **Email:** Nodemailer

### **DevOps & Monitoring**
- **Error Tracking:** Sentry
- **Linting:** Biome
- **Hosting:** Vercel (recommended)

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Supabase** account ([supabase.com](https://supabase.com))
- **AWS** account (for S3 storage)
- **Upstash** account (for Redis rate limiting)
- **Google OAuth** credentials (optional)

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/four-corner-properties.git
cd four-corner-properties
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in all required values. See [Environment Variables](#-environment-variables) section below.

### 4. Set up the database

Run the SQL schema in your Supabase project:

```sql
-- Create tables (see database/schema.sql)
-- Set up Row Level Security policies
-- Create indexes for performance
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AUTH_SECRET` | NextAuth secret key | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` or your domain |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | From Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | From Supabase dashboard |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | From AWS IAM |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | From AWS IAM |
| `AWS_S3_BUCKET_NAME` | S3 bucket name | `your-bucket-name` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | From Upstash console |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token | From Upstash console |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | - |
| `EMAIL_USER` | SMTP email address | - |
| `EMAIL_PASSWORD` | SMTP password/app password | - |
| `AWS_CLOUDFRONT_DOMAIN` | CloudFront distribution URL | S3 direct URL |
| `SENTRY_AUTH_TOKEN` | Sentry authentication token | - |

See `.env.example` for complete configuration.

---

## 📁 Project Structure

```
four-corner-properties/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Application routes
│   │   ├── analysis/        # Property analysis page
│   │   ├── library/         # Saved properties
│   │   ├── list-property/   # Submit property listing
│   │   ├── admin/           # Admin panel
│   │   └── ...
│   ├── api/                 # API routes
│   │   ├── analyze-property/ # Property analysis endpoint
│   │   ├── property-listings/ # Listings CRUD
│   │   ├── admin/           # Admin endpoints
│   │   └── ...
│   ├── lib/                 # Utilities and helpers
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── supabase/        # Supabase client
│   ├── error.tsx            # Error boundary
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── analysis/            # Analysis-specific components
│   ├── admin/               # Admin panel components
│   └── ...
├── lib/                     # Shared libraries
│   └── ratelimit.ts         # Rate limiting config
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🎯 Key Features Deep Dive

### Property Analysis

The property analysis feature integrates with an n8n workflow to fetch Zillow data and generate insights.

**Flow:**
1. User enters property address
2. Frontend calls `/api/analyze-property`
3. API forwards request to n8n webhook
4. n8n fetches Zillow data and generates analysis
5. Results stored in Supabase
6. User can export to PDF or save to library

### Image Upload & Optimization

Images are automatically optimized for web performance:

- **Format:** Converted to WebP
- **Sizes:** 3 thumbnails (200x150, 400x300, 800x600) + original
- **Storage:** AWS S3 with public-read ACL
- **Delivery:** CloudFront CDN for global performance
- **Validation:** File size (15MB max), type, and content validation

### Rate Limiting

API routes are protected with Upstash Redis rate limiting:

- **Analysis:** 10 requests per hour per IP
- **Listings:** 20 submissions per 24 hours per user
- **General API:** 100 requests per 15 minutes
- **Auth:** 5 attempts per 15 minutes

---

## 🧪 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run dev:turbo        # Start with Turbopack

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run Biome linter
npm run format           # Format code with Biome
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- AWS Amplify
- Netlify
- Railway
- Render
- Self-hosted with Docker

---

## 🔒 Security

### Best Practices Implemented

✅ Rate limiting on all critical endpoints
✅ CSRF protection via NextAuth
✅ Input validation with Zod schemas
✅ SQL injection prevention (Supabase)
✅ XSS protection (React escaping)
✅ Secure password hashing (bcrypt)
✅ Row-level security (RLS) in database
✅ Environment variable validation
✅ Error boundary for graceful failures

### Security Checklist

- [ ] Rotate `AUTH_SECRET` every 90 days
- [ ] Use different credentials for dev/staging/production
- [ ] Enable 2FA on AWS, Supabase, and Vercel accounts
- [ ] Review Supabase RLS policies regularly
- [ ] Monitor Sentry for security-related errors
- [ ] Keep dependencies updated (`npm audit`)

---

## 📊 Performance

### Optimizations

- **Images:** WebP conversion, multiple sizes, CDN delivery
- **Code Splitting:** Dynamic imports for heavy components
- **Caching:** CloudFront CDN, browser caching headers
- **Database:** Indexed queries, connection pooling
- **Bundle Size:** Tree shaking, minification

### Metrics (Production)

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 90+

---

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Environment Variables Not Loading:**
```bash
# Ensure .env is in project root
# Restart dev server after changes
```

**Supabase Connection Issues:**
```bash
# Check if URL and keys are correct
# Verify RLS policies allow access
```

**Image Upload Failures:**
```bash
# Verify AWS credentials
# Check S3 bucket permissions (public-read)
# Ensure bucket CORS is configured
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use Biome for linting/formatting
- Follow TypeScript strict mode
- Write meaningful commit messages
- Add JSDoc comments for complex functions

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing framework
- **Vercel** - Excellent hosting platform
- **Supabase** - PostgreSQL as a service
- **Radix UI** - Accessible component primitives
- **Community** - All the open-source contributors

---

## 📞 Support

- **Documentation:** [Your Docs URL]
- **Issues:** [GitHub Issues](https://github.com/yourusername/four-corner-properties/issues)
- **Email:** support@fourcornervt.com

---

## 🗺️ Roadmap

- [ ] Add unit and E2E tests
- [ ] Implement property comparison feature
- [ ] Add favorite/watchlist functionality
- [ ] Mobile app (React Native)
- [ ] Advanced search with filters
- [ ] Property alerts via email/SMS
- [ ] Integration with MLS data
- [ ] Multi-language support

---

**Made with ❤️ in Vermont**
