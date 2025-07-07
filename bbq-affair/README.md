# BBQ Affair - Premium BBQ Catering Platform

A modern, full-stack catering management system built with Next.js, Supabase, and Stripe. Perfect for BBQ catering businesses looking to streamline their operations and provide a seamless customer experience.

## 🔥 Features

### Customer Experience
- **Menu Showcase** - Browse categorized BBQ items with rich descriptions and pricing
- **Event Booking** - Easy scheduling with date/time picker and guest count
- **Dual Payment Options** - Stripe integration + PayNow QR for Singapore market
- **WhatsApp Integration** - One-click customer support
- **Gallery & Reviews** - Visual testimonials and past event showcases
- **Order Tracking** - Real-time status updates and confirmations

### Admin Dashboard
- **Order Management** - View, filter, and update order statuses
- **Menu Management** - Add/edit items, categories, and pricing
- **Customer Database** - Centralized customer information
- **Staff Scheduling** - Assign chefs and crew to events
- **Analytics** - Sales reports, popular items, and export functionality
- **Secure Authentication** - Supabase Auth with role-based access

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 15 + React | Server-side rendering, routing |
| **UI Framework** | Tailwind CSS + ShadCN | Responsive design, component library |
| **Backend** | Supabase | PostgreSQL database, authentication, storage |
| **Payments** | Stripe API | International card payments |
| **Local Payment** | PayNow QR | Singapore-specific payment method |
| **Deployment** | Vercel | Automatic deployments |
| **Language** | TypeScript | Type safety and better DX |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

### 1. Clone and Install
```bash
git clone <repository-url>
cd bbq-affair
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
WHATSAPP_PHONE_NUMBER=+6512345678
```

### 3. Database Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
3. Configure Row Level Security policies
4. Set up Storage buckets for images

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
bbq-affair/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── admin/             # Admin dashboard routes
│   │   ├── auth/              # Authentication pages
│   │   └── api/               # API endpoints
│   ├── components/            # Reusable UI components
│   │   └── ui/                # ShadCN components
│   ├── context/               # React contexts (Auth)
│   ├── lib/                   # Utility libraries
│   ├── services/              # Data access layer
│   └── types/                 # TypeScript type definitions
├── supabase/
│   └── schema.sql             # Database schema
└── public/                    # Static assets
```

## 🗄️ Database Schema

The application uses a PostgreSQL database with the following main tables:

- **menu_categories** - BBQ food categories
- **menu_items** - Individual menu items with pricing
- **customers** - Customer information and contact details
- **orders** - Event bookings and order details
- **order_items** - Items within each order
- **reviews** - Customer feedback and ratings
- **gallery_images** - Portfolio images
- **staff_schedule** - Crew assignment to events

## 🔐 Authentication & Security

- **Supabase Auth** - Secure authentication with email/password
- **Row Level Security** - Database-level access control
- **Protected Routes** - Admin-only areas with middleware protection
- **Type Safety** - Full TypeScript coverage for better security

## 💳 Payment Integration

### Stripe Integration
- Credit/debit cards
- Apple Pay & Google Pay
- Webhook handling for payment confirmation
- Automatic invoice generation

### PayNow QR (Singapore)
- Local payment method
- QR code generation
- Receipt upload functionality
- Manual verification workflow

## 📊 Admin Features

### Dashboard Analytics
- Monthly sales totals
- Order status tracking
- Popular menu items
- Customer insights
- CSV export for bookkeeping

### Order Management
- Real-time order updates
- Status workflow (pending → confirmed → preparing → completed)
- Customer communication tools
- Payment status tracking

### Menu Management
- Dynamic menu editing
- Category organization
- Availability toggles
- Pricing updates
- Image management

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
```bash
npm run build
npm start
```

## 🔧 Configuration

### Supabase Setup
1. Create tables using the provided schema
2. Configure storage buckets for menu images
3. Set up authentication providers
4. Configure RLS policies

### Stripe Setup
1. Get API keys from Stripe dashboard
2. Configure webhook endpoints
3. Set up product catalogs (optional)
4. Test payment flows

## 📱 Features Roadmap

- [ ] Mobile app (React Native)
- [ ] SMS notifications
- [ ] Inventory management
- [ ] Multi-location support
- [ ] Advanced reporting
- [ ] Integration with POS systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For technical support or business inquiries:
- Email: support@bbqaffair.com
- WhatsApp: +65 1234 5678
- Documentation: [Link to detailed docs]

---

**Built with ❤️ for the BBQ community in Singapore**
