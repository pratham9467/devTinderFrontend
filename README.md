# 🧑💻 DevTinder

A modern developer networking platform with Tinder-like swipe functionality. Connect with fellow developers, discover new talent, and build your professional network!

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login/signup
- 👤 **Profile Management** - Create and edit developer profiles
- 📱 **Swipe Interface** - Tinder-like card swiping (mobile & desktop)
- 💌 **Connection System** - Send/receive connection requests
- 🌐 **Real-time Network** - View and manage connections
- 🎨 **Modern UI** - Apple liquid glass effects with responsive design
- 📊 **Interactive Forms** - Real-time validation and feedback

## 🎨 Design System

- **Primary**: `#fe3c72` (Vibrant Pink)
- **Secondary**: `#fd5564` (Coral)
- **Accent**: `#ef4a75` (Rose Pink)
- **Neutral**: `#424242` (Charcoal)
- **Glass Effects**: Backdrop blur with transparency
- **Responsive**: Mobile-first design

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite 6
- **State**: Redux Toolkit
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **HTTP**: Axios with proxy setup
- **Animations**: CSS transitions + transforms

## 📦 Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/devTinder.git
cd devTinder

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Scripts

```bash
npm run dev      # Development server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── FeedCard.jsx    # Swipeable profile cards
│   ├── Login.jsx       # Authentication
│   ├── SignUp.jsx      # Registration with validation
│   ├── Connections.jsx # Network management
│   └── ...
├── utils/              # Redux store & constants
│   ├── Store.js        # Redux configuration
│   ├── userSlice.js    # User state management
│   └── Constants.js    # API endpoints
├── assets/             # Images and icons
└── index.css          # Global styles + glass effects
```

## 🎯 Key Features

### Swipe Interface
- Drag left/right to pass/like profiles
- Visual feedback during swipe
- Mobile touch + desktop mouse support
- Smooth animations with rotation

### Glass Morphism UI
- Apple-inspired liquid glass effects
- Backdrop blur with transparency
- Hover animations and transitions
- Modern gradient buttons

### Responsive Design
- Mobile-first approach
- Flexible layouts (flex → block on mobile)
- Optimized touch targets
- Adaptive spacing and typography

## 🔧 Configuration

### Proxy Setup (vite.config.js)
```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### API Configuration
```js
// src/utils/Constants.js
export const BASE_URL = "/api"; // Uses proxy in development
```

## 🚀 Deployment

1. **Build**: `npm run build`
2. **Deploy**: Upload `dist/` folder to hosting service
3. **Environment**: Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

**Built with ❤️ for the developer community**