# Fizban's Wands

> "A wand is a magic tool, but one that must be chosen carefully by the wielder. The wand chooses the wizard, for the most part, but sometimes the wizard chooses the wand." \
> — Fizban the Fabulous

Welcome to Fizban's Wands, an immersive storefront for the finest magical wands in the realm of Dragonlance. This project brings the world of Dungeons & Dragons magic to life with a modern, responsive UI that captures the essence of a fantasy boutique.

## Live Demo

https://cindy-pi.github.io/ai-storefront-qwen3/

## About the Shop

Fizban's Wands is your premier destination for enchanted wands from around the world of Faerûn. We specialize in rare and powerful magical artifacts, each with its own unique properties and history. Whether you're a seasoned adventurer or a newcomer to the world of magic, our collection offers wands to suit every need and alignment.

## Seed Data

The shop's catalog is populated with 36+ magical wands featuring:
- **Three alignments**: Good, Neutral, and Evil
- **Five rarities**: Common, Uncommon, Rare, Very Rare, and Legendary
- **Comprehensive wand details**: Name, description, alignment, rarity, and price

All data is stored locally in `src/data/wands.js` and loaded into the application for immediate browsing.

## Customer Credits

Each visitor begins with a starting balance of 1,000 GP (Gold Pieces) stored in localStorage. When making purchases:
- The cost is deducted from the customer's balance
- A message displays the updated balance
- Purchases are simulated without backend functionality

## Checkout

The checkout process is intentionally simulated:
1. Select a wand from the catalog
2. Add to cart
3. Proceed through the checkout flow
4. Simulate a purchase confirmation screen
5. Balance is automatically updated

## Simulated Email Receipt

The order confirmation page includes a magical delivery receipt that mimics an email receipt. In a real application, this would be sent via email through a backend service. Since this is a static site hosted on GitHub Pages, we simulate the receipt experience with:
- A scroll-like receipt styling
- Star/sparkle emoji patterns
- Golden borders and text
- Simulated delivery details

## Deploying to GitHub Pages

This project is configured to deploy seamlessly to GitHub Pages:

1. Create a new branch 
2. Build the project using `npm run build`
3. The `dist/` directory contains all necessary files
4. In GitHub repository settings, set GitHub Pages to use the branch or GitHub Actions

## GitHub Repository Settings

When configuring GitHub Pages:
- In Settings → Pages, set Source to GitHub Actions (not a branch)
- This ensures automatic deployment on pushes to the main branch

## Running Locally

To run this project locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the application**:
   Visit `http://localhost:5173/ai-storefront-qwen3/`

## Project Structure

This project is built with:
- React and React Router
- Vite for build tooling
- CSS with custom properties for theming
- Responsive design for all device sizes

## Visual Design

The UI features:
- Fantasy-themed color palette with dark backgrounds and gold accents
- Custom typography using Google Fonts (Cinzel for headings, Playfair Display for body)
- Responsive layout that adapts from mobile to desktop
- Magical effects like subtle hover animations and gradient backgrounds
- Rune-style alignment filters and rarity badges

## Browser Compatibility

This application is designed to work best on modern browsers. It uses:
- CSS Grid and Flexbox for layouts
- CSS variables for theming
- ES6+ JavaScript syntax

## License

This project is a demonstration for educational purposes and is not licensed for commercial use.