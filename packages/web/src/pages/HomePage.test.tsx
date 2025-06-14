import { render, screen } from '../test/test-utils';
import { HomePage } from './HomePage';
import { describe, it, expect } from 'vitest';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', { name: /welcome to verding/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the platform subtitle', () => {
    render(<HomePage />);

    const subtitle = screen.getByText(/agent-first microgreens management platform/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('shows the hero description', () => {
    render(<HomePage />);

    const description = screen.getByText(/revolutionize your microgreens operation/i);
    expect(description).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<HomePage />);

    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });

    expect(getStartedButton).toBeInTheDocument();
    expect(learnMoreButton).toBeInTheDocument();
  });

  it('displays all feature cards', () => {
    render(<HomePage />);

    // Check for feature headings
    expect(screen.getByText(/ai agent interface/i)).toBeInTheDocument();
    expect(screen.getByText(/multi-property support/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/secure & scalable/i)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HomePage />);

    // Check for main sections
    const heroSection = screen
      .getByRole('heading', { name: /welcome to verding/i })
      .closest('section');
    const featuresSection = screen
      .getByRole('heading', { name: /key features/i })
      .closest('section');

    expect(heroSection).toBeInTheDocument();
    expect(featuresSection).toBeInTheDocument();
  });
});
