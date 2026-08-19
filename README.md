# Grocery Store Website

A simple, responsive grocery store website built with plain HTML, CSS, and JavaScript. Customers can browse products by category, add items to a cart, and view their order total — no frameworks or build tools required.

## Features

- **Home page** — hero banner and shop-by-category highlights
- **Products page** — browse available grocery items, backed by Firebase Firestore
- **Cart** — add items, view totals, remove items, and clear the cart (stored in browser `localStorage`)
- **About Us** and **Features** pages
- **Responsive layout** with a mobile navigation toggle

## Tech stack

- HTML5 / CSS3 / vanilla JavaScript
- [Firebase Firestore](https://firebase.google.com/docs/firestore) — cloud database for product listings, loaded via the Firebase CDN (no npm install needed)
- Browser `localStorage` — cart persistence

## Project structure

```
grocery-store-website/
├── Html/
│   ├── index1.html          # Home page
│   ├── product.html         # Products page (loads items from Firestore)
│   ├── cart.html            # Shopping cart
│   ├── features.html        # Features page
│   ├── about1.html          # About Us page
│   ├── firebase-config.js   # Firebase project config + initialization
│   └── products.js          # Seeds/loads product data from Firestore
├── CSS/
│   ├── style2.css
│   ├── product.css
│   ├── cart.css
│   ├── features.css
│   └── aboutus.css
├── JS/
│   └── script.js            # Cart logic, add-to-cart handling, mobile nav
├── Images/                  # Product and site images
└── README.md
```

## Setup

1. Clone the repo:
   ```
   git clone https://github.com/gauriagwan18/grocery-store-website.git
   ```
2. This project uses Firebase for product data. `Html/firebase-config.js` already contains the project's config — if you're setting up your own Firebase project instead, replace the values there with your own (Firebase Console → Project settings → your web app → Config).
3. Firestore is used in **test mode**, which allows open read/write access for a limited time. Update the security rules in the Firebase Console before that window expires, or before deploying publicly.
4. Serve the site with a local server (Firebase's CDN scripts require `http://`, not `file://`) — for example, VS Code's Live Server extension, or:
   ```
   npx serve Html
   ```
5. Open `product.html` in the browser. On first load it seeds the Firestore `products` collection automatically; on later loads it reads products directly from Firestore.

## Notes

- No build step or package manager is required — Firebase is loaded via CDN `<script>` tags directly in `product.html`.
- Product data lives in Firestore, so it can be edited directly from the Firebase Console without touching code.

## Credits

Created by Group 7.
