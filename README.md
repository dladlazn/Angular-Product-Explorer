# Angular Product Explorer

Product Explorer is a responsive Angular SPA for browsing products, applying catalog filters, viewing product details, managing favorites, and accessing a guarded admin feature.

## Implemented Features

- Standalone Angular bootstrapping and standalone components
- Lazy-loaded feature routes for Catalog, Product Details, Favorites, and Admin
- Catalog search, category filtering, sort options, and in-stock-only filtering
- Product details page with Pin-to-favorites behavior
- Favorites persistence with localStorage
- Guarded Admin route with diagnostics and maintenance actions
- Loading, empty, and error states using modern Angular template control flow

## Tech Stack

- Angular 21
- TypeScript (strict typing with explicit models)
- RxJS
- Angular Signals
- SCSS
- Vitest via `ng test`

## Run Locally

1. Open a terminal in the project app folder:

```bash
cd product-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run start
```

4. Open in browser:

```text
http://localhost:4200/
```

## Run Tests

Run all tests once:

```bash
npm test -- --watch=false
```

Test coverage included in this project:

- Unit tests for catalog facade business logic
- Unit tests for product details component behavior
- Functional integration test for catalog search and details navigation flow

## Admin Access Note

- `/admin` is protected by a route guard.
- If admin access is not enabled, navigation is redirected to `/catalog?denied=admin`.
- Admin access can be granted from the catalog denied state action or by setting localStorage key `productExplorer.isAdmin` to `true`.

## Final Project Structure

```text
Angular-Product-Explorer/
├── README.md
└── product-explorer/
	├── angular.json
	├── package.json
	├── src/
	│   ├── main.ts
	│   └── app/
	│       ├── app.config.ts
	│       ├── app.html
	│       ├── app.routes.ts
	│       ├── app.scss
	│       ├── app.ts
	│       ├── core/
	│       │   ├── api/
	│       │   │   └── products.api.ts
	│       │   ├── guards/
	│       │   │   └── admin.guard.ts
	│       │   └── services/
	│       │       └── favorites.service.ts
	│       ├── features/
	│       │   ├── admin/
	│       │   │   ├── admin.routes.ts
	│       │   │   └── components/
	│       │   │       └── view-admin/
	│       │   │           ├── view-admin.component.html
	│       │   │           ├── view-admin.component.scss
	│       │   │           └── view-admin.component.ts
	│       │   ├── catalog/
	│       │   │   ├── catalog.routes.ts
	│       │   │   ├── components/
	│       │   │   │   └── browse-products/
	│       │   │   │       ├── browse-products.component.html
	│       │   │   │       ├── browse-products.component.scss
	│       │   │   │       ├── browse-products.component.ts
	│       │   │   │       └── browse-products.functional.spec.ts
	│       │   │   ├── models/
	│       │   │   │   └── product.model.ts
	│       │   │   └── services/
	│       │   │       ├── catalog.facade.spec.ts
	│       │   │       └── catalog.facade.ts
	│       │   ├── favorites/
	│       │   │   ├── favorites.routes.ts
	│       │   │   └── components/
	│       │   │       └── view-favorites/
	│       │   │           ├── view-favorites.component.html
	│       │   │           ├── view-favorites.component.scss
	│       │   │           └── view-favorites.component.ts
	│       │   └── product-details/
	│       │       ├── product-details.routes.ts
	│       │       └── components/
	│       │           └── view-product-details/
	│       │               ├── view-product-details.component.html
	│       │               ├── view-product-details.component.scss
	│       │               ├── view-product-details.component.spec.ts
	│       │               └── view-product-details.component.ts
	│       ├── shared/
	│       │   ├── constants/
	│       │   │   └── app.constants.ts
	│       │   └── services/
	│       │       └── product-store.service.ts
	│       └── shell/
	│           ├── layout.component.html
	│           ├── layout.component.scss
	│           ├── layout.component.ts
	│           ├── header/
	│           │   ├── header.component.html
	│           │   ├── header.component.scss
	│           │   └── header.component.ts
	│           └── navigation/
	│               ├── navigation.component.html
	│               ├── navigation.component.scss
	│               └── navigation.component.ts
	└── tsconfig.json
```
