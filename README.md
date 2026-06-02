# Angular-Product-Explorer
Product Explorer is a responsive Angular SPA for browsing, searching, filtering and adding products to favorites. It uses Angular, TypeScript, RxJS, and SCSS with a scalable feature-based, lazy-loaded architecture, an admin route guard, mobile-first design and tests with Vitest and Playwright

# Product Explorer

A responsive Angular Single Page Application (SPA) that allows users to browse, search, filter and add products to favorites. The application demonstrates modern Angular development practices, strong TypeScript usage, responsive design, testing and a scalable architecture designed with micro-frontend readiness in mind.

## Features

* Browse a product catalog
* Search products by name
* Filter products by category
* View detailed product information
* Add products to favorites
* Responsive mobile-first design
* Protected Admin route using a route guard

## Technology Stack

* Angular
* TypeScript
* RxJS
* SCSS
* Angular Router
* Vitest (Unit Testing)
* Playwright (Functional/E2E Testing)

## Architecture

The application follows a feature-based architecture that promotes maintainability, scalability, and clear separation of concerns.

```text
app/
│
├── shell/
│   ├── layout.component.ts
│   ├── header/
│   ├── footer/
│   └── navigation/
│
├── core/
│   ├── api/
│   ├── guards/
│   ├── interceptors/
│   ├── services/
│   ├── config/
│   └── state/
│
├── shared/
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   ├── models/
│   ├── utils/
│   └── constants/
│
├── features/
│   ├── catalog/
│   ├── product-details/
│   ├── favorites/
│   └── admin/
│
├── app.routes.ts
└── app.config.ts
```

### Micro-Frontend Readiness

The application is structured around feature boundaries rather than technical layers. Features are independently organized and lazy-loaded where appropriate, making them easier to extract into separate micro-frontends in the future if scaling requirements evolve.

## Getting Started

### Prerequisites

* Node.js (LTS version recommended)
* npm
* Angular CLI

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd product-explorer
```

Install dependencies:

```bash
npm install
```

### Run the Application

```bash
ng serve
```

Navigate to:

```text
http://localhost:4200
```

## Running Tests

### Unit Tests

```bash
ng test
```

The project includes unit tests covering:

* Core business logic (filtering and sorting)
* Product service functionality
* Product list component rendering and interactions

### Functional / E2E Tests

```bash
npx playwright test
```

The project includes a functional test covering a critical user flow:

1. Search for a product
2. Select a product from the results
3. Navigate to the product details page
4. Verify product details are displayed

## Security Considerations

The application includes basic security practices:

* Route protection using an Admin route guard
* Strong TypeScript typing and strict mode
* Angular template sanitization for user-facing content
* No direct DOM manipulation
* Principle of least privilege applied where appropriate

This project is developed as part of a technical assessment and focuses on demonstrating clean architecture, code quality, testing practices, responsiveness, and modern Angular development techniques.
