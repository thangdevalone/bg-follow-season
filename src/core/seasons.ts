export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonTheme {
  name: Season;
  background: string;
  accent: string;
  particleColor: string;
}

export const SEASON_THEMES: Record<Season, SeasonTheme> = {
  spring: {
    name: 'spring',
    background: 'linear-gradient(135deg, #f0fff4, #c6f6d5)',
    accent: '#38a169',
    particleColor: 'rgba(72, 187, 120, 0.9)'
  },
  summer: {
    name: 'summer',
    background: 'linear-gradient(135deg, #ebf8ff, #bee3f8)',
    accent: '#3182ce',
    particleColor: 'rgba(66, 153, 225, 0.9)'
  },
  autumn: {
    name: 'autumn',
    background: 'linear-gradient(135deg, #fffaf0, #fefcbf)',
    accent: '#dd6b20',
    particleColor: 'rgba(237, 137, 54, 0.9)'
  },
  winter: {
    name: 'winter',
    background: 'linear-gradient(135deg, #edf2f7, #e2e8f0)',
    accent: '#2d3748',
    particleColor: 'rgba(160, 174, 192, 0.9)'
  }
};


