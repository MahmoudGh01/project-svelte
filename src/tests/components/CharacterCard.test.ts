import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CharacterCard from '../../lib/components/CharacterCard.svelte';
import {
  mockGryffindorCharacter,
  mockSlytherinCharacter,
  mockRavenclawCharacter,
  mockHufflepuffCharacter,
  mockCharacterNoHouse,
  mockCharacterNoActor,
} from '../mocks/character-data';

describe('CharacterCard Component', () => {
  describe('House Color Logic', () => {
    it('should apply Gryffindor styling with red theme for Gryffindor house', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockGryffindorCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-gryffindor-primary');
      expect(card).toHaveClass('bg-gryffindor-primary/20');
      expect(card).toHaveClass('hover:bg-gryffindor-primary/30');
    });

    it('should apply Slytherin styling with green theme for Slytherin house', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockSlytherinCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-slytherin-primary');
      expect(card).toHaveClass('bg-slytherin-primary/20');
      expect(card).toHaveClass('hover:bg-slytherin-primary/30');
    });

    it('should apply Ravenclaw styling with blue theme for Ravenclaw house', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockRavenclawCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-ravenclaw-primary');
      expect(card).toHaveClass('bg-ravenclaw-primary/20');
      expect(card).toHaveClass('hover:bg-ravenclaw-primary/30');
    });

    it('should apply Hufflepuff styling with yellow theme for Hufflepuff house', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockHufflepuffCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-hufflepuff-primary');
      expect(card).toHaveClass('bg-hufflepuff-primary/20');
      expect(card).toHaveClass('hover:bg-hufflepuff-primary/30');
    });

    it('should apply default gray styling for unknown or empty house', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockCharacterNoHouse },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-hp-bronze');
      expect(card).toHaveClass('bg-hp-shadow/50');
      expect(card).toHaveClass('hover:bg-hp-shadow/70');
    });

    it('should handle house names case-insensitively', () => {
      const uppercaseCharacter = {
        ...mockGryffindorCharacter,
        hogwartsHouse: 'GRYFFINDOR',
      };

      const { container } = render(CharacterCard, {
        props: { character: uppercaseCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-gryffindor-primary');
    });
  });

  describe('Character Information Rendering', () => {
    it('should display character full name correctly', () => {
      render(CharacterCard, {
        props: { character: mockGryffindorCharacter },
      });

      expect(screen.getByText('Harry Potter')).toBeInTheDocument();
      expect(screen.getByText('Harry Potter')).toHaveClass('font-bold');
    });

    it('should display all character details including name, house, and birthdate', () => {
      render(CharacterCard, {
        props: { character: mockSlytherinCharacter },
      });

      expect(screen.getByText('Draco Malfoy')).toBeInTheDocument();
      expect(screen.getByText('Slytherin')).toBeInTheDocument();
      expect(screen.getByText(/5 June 1980/)).toBeInTheDocument();
    });

    it('should display house name in the badge', () => {
      render(CharacterCard, {
        props: { character: mockRavenclawCharacter },
      });

      // House should appear in the badge (top right)
      expect(screen.getByText('Ravenclaw')).toBeInTheDocument();
    });

    it('should display birthdate with "Born:" label', () => {
      render(CharacterCard, {
        props: { character: mockHufflepuffCharacter },
      });

      expect(screen.getByText(/Born:/)).toBeInTheDocument();
      expect(screen.getByText(/October 1977/)).toBeInTheDocument();
    });
  });

  describe('Actor Information Display', () => {
    it('should display actor name when interpretedBy field is present', () => {
      render(CharacterCard, {
        props: { character: mockGryffindorCharacter },
      });

      expect(screen.getByText(/Actor:/)).toBeInTheDocument();
      expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();
    });

    it('should display actor information with correct label and value', () => {
      render(CharacterCard, {
        props: { character: mockSlytherinCharacter },
      });

      const actorSection = screen.getByText(/Actor:/).parentElement;
      expect(actorSection).toHaveTextContent('Actor: Tom Felton');
    });

    it('should NOT display actor section when interpretedBy field is empty', () => {
      render(CharacterCard, {
        props: { character: mockCharacterNoActor },
      });

      expect(screen.queryByText(/Actor:/)).not.toBeInTheDocument();
    });

    it('should hide actor section when interpretedBy is an empty string', () => {
      render(CharacterCard, {
        props: { character: mockCharacterNoHouse },
      });

      expect(screen.queryByText(/Actor:/)).not.toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should have rounded corners and shadow for card styling', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockGryffindorCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('shadow-xl');
      expect(card).toHaveClass('border-2');
      expect(card).toHaveClass('overflow-hidden');
      expect(card).toHaveClass('h-80');
    });

    it('should include hover scale effect for interactivity', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockSlytherinCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('hover:scale-105');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('duration-300');
    });

    it('should have proper full-image overlay structure', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockRavenclawCharacter },
      });
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('relative');
      expect(card).toHaveClass('h-80');

      // Check for image as background
      const image = card.querySelector('img');
      expect(image).toHaveClass('absolute');
      expect(image).toHaveClass('inset-0');
      expect(image).toHaveClass('w-full');
      expect(image).toHaveClass('h-full');
      expect(image).toHaveClass('object-cover');

      // Check for gradient overlay
      const overlay = card.querySelector('.absolute.inset-0.bg-gradient-to-t');
      expect(overlay).toBeTruthy();

      // Check for content overlay with padding
      const contentOverlay = card.querySelector('.absolute.inset-0.p-4');
      expect(contentOverlay).toBeTruthy();
    });
  });

  describe('House Badge Display', () => {
    it('should display house badge with icon for Gryffindor', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockGryffindorCharacter },
      });

      // Check for badge in top-right corner
      const badge = container.querySelector('.absolute.top-3.right-3');
      expect(badge).toBeTruthy();

      // Check for house icon
      const houseIcon = container.querySelector('img[alt="Gryffindor"]');
      expect(houseIcon).toBeTruthy();

      // Check badge text
      expect(screen.getByText('Gryffindor')).toBeInTheDocument();
    });

    it('should display house badge with icon for Slytherin', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockSlytherinCharacter },
      });

      const houseIcon = container.querySelector('img[alt="Slytherin"]');
      expect(houseIcon).toBeTruthy();
      expect(screen.getByText('Slytherin')).toBeInTheDocument();
    });

    it('should display house badge with icon for Ravenclaw', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockRavenclawCharacter },
      });

      const houseIcon = container.querySelector('img[alt="Ravenclaw"]');
      expect(houseIcon).toBeTruthy();
      expect(screen.getByText('Ravenclaw')).toBeInTheDocument();
    });

    it('should display house badge with icon for Hufflepuff', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockHufflepuffCharacter },
      });

      const houseIcon = container.querySelector('img[alt="Hufflepuff"]');
      expect(houseIcon).toBeTruthy();
      expect(screen.getByText('Hufflepuff')).toBeInTheDocument();
    });

    it('should display badge with question mark emoji for unknown house', () => {
      const { container } = render(CharacterCard, {
        props: { character: mockCharacterNoHouse },
      });

      // Check for the badge
      const badge = container.querySelector('.absolute.top-3.right-3');
      expect(badge).toBeTruthy();

      // Should show question mark emoji instead of icon
      expect(badge?.textContent).toContain('❓');
      expect(badge?.textContent).toContain('Unknown');
    });

    it('should apply correct badge colors for each house', () => {
      const { container: gryffindorContainer } = render(CharacterCard, {
        props: { character: mockGryffindorCharacter },
      });

      const gryffindorBadge =
        gryffindorContainer.querySelector('.rounded-full');
      expect(gryffindorBadge).toHaveClass('bg-gryffindor-primary/90');
      expect(gryffindorBadge).toHaveClass('border-gryffindor-secondary');
    });
  });
});
