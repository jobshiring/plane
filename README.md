# React Flights UI

A comprehensive flight booking platform built with Next.js, designed for flight agencies to enhance their services. This application provides a modern, responsive interface for flight searches, bookings, and management

## 🚀 Features

### User Features

- **Flight Search & Booking**: One-way and round-trip flight searches
- **User Authentication**: Secure login and registration
- **Dashboard**: Personal booking management
- **Hotel Integration**: Hotel search and booking capabilities
- **Payment Processing**: Multiple payment gateway support
- **Reviews & Ratings**: User reviews and testimonials
- **Newsletter Subscription**: Stay updated with travel deals
- **Multi-language Support**: Internationalization ready
- **Responsive Design**: Mobile-first approach with Material-UI

### Admin Features

- **Admin Dashboard**: Comprehensive admin panel
- **Booking Management**: View and manage all bookings
- **User Management**: Administer user accounts
- **Content Management**: Manage blogs, reviews, and static content
- **Analytics**: Dashboard metrics and insights
- **Markup Management**: Control pricing and markups
- **Partner Management**: Manage featured partners

### Technical Features

- **Next.js 16**: Latest Next.js with App Router
- **Material-UI (MUI)**: Modern component library
- **Redux Toolkit**: State management
- **React Query**: Data fetching and caching
- **Leaflet Maps**: Interactive maps for locations
- **PDF Generation**: Booking confirmations and reports
- **QR Code Generation**: Digital tickets
- **Date Picker**: Advanced date selection
- **Phone Input**: International phone number input
- **File Upload**: Drag-and-drop file uploads

## 🛠️ Tech Stack

- **Frontend**: Next.js, React 19, Material-UI
- **State Management**: Redux Toolkit, React Query
- **Styling**: Emotion (CSS-in-JS)
- **Maps**: Leaflet, React Leaflet
- **Charts**: ApexCharts
- **Forms**: Formik
- **Date Handling**: date-fns, dayjs
- **Icons**: React Icons
- **Progress**: NProgress
- **PDF**: jsPDF, html2canvas
- **QR Codes**: react-qr-code
- **Carousels**: Embla Carousel

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/reactflights-ui.git
   cd reactflights-ui
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
   NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=your_gtm_id
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npmp dev` - Start development server with Turbopack
- `npmp build` - Build for production
- `npmp start` - Start production server
- `npmp prod` - Build and start production server
- `npmp lint` -Run ESLint
- `npmp lint:fix` -Run ESLint with auto-fix
- `npmp format` - Format code with Prettier
- `npmp format:check` - Check code formatting

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (user)/            # User-facing pages
│   ├── admin/             # Admin panel pages
│   ├── layout.js          # Root layout
│   └── not-found.js       # 404 page
├── components/            # Reusable components
│   ├── _main/            # Main page components
│   ├── _admin/           # Admin components
│   ├── cards/            # Card components
│   ├── forms/            # Form components
│   └── ...
├── _mock/                # Mock data for development
├── guards/               # Route protection guards
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── providers/            # Context providers
├── redux/                # Redux store and slices
├── routes/               # Route definitions
├── static/               # Static data files
├── theme/                # Material-UI theme configuration
└── utils/                # Utility functions
```

## 🔧 Configuration

### ESLint & Prettier

The project includes comprehensive linting and formatting setup:

- ESLint with Next.js, React Hooks, and accessibility rules
- Prettier for consistent code formatting
- Pre-commit hooks (can be added with Husky)

### Theme Customization

Material-UI theme is configured in `src/theme/`:

- Colors, typography, and component overrides
- Responsive breakpoints
- Custom shadows and shapes

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

Build command: `npmp build`
Start command: `npmp start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@reactflights.com or join our Discord community.

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Next.js team for the amazing framework
- All contributors and the open-source community

---

Built with ❤️ using Next.js and Material-UI
