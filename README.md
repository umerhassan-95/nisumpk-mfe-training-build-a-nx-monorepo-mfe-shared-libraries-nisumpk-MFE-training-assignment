# Assignment 3 - Build a Monorepo MFE App with Shared Libraries

## 📌 Overview

In this assignment, you will build a small **Micro Frontend (MFE) application using an Nx monorepo**.

You will create a Host application and a Remote application that are developed within the same monorepo but remain independently structured and composable at runtime using **Module Federation**.

You will also create shared libraries for:

- TypeScript types
- Reusable UI components

The main goal is to understand how a monorepo can organize multiple applications and shared libraries while still allowing Micro Frontends to be independently developed and composed at runtime.

---

# 🎯 Learning Objectives

By completing this assignment, you should be able to:

1. Create and configure an Nx monorepo.
2. Create React applications using Nx.
3. Understand the Host/Remote Micro Frontend architecture.
4. Configure Module Federation.
5. Expose a Remote MFE from another application.
6. Consume a Remote MFE from a Host application.
7. Create and consume shared TypeScript libraries.
8. Create reusable shared UI components.
9. Understand the difference between applications and libraries in an Nx workspace.
10. Compose independently developed Micro Frontends at runtime.

---

# 🏗️ Application Architecture

Your application should contain:

```text
                    ┌─────────────────────┐
                    │      Shell App      │
                    │   Host / Consumer   │
                    └──────────┬──────────┘
                               │
                               │ Module Federation
                               ▼
                    ┌─────────────────────┐
                    │      Shop App       │
                    │  Remote / Provider  │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
             ┌──────▼──────┐       ┌──────▼──────┐
             │ Shared Types│       │  Shared UI  │
             │   Library   │       │   Library   │
             └─────────────┘       └─────────────┘
```

The required workspace should contain:

- `shell` — Host/Consumer application
- `shop` — Remote/Provider application
- Shared Types library
- Shared UI library

---

# 🧰 Technology Requirements

You must use the following technologies:

- Nx
- React
- TypeScript
- Module Federation

You may use:

- CSS
- Tailwind CSS
- Any suitable styling approach
- Any suitable icon library

> The recommended implementation is **Nx + React + TypeScript + Module Federation**.

---

# 📁 Required Project Structure

Your Nx workspace should contain a structure similar to:

```text
nx-mfe-workspace/
│
├── apps/
│   ├── shell/
│   │   ├── src/
│   │   └── ...
│   │
│   └── shop/
│       ├── src/
│       └── ...
│
├── libs/
│   ├── types/
│   │   ├── src/
│   │   └── ...
│   │
│   └── ui/
│       ├── src/
│       └── ...
│
├── nx.json
├── package.json
├── tsconfig.base.json
└── README.md
```

You may use a different library naming or folder structure if your Nx architecture is clearly documented.

---

# ⚙️ Part 1 — Nx Workspace Setup

Create a new Nx workspace using React and TypeScript.

Your workspace must contain two React applications:

```text
shell
shop
```

### Shell Application

The `shell` application will act as the **Host/Consumer**.

It will be responsible for:

- Starting the main application.
- Loading the `shop` Remote.
- Rendering the Remote's exposed Product List.
- Providing the main application layout.

### Shop Application

The `shop` application will act as the **Remote/Provider**.

It will be responsible for:

- Maintaining the product list UI.
- Using the shared Product type.
- Using the shared Button and Card components.
- Exposing the Product List through Module Federation.

---

# 📦 Part 2 — Shared Types Library

Create a shared Nx library for application types.

The library must contain a `Product` interface.

The interface must contain:

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
}
```

You may add additional fields if required by your implementation, but the minimum required fields are:

- `id`
- `name`
- `price`

The `shop` application must import and use the `Product` interface from the shared library.

### Example

```typescript
import { Product } from '@your-workspace/types';
```

Do not duplicate the `Product` interface directly inside the `shop` application.

---

# 🎨 Part 3 — Shared UI Library

Create a shared Nx UI library.

The UI library must contain the following three components:

```text
Button
Card
Price
```

Do not add unnecessary components to the required implementation.

---

## Button

The `Button` component must accept:

```typescript
label
onClick
```

Example:

```tsx
<Button
  label="Add to Cart"
  onClick={handleClick}
/>
```

The component should render a clickable button.

---

## Card

The `Card` component should wrap its children with a visible card-style container.

It should provide:

- Border
- Shadow
- Appropriate spacing

Example:

```tsx
<Card>
  <h2>Wireless Headphones</h2>
  <p>Product information</p>
