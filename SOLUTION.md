# SOLUTION

## 1. Approach Summary

This solution implements a production-like Angular SPA using standalone components, lazy-loaded feature routes, typed models and signal-driven state.

Primary goals were:
- Keep feature boundaries clear and extractable.
- Keep data/state logic separate from view components.
- Implement required user flows with reliable loading/error/empty handling.
- Keep implementation pragmatic for the assessment timeline.

## 2. Architecture Decisions

### 2.1 Standalone + Lazy Feature Boundaries

The app uses standalone bootstrapping and lazy route boundaries for:
- Catalog
- Product Details
- Favorites
- Admin

Why:
- Smaller route-level payloads.
- Cleaner separation by domain.
- Better readiness for future micro-frontend extraction.

Trade-off:
- Slightly more routing wiring than a single eager module setup.

### 2.2 Feature-first Structure

Features are organized under `src/app/features/*` with supporting app-wide concerns in `core` and reusable domain/shared concerns in `shared`.

Why:
- Reduces coupling.
- Improves maintainability for growth.
- Makes ownership clearer if multiple teams contribute later.

Trade-off:
- Requires discipline in deciding what belongs to feature, shared, or core.

### 2.3 State Management Strategy

Signals are used for UI state and derived state, with simple service-based stores/facades.

Key pieces:
- `ProductStoreService` for product data loading, loading/error state, and lookups.
- `CatalogFacade` for catalog-specific filter/sort/query behavior.
- `FavoritesService` for favorite IDs and localStorage persistence.

Why:
- Signals provide concise, reactive, low-boilerplate state updates.
- Facade pattern keeps component code thin and testable.

Trade-off:
- Additional abstraction layer (facade/store split) increases file count.

## 3. Product and Interaction Flows

### 3.1 Catalog

Implemented:
- Search by product title prefix (`startsWith`)
- Category filter
- Sort options (relevance, name asc, price asc, price desc)
- In-stock-only toggle

Design choice:
- Search is title-prefix only to match expected UX semantics from review feedback.

Trade-off:
- Less flexible than full-text contains search, but clearer and predictable.

### 3.2 Product Details

Implemented:
- Route-driven details (`/products/:id`)
- Pin action to add current product to favorites
- Loading/error/not-found handling

Why route-based details instead of modal:
- Better deep-linking and bookmarkability.

### 3.3 Favorites

Implemented:
- Favorites view resolves pinned product IDs into product cards.
- Remove individual favorites.
- Persistence via localStorage.

Trade-off:
- localStorage persistence is client-only and not multi-device synced.

### 3.4 Admin

Implemented guarded admin view with:
- Catalog diagnostics toggle (force simulated API failure)
- Favorites maintenance (clear all)
- Access control action (revoke admin flag)

A denied-access recovery UX was added in catalog when `?denied=admin` is present.

Trade-off:
- Guard is client-side only and not a true security boundary.

## 4. Security Considerations and Limits

Implemented:
- Route guard for admin route.
- No unsafe HTML rendering patterns introduced.
- Typed APIs and explicit model use reduce accidental unsafe handling.

Important limit:
- Client-side guard and localStorage flag can be manipulated in browser devtools.
- This is only acceptable for this frontend assessment demo, but not sufficient for production authorization.

Production-grade recommendation:
- Enforce admin authorization on backend endpoints using authenticated identities and role claims.

## 5. Testing Strategy

Implemented tests:
- Unit test for catalog facade business logic.
- Unit test for product details component behavior.
- Functional integration test for critical flow:
  - Search in catalog
  - Filtered result rendered
  - Navigate to product details

Why this mix:
- Unit tests validate business/component contracts quickly.
- Functional test validates user flow across component/router integration.

Trade-off:
- No browser-level e2e framework was added to keep scope focused and delivery time-efficient for this assessment.

## 6. Responsiveness and Accessibility

Implemented:
- Mobile-first responsive layouts across feature pages.
- Semantic sections/headings and visible state messaging.
- Keyboard-focus friendly controls and clear actionable affordances.

Trade-off:
- Styling is handcrafted and intentionally lightweight; no design system package was introduced.

## 7. Micro-frontend Readiness

Current readiness:
- Features already split by lazy route boundaries.
- Product Details, Favorites, Admin, and Catalog are separable domains.

Planned host/remote split (design only):
- Host shell:
  - Global navigation, layout, app routing, shared auth/session context
- Remote 1:
  - Product Details feature
- Remote 2 (optional next):
  - Catalog feature

Shared dependency strategy:
- Share Angular framework packages as singletons.
- Keep shared contracts/models versioned and backward compatible.

Versioning strategy:
- Semantic versioning per remote.
- Contract-first compatibility checks in CI.
- Host pinned to compatible remote ranges with rollback support.

Optional runtime remote loading was intentionally not implemented due to time constraint.

## 8. Trade-off Summary

1. Preferred route-based details over modal for linkability.
2. Used signals + service/facade pattern for clarity and testability.
3. Kept admin protection client-side for assessment scope, with explicit acknowledgement of security limits.
4. Added functional integration coverage without introducing a full external e2e stack to keep delivery focused and timely.
