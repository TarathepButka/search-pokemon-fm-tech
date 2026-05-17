# Pokémon Search

A modern, high-performance Pokémon encyclopedia built with **Next.js 16 (Turbopack)**, **TypeScript**, and **Apollo Client**. This project features a clean, responsive UI with advanced search and filtering capabilities.

## 🚀 Features

- **Advanced Evolution Chain:** A custom-built algorithm that traverses both upward and downward to display the complete evolution family of any Pokémon.
- **Fast Search & Auto-suggestions:** Instant search bar with keyboard navigation and recent search history (stored locally).
- **Type Filtering:** Browse Pokémon by their elemental types with a smooth, responsive UI.
- **Server-Side Rendering (SSR):** Optimized initial page loads with data pre-fetching to eliminate flickering.
- **Responsive Design:** Fully adaptive layout for mobile, tablet, and desktop using Tailwind CSS 4.
- **Modern Tech Stack:** Utilizes Apollo Client for efficient GraphQL data management and Shadcn/ui for polished components.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching:** [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks & Apollo Cache

## 📦 Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd search-pokemon-fm-tech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (Pages, Layouts, Loading states)
├── components/        # Reusable UI components (shadcn/ui, Layout, Pokemon specific)
├── features/          # Feature-based logic (GraphQL queries, Apollo hooks, API)
├── lib/               # Utilities, type definitions, and helper functions
└── public/            # Static assets (images, icons)
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