</Card>
```

---

## Price

The `Price` component must accept a numeric value and display it as currency.

Example:

```tsx
<Price value={99.99} />
```

Expected output could be:

```text
$99.99
```

The exact currency format should be clearly documented in your implementation.

---

# 🛍️ Part 4 — Shop Product List

Implement a Product List inside the `shop` application.

The Product List should:

- Use the shared `Product` interface.
- Display multiple products.
- Use the shared `Card` component.
- Use the shared `Button` component.
- Use the shared `Price` component.

Example:

```text
┌──────────────────────────────┐
│ Wireless Headphones          │
│                              │
│ $99.99                       │
│                              │
│ [Add to Cart]                │
└──────────────────────────────┘
```

You may use local/mock product data.

A minimum of **4 products** should be displayed.

Example product data:

```typescript
const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
  },
  {
    id: 2,
    name: 'Laptop Stand',
    price: 49.99,
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 89.99,
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    price: 39.99,
  },
];
```

---

# 🔗 Part 5 — Module Federation Setup

Configure Module Federation so that the `shell` application can consume the `shop` application at runtime.

The expected architecture is:

```text
Shell
  │
  │ Module Federation
  ▼
Shop
  │
  └── Product List
```

The `shop` application must act as the **Remote**.

The `shell` application must act as the **Host**.

---

## Remote Requirements

The `shop` application must:

- Be configured as a Module Federation Remote.
- Expose the Product List.
- Be independently runnable.
- Provide the exposed module through the configured Remote entry.

For example, conceptually:

```text
shop
 └── ProductList
```

is exposed to the Host.

---

## Host Requirements

The `shell` application must:

- Be configured as a Module Federation Host.
- Consume the `shop` Remote.
- Load the Product List from the Remote.
- Render the Product List inside the Shell application.

The Product List must **not** simply be copied into the Shell application.

It must be loaded through Module Federation.

---

# 🚀 Part 6 — Runtime Composition

The final application should demonstrate runtime composition.

The expected flow is:

```text
1. User opens Shell
        ↓
2. Shell starts
        ↓
3. Shell loads Shop Remote
        ↓
4. Shop exposes Product List
        ↓
5. Shell renders Product List
        ↓
6. User sees the Shop UI inside Shell
```

The application should work when both applications are running.

---

# 🧪 Part 7 — Independent Application Verification

Both applications must be independently runnable.

You should be able to start:

```text
Shell
```

and:

```text
Shop
```

separately.

Verify that:

- The `shop` application can run independently.
- The `shell` application can run as the Host.
- The Shell can load the Shop Remote.
- The Product List is rendered successfully inside the Shell.
- Shared UI components work correctly.
- Shared types are imported from the shared library.

---

# 📦 Part 8 — Shared Library Usage

Your implementation must demonstrate proper Nx library usage.

The dependency relationship should be similar to:

```text
                ┌──────────────┐
                │ Shared Types │
                └───────┬──────┘
                        │
                        ▼
                  ┌───────────┐
                  │   Shop    │
                  └───────────┘

                ┌──────────────┐
                │   Shared UI  │
                └───────┬──────┘
                        │
                        ▼
                  ┌───────────┐
                  │   Shop    │
                  └───────────┘
```

The `shop` application should consume the shared libraries through Nx library imports rather than duplicating their implementation.

---

# 🧪 Part 9 — Testing

Include tests for important functionality.

At minimum, test:

## Shared UI

### Button

Verify that:

- The button renders.
- The provided label is displayed.
- The `onClick` handler is called.

### Card

Verify that:

- The Card renders its children.

### Price

Verify that:

- The Price component renders the expected currency value.

---

## Shop

Verify that:

- Products render correctly.
- Product names are displayed.
- Product prices are displayed.
- Shared `Card` is used.
- Shared `Button` is used.
- The Product List renders successfully.

---

# 📸 Part 10 — Screenshots / Demo

Include screenshots demonstrating the working application.

At minimum, provide:

### 1. Nx Workspace

Show the Nx workspace structure containing:

```text
apps/
  shell/
  shop/

libs/
  types/
  ui/
```

### 2. Shop Application

Show the Shop application running independently with the Product List.

### 3. Shell Application

Show the Shell application loading the Product List from the Shop Remote.

### 4. Runtime Composition

Show the final application where:

```text
Shell
  ↓
Shop Remote
  ↓
Product List
```

is working successfully.

---

# 📖 Part 11 — README Documentation

Your README must contain the following sections:

```text
# Project Title

## Overview

## Architecture

## Technologies Used

## Project Structure

## Running the Application

## Shared Types Library

## Shared UI Library

## Shop Application

## Module Federation Configuration

## Runtime Composition

## Testing

## Screenshots / Demo

## Challenges & Solutions

## Conclusion
```

Explain your implementation clearly in your own words.

---

# ▶️ Running the Application

Your project should provide clear instructions for running both applications.

For example:

```bash
# Install dependencies
npm install

# Start Shop Remote
npx nx serve shop

