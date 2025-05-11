# Project Exit Velocity Blog

This is a blog site I'm making which will follow my learning of VR development and creation of my first full VR game.

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript 4.9.5** - Type-safe JavaScript
- **React Router 6** - Client-side routing
- **SASS** - CSS preprocessor
- **i18next** - Internationalization framework
- **React Quill** - Rich text editor
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript 5.8.3** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Project Structure

The project follows a client-server architecture:

- **client/** - React frontend application
- **server/** - Express backend API

## TypeScript Conversion

This project has been converted from JavaScript to TypeScript to improve code quality, maintainability, and developer experience. Key aspects of the TypeScript implementation include:

### Frontend TypeScript Configuration
- React Scripts 5.0.1 compatibility with TypeScript 4.9.5
- Standard tsconfig.json with React-specific settings
- Type definitions for all dependencies
- Custom type definitions in src/types/

### Backend TypeScript Configuration
- Node.js with Express using TypeScript 5.8.3
- CommonJS module system
- Compiled output to ./dist directory
- TypeScript definitions for all dependencies

## Deployment Configuration

The project is configured for deployment on Vercel with the following optimizations:

### Vercel Configuration
- Root-level vercel.json for project-wide settings
- Client-specific vercel.json for frontend build settings
- Environment variables for CI and ESLint configuration
- Custom build and install commands with legacy peer dependencies support

### Build Process
- Custom build:deploy script that handles dependency installation and build
- ESLint warnings downgraded from errors to prevent build failures
- CI=false flag to prevent treating warnings as errors
- DISABLE_ESLINT_PLUGIN=true to bypass ESLint checks during build

## Development Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Terafora/project-exit-velocity-blog.git
cd project-exit-velocity-blog
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install --legacy-peer-deps
```

3. Set up environment variables:
- Create a `.env` file in the server directory with your MongoDB connection string and JWT secret
- Create a `.env.development` file in the client directory if needed

4. Start development servers:
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd ../client
npm start
```

## Production Build

```bash
# Build backend
cd server
npm run build

# Build frontend
cd ../client
npm run build:deploy
```

## Notes on TypeScript Compatibility

- The frontend uses TypeScript 4.9.5 for compatibility with React Scripts 5.0.1
- The backend uses TypeScript 5.8.3 for the latest features and improvements
- ESLint is configured to warn rather than error for certain TypeScript rules
- The .npmrc file sets legacy-peer-deps=true to handle dependency conflicts
