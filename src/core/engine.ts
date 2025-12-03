import { SEASON_THEMES, Season } from './seasons';
import springBg from '../assets/spring.svg';
import summerBg from '../assets/summer.svg';
import autumnBg from '../assets/autumn.svg';
import winterBg from '../assets/winter.svg';

export interface BgFollowSeasonOptions {
  season?: Season;
  autoSeason?: boolean;
  /**
   * Approximate number of leaf/snow particles.
   */
  particleCount?: number;
}

export interface BgFollowSeasonInstance {
  setSeason: (season: Season) => void;
  destroy: () => void;
}

const DEFAULT_OPTIONS: Required<Omit<BgFollowSeasonOptions, 'season'>> = {
  autoSeason: true,
  particleCount: 80
};

const SEASON_BACKGROUNDS: Record<Season, string> = {
  spring: springBg,
  summer: summerBg,
  autumn: autumnBg,
  winter: winterBg
};

type LeafParticle = {
  el: HTMLDivElement;
  x: number;
  y: number;
  speedY: number;
  driftX: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
};

export function detectSeasonByDate(date = new Date()): Season {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export function createSeasonalBackground(
  target: HTMLElement | string,
  options: BgFollowSeasonOptions = {}
): BgFollowSeasonInstance {
  const el =
    typeof target === 'string'
      ? (document.querySelector(target) as HTMLElement | null)
      : target;

  if (!el) {
    throw new Error('[bg-follow-season] Target element not found');
  }

  const merged = { ...DEFAULT_OPTIONS, ...options };
  let season: Season = options.season ?? (merged.autoSeason ? detectSeasonByDate() : 'spring');

  const theme = () => SEASON_THEMES[season];

  el.style.position = el.style.position || 'relative';
  el.style.overflow = 'hidden';

  const applyBackground = () => {
    const img = SEASON_BACKGROUNDS[season];
    el.style.backgroundImage = `url('${img}')`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundColor = '#020617';
  };

  applyBackground();

  const leafLayer = document.createElement('div');
  leafLayer.style.position = 'absolute';
  leafLayer.style.inset = '0';
  leafLayer.style.pointerEvents = 'none';
  leafLayer.style.overflow = 'hidden';
  // no explicit z-index so it stays *behind* normal content:
  // we prepend this layer, so later children (your UI) paint on top.

  el.prepend(leafLayer);

  let particles: LeafParticle[] = [];
  let animationFrame: number | null = null;
  let viewportHeight = el.clientHeight;
  let viewportWidth = el.clientWidth;

  const measure = () => {
    const rect = el.getBoundingClientRect();
    viewportHeight = rect.height;
    viewportWidth = rect.width;
  };

  const spawnLeaves = () => {
    leafLayer.innerHTML = '';
    particles = [];
    measure();
    const count = merged.particleCount;
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('div');
      leaf.style.position = 'absolute';
      leaf.style.top = '0';
      leaf.style.left = '0';
      leaf.style.pointerEvents = 'none';
      leaf.style.willChange = 'transform, opacity';

      // smaller, season‑specific sizing
      const size =
        season === 'winter'
          ? 10 + Math.random() * 8 // snow
          : season === 'autumn'
          ? 10 + Math.random() * 6 // leaves
          : 8 + Math.random() * 6; // spring petals / summer dust
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;

      // shape & color per season
      switch (season) {
        case 'spring': {
          // soft petal: small capsule, slightly diagonal
          leaf.style.background = '#fecaca';
          leaf.style.borderRadius = `${size}px`;
          leaf.style.boxShadow = '0 0 4px rgba(248,113,113,0.5)';
          leaf.style.transform = 'rotate(18deg)';
          break;
        }
        case 'summer': {
          // sun-dust: short warm streak
          leaf.style.background = 'linear-gradient(90deg, #fde68a, #facc15)';
          leaf.style.borderRadius = '999px';
          leaf.style.boxShadow = '0 0 5px rgba(250,204,21,0.5)';
          leaf.style.transform = 'rotate(8deg)';
          break;
        }
        case 'autumn': {
          // tiny leaf: thin rotated rectangle
          leaf.style.background = 'linear-gradient(135deg, #f97316, #b45309)';
          leaf.style.borderRadius = '3px';
          leaf.style.transform = 'rotate(32deg)';
          break;
        }
        case 'winter': {
          // bright snow: only one that is circular
          leaf.style.background = 'rgba(248,250,252,0.96)';
          leaf.style.borderRadius = '999px';
          leaf.style.boxShadow = '0 0 8px rgba(248,250,252,0.8)';
          break;
        }
      }

      const baseOpacity =
        season === 'summer' ? 0.75 : season === 'winter' ? 0.98 : season === 'autumn' ? 0.9 : 0.85;

      leaf.style.opacity = String(baseOpacity);

      leafLayer.appendChild(leaf);

      particles.push({
        el: leaf,
        x: Math.random() * viewportWidth,
        y: Math.random() * viewportHeight,
        speedY:
          season === 'winter'
            ? 0.4 + Math.random() * 0.6
            : season === 'autumn'
            ? 0.9 + Math.random() * 1.3
            : 0.6 + Math.random() * 0.9,
        driftX: (Math.random() - 0.5) * (season === 'winter' ? 0.4 : 1.1),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * (season === 'winter' ? 0.2 : 0.5),
        size
      });
    }
  };

  spawnLeaves();

  const animate = () => {
    animationFrame = window.requestAnimationFrame(animate);
    for (const particle of particles) {
      particle.y += particle.speedY;
      particle.x += particle.driftX;
      particle.rotation += particle.rotationSpeed;

      if (particle.y > viewportHeight + 40) {
        particle.y = -40;
        particle.x = Math.random() * viewportWidth;
      }

      if (particle.x < -40) particle.x = viewportWidth + 20;
      if (particle.x > viewportWidth + 40) particle.x = -20;

      particle.el.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rotation}deg)`;
    }
  };

  animate();
  window.addEventListener('resize', measure);

  return {
    setSeason(next: Season) {
      season = next;
      applyBackground();
      spawnLeaves();
    },
    destroy() {
      if (animationFrame != null) cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', measure);
      leafLayer.remove();
    }
  };
}
