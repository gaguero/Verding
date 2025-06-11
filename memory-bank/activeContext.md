# Active Context: Feature-Driven Frontend Development

**CURRENT FOCUS: Phase 2 - The Core Dashboard - Viewing Farm State**

Our top priority has shifted from component-level recovery to a feature-driven development approach. The immediate goal is to implement a secure "front door" for the application, allowing users to register, log in, see a protected page, and log out.

**Completed Phase 1**: Secure Foundation & User Authentication — built and styled login/register pages, routes, protected layout, and logout.

**Current Task**: Build the dashboard view (`/dashboard`), including property selection and real-time sensor data cards.

## Key Goals for Phase 1
1.  **Implement Login/Registration Flow**:
    -   **Next Action**: Locate the existing authentication components (Login/Register forms, protected routes).
    -   Create the primary application routes (`/login`, `/register`, `/dashboard`).
    -   Ensure the `/dashboard` route is protected, redirecting unauthenticated users to `/login`.
2.  **Build the Main Application Layout**:
    -   Flesh out the `Layout.tsx` component to serve as the main container for all authenticated views (e.g., adding sidebar and header placeholders).
3.  **Implement Logout Functionality**:
    -   Add a "Logout" button within the main layout that clears the user's session and redirects them to the login page.

## Strategy Shift
-   We have abandoned the component-library-first approach in favor of building pages and features vertically. Components will be created or rebuilt as they are needed by a specific feature.
-   This approach is designed to deliver a usable application to the team as quickly as possible.

## Recent Changes & Discoveries
-   **Successful Build Achieved**: We successfully got the entire monorepo to build by stripping down `DashboardPage.tsx` and fixing backend type definitions.
-   **Development Server is Running**: The application is now runnable, displaying a minimal page.

**Goal for this session**: Start Phase 2 by creating the dashboard layout and integrating core components (PropertySwitcher, SensorCard).
