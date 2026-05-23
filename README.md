# Fizban's Wands

> "In the realm of magic, even the smallest wand can be the most powerful." - Fizban

Welcome to Fizban's Wands, an enchanting storefront for magical wands from the Dragonlance world. This interactive collection allows you to browse, explore, and purchase wands with unique properties and alignments.

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/ai-storefront-qwen3/` in your browser to start your magical journey.

## Live Demo

Experience the full functionality at: https://cindy-pi.github.io/ai-storefront-qwen3/

## About the Shop

Fizban's Wands is a premier magical shop offering wands from the rich world of Dragonlance. Each wand is crafted with care by master wandmakers and imbued with unique magical properties that align with different moral paths in the realm.

The collection features over 36 wands across three distinct alignments:
- **Good-aligned wands**: Embrace the path of virtue and protection
- **Neutral-aligned wands**: Offer balanced, versatile magical capabilities
- **Evil-aligned wands**: Embrace powerful, often dangerous magical forces

## Seed Data

The wands collection is populated with comprehensive data in `src/data/wands.js`:

Each wand contains:
- `id`: Unique identifier
- `name`: Wand name
- `alignment`: One of 'good', 'neutral', or 'evil'
- `price`: Cost in Gold Pieces (GP)
- `image`: Image identifier
- `description`: Magical properties
- `woodType`: Wood composition
- `core`: Magical core material
- `length`: Wand length in inches
- `flexibility`: Flexibility rating
- `history`: Historical background
- `properties`: Specific magical abilities
- `rarity`: One of 'common', 'uncommon', 'rare', 'very-rare', or 'legendary'

## Customer Credits

All customers begin with a starting balance of 1,000 Gold Pieces (GP) stored in localStorage under the key `fizbans-wands-credits`.

The balance is automatically deducted when wands are purchased. The system checks if a customer has sufficient funds before completing any purchase.

## Checkout

The checkout process:
1. Browse the wand catalog
2. Select desired wands and quantities
3. Add to cart
4. Proceed to checkout
5. System checks credit balance and completes purchase if sufficient funds
6. Balance is deducted from customer's account

## Simulated Email Receipt

The order confirmation page mimics a magical email receipt. This is a simulation since GitHub Pages is a static site without backend functionality. In a real system, this would be replaced with actual email delivery.

## Deploying to GitHub Pages

To deploy to GitHub Pages, this repository uses the `build` script in `package.json`:

```bash
npm run build
```

This command compiles the application to a `dist/` directory that is automatically served by GitHub Pages. The workflow is configured through `.github/workflows/deploy.yml`.

## GitHub Repository Settings

In Settings → Pages, set Source to GitHub Actions (not a branch)

## Technical Notes

This application is built with:
- React.js
- Vite
- CSS for all visual effects
- Responsive design using CSS Grid and Flexbox
- LocalStorage for persistent customer data
- Fantasy-themed UI with responsive design