# Start Shell Host
npx nx serve shell
```

Your actual commands may differ depending on your implementation.

Document the exact commands required to run your project.

---

# 🔍 Architecture Questions

Add a section to your README called:

```text
## Architecture Decisions
```

Answer the following questions.

### Question 1

What is the responsibility of the Shell application and what is the responsibility of the Shop application?

### Question 2

Why is Module Federation useful for Micro Frontends?

### Question 3

Why should the Product interface be placed in a shared library instead of being duplicated inside the Shop application?

### Question 4

What are the benefits of creating a shared UI library in an Nx monorepo?

### Question 5

What is the difference between an Nx application and an Nx library?

### Question 6

What happens if the Shop Remote is unavailable when the Shell tries to load it?

Explain how your implementation handles or could handle this situation.

### Question 7

Why is runtime composition different from simply importing the Shop application's source code directly into the Shell?

---

# 📁 Expected Deliverables

Your GitHub repository must contain:

```text
├── apps/
│   ├── shell/
│   └── shop/
│
├── libs/
│   ├── types/
│   └── ui/
│
├── README.md
├── package.json
├── nx.json
└── ...
```

Your submission must include:

- Working Nx workspace.
- Working Shell application.
- Working Shop application.
- Module Federation configuration.
- Product List exposed from Shop.
- Product List consumed by Shell.
- Shared Product type.
- Shared Button component.
- Shared Card component.
- Shared Price component.
- Unit/component tests.
- Architecture documentation.
- Screenshots or demo.

---

# 🚨 Important Rules

1. The project must use **Nx**.
2. The project must use **React + TypeScript**.
3. The project must contain separate `shell` and `shop` applications.
4. The `shell` must act as the Module Federation Host.
5. The `shop` must act as the Module Federation Remote.
6. The Product List must be exposed from the Shop Remote.
7. The Shell must consume the Product List through Module Federation.
8. The `Product` interface must be implemented in a shared library.
9. The `Button`, `Card`, and `Price` components must be implemented in a shared UI library.
10. The Shop application must use the shared types and UI libraries.
11. Do not duplicate the shared Product type inside the Shop application.
12. Do not copy the Shop Product List into the Shell application.
13. Both applications must be runnable independently.
14. Code should be clean, modular, and maintainable.
15. Clearly document your architecture and implementation decisions.

---

# 📝 Submission Checklist

Before submitting your assignment, verify:

- [ ] Nx workspace is created.
- [ ] React + TypeScript are configured.
- [ ] Shell application is created.
- [ ] Shop application is created.
- [ ] Shared Types library is created.
- [ ] Shared UI library is created.
- [ ] Product interface is implemented.
- [ ] Shop uses the shared Product interface.
- [ ] Button component is implemented.
- [ ] Card component is implemented.
- [ ] Price component is implemented.
- [ ] Shop uses Button and Card.
- [ ] Shop uses Price.
- [ ] Product List is implemented.
- [ ] Module Federation is configured.
- [ ] Shop is configured as the Remote.
- [ ] Shell is configured as the Host.
- [ ] Product List is exposed from Shop.
- [ ] Shell consumes Product List from Shop.
- [ ] Both applications run successfully.
- [ ] Tests are included.
- [ ] README is complete.
- [ ] Architecture decisions are documented.
- [ ] Screenshots/demo are included.

---

# 🎓 Final Goal

The purpose of this assignment is **not simply to create a product list**.

The main objective is to understand how an Nx monorepo can organize multiple Micro Frontends and shared libraries while still allowing applications to be independently developed and composed at runtime.

By the end of this assignment, you should be able to explain:

```text
Nx Monorepo
     │
     ├── Shell Host
     │
     ├── Shop Remote
     │
     ├── Shared Types
     │
     └── Shared UI
            │
            ▼
     Runtime Composition
```

You should understand:

- How Nx organizes applications and libraries.
- How Module Federation connects independent MFEs.
- How shared libraries reduce duplication.
- How shared types improve consistency.
- How shared UI components can be reused across applications.
- How a Host consumes a Remote at runtime.

---

# 💡 Tips

- Start by creating the Nx workspace before generating applications and libraries.
- Keep the Shell and Shop responsibilities clearly separated.
- Keep shared types independent from application-specific logic.
- Keep the shared UI library reusable and simple.
- Start the Shop Remote before testing the Shell Host.
- Verify the Remote independently before integrating it with the Host.
- Use clear component and library names.
- Document any architectural decisions or deviations from the requirements.
- Test the runtime composition carefully.

---

## 📅 Deadline

Please submit your GitHub repo link by: 28 - August - 2026

---

## 💡 Tips
- Start all remote apps before running the shell.
- Keep each remote app small and focused.
- Test what happens when one remote app is stopped.
- Use clear component names and folder structure.
- Read the Module Federation and Vite plugin documentation carefully.

Helpful links:

- https://vitejs.dev/
- https://react.dev/
- https://reactrouter.com/
- https://github.com/originjs/vite-plugin-federation

# 🚀 Good Luck!

Build it, experiment with the Nx workspace structure and Module Federation, and most importantly — **understand how applications, shared libraries, and Micro Frontends work together in a monorepo.**


## Happy Building! ⚡
