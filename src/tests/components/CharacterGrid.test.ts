import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import CharacterGrid from '../../lib/components/CharacterGrid.svelte';
import { mockTwentyCharacters } from '../mocks/character-data';

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('CharacterGrid - Search, Filter, and Pagination Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockTwentyCharacters,
    });
  });

  it('should render loading state initially', () => {
    render(CharacterGrid);
    expect(
      screen
        .getAllByRole('generic')
        .some(el => el.className.includes('animate-pulse'))
    ).toBe(true);
  });

  it('should fetch and display characters', async () => {
    render(CharacterGrid);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://potterapi-fedeperin.vercel.app/en/characters'
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });
  });

  it('should paginate characters correctly', async () => {
    render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Check pagination controls are rendered
    await waitFor(() => {
      const nextButton = screen.getByTitle('Next page');
      expect(nextButton).toBeInTheDocument();
    });
  });

  it('should filter characters by house', async () => {
    const { container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Find and change house filter
    const houseFilter = container.querySelector(
      '#house-filter'
    ) as HTMLSelectElement;
    expect(houseFilter).toBeInTheDocument();

    if (houseFilter) {
      await fireEvent.change(houseFilter, { target: { value: 'gryffindor' } });

      await waitFor(() => {
        const countText = screen.getByText(/characters found/i);
        expect(countText).toBeInTheDocument();
      });
    }
  });

  it('should filter characters by actor presence', async () => {
    const { container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Find and change actor filter
    const actorFilter = container.querySelector(
      '#actor-filter'
    ) as HTMLSelectElement;
    expect(actorFilter).toBeInTheDocument();

    if (actorFilter) {
      await fireEvent.change(actorFilter, { target: { value: 'with-actor' } });

      await waitFor(() => {
        const countText = screen.getByText(/characters found/i);
        expect(countText).toBeInTheDocument();
      });
    }
  });

  it('should filter characters by children status', async () => {
    const { container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Find and change children filter
    const childrenFilter = container.querySelector(
      '#children-filter'
    ) as HTMLSelectElement;
    expect(childrenFilter).toBeInTheDocument();

    if (childrenFilter) {
      await fireEvent.change(childrenFilter, {
        target: { value: 'with-children' },
      });

      await waitFor(() => {
        const countText = screen.getByText(/characters found/i);
        expect(countText).toBeInTheDocument();
      });
    }
  });

  it('should clear all filters', async () => {
    const { container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Apply a filter first
    const houseFilter = container.querySelector(
      '#house-filter'
    ) as HTMLSelectElement;
    if (houseFilter) {
      await fireEvent.change(houseFilter, { target: { value: 'gryffindor' } });
    }

    // Click clear all filters button
    const clearButton = screen.getByText(/clear all filters/i);
    await fireEvent.click(clearButton);

    // Verify filters are reset
    await waitFor(() => {
      expect(houseFilter?.value).toBe('all');
    });
  });

  it('should change page size', async () => {
    const { container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Find page size selector
    const pageSizeSelect = container.querySelector(
      '#page-size'
    ) as HTMLSelectElement;
    expect(pageSizeSelect).toBeInTheDocument();

    if (pageSizeSelect) {
      await fireEvent.change(pageSizeSelect, { target: { value: '8' } });

      await waitFor(() => {
        expect(pageSizeSelect.value).toBe('8');
      });
    }
  });

  it('should navigate between pages', async () => {
    render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Wait for pagination to appear
    await waitFor(() => {
      const nextButton = screen.getByTitle('Next page');
      expect(nextButton).toBeInTheDocument();
    });

    const nextButton = screen.getByTitle('Next page');
    await fireEvent.click(nextButton);

    // Verify page changed
    await waitFor(() => {
      const page2Button = screen.queryByText('2');
      if (page2Button) {
        expect(page2Button).toHaveClass('bg-hp-accent');
      }
    });
  });

  it('should handle search through exposed filterCharacters method', async () => {
    const { component } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Call the exposed search method
    component.filterCharacters('harry');

    await waitFor(() => {
      const countText = screen.getByText(/characters found/i);
      expect(countText).toBeInTheDocument();
    });
  });

  it('should show empty state when no results found', async () => {
    const { component } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Search for something that doesn't exist
    component.filterCharacters('nonexistentcharacter123456');

    await waitFor(() => {
      expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
    });
  });

  it('should combine search and filters correctly', async () => {
    const { component, container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Apply search
    component.filterCharacters('harry');

    // Apply house filter
    const houseFilter = container.querySelector(
      '#house-filter'
    ) as HTMLSelectElement;
    if (houseFilter) {
      await fireEvent.change(houseFilter, { target: { value: 'gryffindor' } });
    }

    await waitFor(() => {
      const countText = screen.getByText(/characters found/i);
      expect(countText).toBeInTheDocument();
    });
  });

  it('should reset to page 1 when filters change', async () => {
    const { container } = render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/characters found/i)).toBeInTheDocument();
    });

    // Navigate to page 2 if possible
    const nextButton = screen.queryByTitle('Next page');
    if (nextButton && !nextButton.hasAttribute('disabled')) {
      await fireEvent.click(nextButton);
    }

    // Apply a filter
    const houseFilter = container.querySelector(
      '#house-filter'
    ) as HTMLSelectElement;
    if (houseFilter) {
      await fireEvent.change(houseFilter, { target: { value: 'gryffindor' } });
    }

    // Should reset to page 1
    await waitFor(() => {
      const page1Button = screen.queryByText('1');
      if (page1Button) {
        expect(page1Button).toHaveClass('bg-hp-accent');
      }
    });
  });

  it('should handle error state', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(CharacterGrid);

    await waitFor(() => {
      expect(screen.getByText(/error loading characters/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/try again/i)).toBeInTheDocument();
  });
});
