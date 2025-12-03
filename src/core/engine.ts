import { SEASON_THEMES, Season } from './seasons';

export interface BgFollowSeasonOptions {
  season?: Season;
  autoSeason?: boolean;
  fps?: number;
  particleCount?: number;
}

export interface BgFollowSeasonInstance {
  setSeason: (season: Season) => void;
  destroy: () => void;
}

const DEFAULT_OPTIONS: Required<Omit<BgFollowSeasonOptions, 'season'>> = {
  autoSeason: true,
  fps: 30,
  particleCount: 40
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
  el.style.backgroundImage = theme().background;
  el.style.transition = 'background-image 400ms ease-out';

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';

  el.prepend(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('[bg-follow-season] Canvas 2D context not available');
  }

  let width = 0;
  let height = 0;

  const resize = () => {
    const rect = el.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  resize();

  const particles = Array.from({ length: merged.particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 2 + Math.random() * 3,
    speedY: 0.3 + Math.random() * 1.5,
    driftX: -0.5 + Math.random()
  }));

  let frameId: number | null = null;
  let lastTime = 0;
  const frameInterval = 1000 / merged.fps;

  const render = (time: number) => {
    frameId = window.requestAnimationFrame(render);
    const delta = time - lastTime;
    if (delta < frameInterval) return;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = theme().particleColor;

    for (const p of particles) {
      p.y += p.speedY;
      p.x += p.driftX;

      if (p.y > height + 10) {
        p.y = -10;
        p.x = Math.random() * width;
      }

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  frameId = window.requestAnimationFrame(render);
  window.addEventListener('resize', resize);

  return {
    setSeason(next: Season) {
      season = next;
      el.style.backgroundImage = theme().background;
    },
    destroy() {
      if (frameId != null) cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      canvas.remove();
    }
  };
}


