# 🧑‍💻 DevTinder

A modern developer networking platform built with React, Redux, and Tailwind CSS. Connect with fellow developers, swipe through profiles, and build your professional network!

## ✨ Features

- **User Authentication** - Secure login and signup with JWT
- **Profile Management** - Create and edit your developer profile
- **Smart Feed** - Swipe through developer profiles
- **Connection Requests** - Send and receive connection requests
- **Real-time Connections** - View and manage your network
- **Modern UI** - Sleek design with Tinder-inspired color palette

## 🎨 Color Palette

- Primary: `#fe3c72` - Vibrant Pink
- Secondary: `#fd5564` - Coral
- Accent: `#ef4a75` - Rose Pink
- Dark: `#424242` - Charcoal Gray
- White: `#ffffff`

## 🚀 Tech Stack

- **Frontend**: React 19, Redux Toolkit
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **HTTP Client**: Axios
- **Build Tool**: Vite 6

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd devTinder

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
devTinder/
├── src/
│   ├── components/      # React components
│   ├── screens/         # Screen layouts
│   ├── utils/           # Redux slices & constants
│   ├── assets/          # Images and icons
│   ├── App.jsx          # Main app component
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🔑 Key Components

- **Feed** - Browse developer profiles
- **FeedCard** - Individual profile card with swipe actions
- **Connections** - View your network
- **Requests** - Manage connection requests
- **Profile** - View and edit your profile
- **Navbar** - Navigation bar with user menu

## 🌐 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_backend_api_url
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by developers, for developers.
