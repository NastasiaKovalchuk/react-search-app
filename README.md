# Rick and Morty Character Finder

A React application built for the RS School course that allows users to explore characters from the "Rick and Morty" universe using the official API. The project focuses on React class components, TypeScript, and robust error handling.

## 🚀 Deployment

**Live Demo:** [Link to your Netlify/Vercel/GitHub Pages deployment]

## 🛠 Tech Stack

- **React 19** (Class-based components)
- **TypeScript** (Strict type checking)
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **Rick and Morty API** (Data source)

## ✨ Key Features

- **Character Search**: Fetch and display character data based on user input.
- **Persistent State**: Search queries are saved to `localStorage` and restored upon page reload.
- **Loading States**: Visual feedback during API requests.
- **Graceful Error Handling**:
  - Handles API 404s and network failures.
  - Implements a **Global Error Boundary** to prevent application crashes.
- **Crash Test**: A dedicated "Execute Test Crash" button to verify Error Boundary functionality (Feature 9).

## 💻 Getting Started

1. **Clone the repository and switch to the task branch:**

   ```bash
   git clone git@github.com:NastasiaKovalchuk/react-search-app.git
   cd react-search-app
   git checkout class-component

   ```

2. Install dependencies:
   npm install

3. Run development server:
   npm run dev
