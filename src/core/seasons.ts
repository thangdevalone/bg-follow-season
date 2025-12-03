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
    // stylized forest canopy + light sky (no external images)
    background:
      'linear-gradient(180deg, #e0ffe9 0%, #c0f5d4 30%, #8adea3 55%, #3f7c4f 78%, #122015 100%)',
    accent: '#16a34a',
    // floating petals / pollen
    particleColor: 'rgba(74, 222, 128, 0.9)'
  },
  summer: {
    name: 'summer',
    // bright sky + lake/treeline feel
    background:
      'linear-gradient(180deg, #dbeafe 0%, #93c5fd 30%, #38bdf8 52%, #22c55e 76%, #052e16 100%)',
    accent: '#0ea5e9',
    // tiny dust motes / fireflies
    particleColor: 'rgba(56, 189, 248, 0.95)'
  },
  autumn: {
    name: 'autumn',
    // golden forest
    background:
      'linear-gradient(180deg, #fef9c3 0%, #fed7aa 30%, #fb923c 52%, #b45309 76%, #431407 100%)',
    accent: '#f97316',
    // falling leaves
    particleColor: 'rgba(245, 158, 11, 0.95)'
  },
  winter: {
    name: 'winter',
    // snowy forest + cold sky
    background:
      'linear-gradient(180deg, #e5f0ff 0%, #bfdbfe 28%, #60a5fa 52%, #1e293b 78%, #020617 100%)',
    accent: '#1d4ed8',
    // snow flakes
    particleColor: 'rgba(226, 232, 240, 0.98)'
  }
};


