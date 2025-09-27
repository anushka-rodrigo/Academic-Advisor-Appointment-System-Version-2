# Academic Advisor Appointment System - Frontend

A modern React-based frontend application for the Academic Advisor Appointment System. This application provides an intuitive interface for students and advisors to manage appointments efficiently.

## 🚀 Features

- **Student Portal**: Browse advisors, book appointments, manage bookings
- **Advisor Portal**: Manage availability, view appointments, handle student requests
- **Authentication**: Secure login/registration with JWT tokens
- **Real-time Updates**: Live appointment scheduling and management
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Modern UI/UX**: Clean, professional design with smooth interactions

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **JWT Decode** - Token management
- **Date-fns** - Date manipulation utilities

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see backend README for setup)
- **MongoDB** database connection

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install  
**if get eror run ,
npm install --legacy-peer-deps
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AdvisorCard.jsx
│   ├── Banner.jsx
│   ├── Featured.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   └── Navbar.jsx
├── pages/              # Page components
│   ├── About.jsx
│   ├── AdvisorBookings.jsx
│   ├── AdvisorLogin.jsx
│   ├── AllAdvisors.jsx
│   ├── Appointment.jsx
│   ├── HomePage.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── StudentBookings.jsx
├── context/            # React Context for state management
│   └── AppContext.jsx
├── authorize/          # Route protection
│   └── ProtectedRoute.jsx
├── assets/             # Static assets (images, icons)
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 API Integration

The frontend communicates with the backend API through the following endpoints:

- **Authentication**: `/api/v1/auth`
- **Student Management**: `/api/v1/student`
- **Advisor Management**: `/api/v1/advisor`

Make sure the backend server is running on the configured port (default: 5000) before starting the frontend.

## 🎨 Styling

This project uses **Tailwind CSS** for styling. The design system includes:

- Responsive grid layouts
- Custom color schemes
- Consistent typography
- Interactive components
- Mobile-first approach

## 🔐 Authentication Flow

1. **Registration/Login**: Users authenticate through the backend API
2. **Token Management**: JWT tokens are stored and managed securely
3. **Route Protection**: Protected routes require authentication
4. **Session Management**: Automatic token refresh and logout

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

Create a `.env.local` file in the frontend directory if you need to customize:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Academic Advisor System
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**: Vite will automatically use the next available port
2. **API Connection Issues**: Ensure the backend server is running
3. **Build Errors**: Clear node_modules and reinstall dependencies
4. **Authentication Issues**: Check JWT token configuration

### Getting Help

- Check the browser console for error messages
- Verify backend API endpoints are accessible
- Ensure all environment variables are properly configured

## 📄 License

This project is part of the Academic Advisor Appointment System developed for educational purposes.

---

**Note**: This frontend application requires the backend API to be running for full functionality. Please refer to the backend README for API setup instructions.