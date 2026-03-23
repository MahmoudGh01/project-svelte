# Harry Potter Wiki - Svelte

A Svelte-based web application that displays information about Harry Potter characters. This is a clone of the Next.js Harry Potter Wiki, rebuilt using Svelte, Vite, and TypeScript.

## Features

- **Character Display**: Shows 12 Harry Potter characters with their details
- **House-Based Theming**: Dynamic color schemes based on Hogwarts houses (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- **Responsive Design**: Mobile-first responsive grid layout
- **Dark Mode**: Automatic dark mode based on system preference
- **Loading States**: Skeleton loading animation while fetching data
- **Error Handling**: User-friendly error messages with retry functionality
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Svelte 5**: Modern reactive framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **Vitest**: Testing framework
- **Potter API**: External API for character data

## Project Structure

```
src/
├── lib/
│   └── components/
│       ├── CharacterCard.svelte    # Individual character card component
│       └── CharacterGrid.svelte    # Grid container with data fetching
├── types/
│   └── character.ts                # TypeScript type definitions
├── tests/
│   └── setup.ts                    # Vitest setup
├── App.svelte                      # Root component
├── app.css                         # Global styles with Tailwind
└── main.ts                         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

## Components

### CharacterCard

Displays individual character information in a themed card with:

- Character image
- Full name
- Hogwarts house
- Actor name (if available)
- Birthdate
- House-specific color theming

### CharacterGrid

Container component that:

- Fetches character data from the Potter API
- Manages loading and error states
- Displays characters in a responsive grid
- Limits display to first 12 characters

## API

This project uses the [Potter API by Fede Perin](https://potterapi-fedeperin.vercel.app):

- **Endpoint**: `https://potterapi-fedeperin.vercel.app/en/characters`
- **Method**: GET
- **Response**: Array of Character objects

## Styling

The project uses Tailwind CSS with:

- Utility-first approach
- Custom CSS variables for theme colors
- Responsive breakpoints (md, lg, xl)
- Dark mode variants
- House-specific color schemes

## Development

The application uses Svelte 5's new features:

- `$state` for reactive state
- `$derived` for computed values
- `$props` for component props
- Modern runes syntax

## Testing

Testing setup with Vitest and Testing Library:

- Component testing support
- JSDOM environment
- Jest DOM matchers

## Building

The project builds to static files using Vite:

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Deployment

Can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Differences from Next.js Version

- Simpler state management (Svelte's built-in reactivity vs React hooks)
- No separate image optimization (standard img tags)
- Single-page application (no routing)
- Smaller bundle size
- Uses Tailwind CSS v3 (v4 in original)

## License

MIT

## Credits

- Character data from [Potter API](https://potterapi-fedeperin.vercel.app)
- Original Next.js implementation inspiration
