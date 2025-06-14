import App from './App';
import { render, screen } from './test/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

// Custom render for App component with MemoryRouter
const renderWithRouter = (initialEntries: string[] = ['/']) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('App', () => {
  it('renders home page by default', () => {
    renderWithRouter(['/']);

    // Should render the HomePage content within Layout
    expect(screen.getByText(/welcome to verding/i)).toBeInTheDocument();
    expect(screen.getByText(/agent-first microgreens management platform/i)).toBeInTheDocument();
  });

  it('renders login page when navigating to /login', () => {
    renderWithRouter(['/login']);

    // Should render the LoginPage content
    expect(
      screen.getByText(/sign in to your microgreens management platform/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders dashboard page when navigating to /dashboard', () => {
    renderWithRouter(['/dashboard']);

    // Should render the DashboardPage content within Layout
    expect(screen.getByText(/manage your microgreens operation/i)).toBeInTheDocument();
    expect(screen.getByText(/properties/i)).toBeInTheDocument();
  });

  it('includes layout for protected routes', () => {
    renderWithRouter(['/']);

    // Should include the layout elements
    expect(screen.getByText(/verding/i)).toBeInTheDocument(); // Logo
    expect(screen.getByText(/© 2024 verding/i)).toBeInTheDocument(); // Footer
  });

  it('does not include layout for login page', () => {
    renderWithRouter(['/login']);

    // Should not include layout elements on login page
    expect(screen.queryByText(/© 2024 verding/i)).not.toBeInTheDocument();
  });
});
