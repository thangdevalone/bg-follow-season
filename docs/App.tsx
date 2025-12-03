import React, { useState } from 'react';
import { Season, SEASON_THEMES } from '@bg-follow-season/core';
import { SeasonBackground } from '@bg-follow-season/react';

const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];

const App: React.FC = () => {
  const [season, setSeason] = useState<Season>('spring');
  const theme = SEASON_THEMES[season];

  return (
    <SeasonBackground
      season={season}
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100"
    >
      <header className="border-b border-white/10 backdrop-blur bg-slate-950/40 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl border border-white/30"
              style={{ backgroundImage: theme.background }}
            />
            <div>
              <h1 className="font-semibold tracking-tight">bg-follow-season</h1>
              <p className="text-xs text-slate-300">
                Seasonal background animations for HTML, React, and Vue.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 border border-white/10 px-2 py-1 text-xs">
            <span className="text-slate-300">Season</span>
            <div className="flex rounded-full bg-slate-800/80 p-0.5">
              {seasons.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className={`px-2 py-0.5 rounded-full text-[11px] capitalize transition
                    ${
                      s === season
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700/70'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur p-6 shadow-2xl shadow-black/50">
              <h2 className="text-lg font-semibold mb-2">What is this?</h2>
              <p className="text-sm text-slate-200">
                <strong>bg-follow-season</strong> is a tiny library that paints a soft, animated
                seasonal background behind any container. Use it directly in{' '}
                <strong>HTML/JS</strong>, or drop in the ready-made <strong>React</strong> and{' '}
                <strong>Vue</strong> bindings.
              </p>
              <p className="text-xs text-slate-300 mt-3">
                The animation runs on a lightweight canvas layer, tuned for smoothness and minimal
                re-renders.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DocCard
                title="HTML / JavaScript"
                subtitle="Use anywhere with a single helper."
                code={`import { createSeasonalBackground } from 'bg-follow-season';

const container = document.getElementById('hero');

const bg = createSeasonalBackground(container, {
  autoSeason: true,      // detect season from date
  particleCount: 40,     // tune density
  fps: 30                // animation frame rate
});

// Switch season manually
bg.setSeason('winter');`}
              />

              <DocCard
                title="React + TypeScript"
                subtitle="Drop-in component for any layout."
                code={`import { SeasonBackground } from 'bg-follow-season';

export function Hero() {
  return (
    <SeasonBackground season="autumn" className="min-h-screen flex items-center justify-center">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold">Hello, Autumn</h1>
        <p className="text-sm text-white/80">React + TS, zero config.</p>
      </div>
    </SeasonBackground>
  );
}`}
              />

              <DocCard
                title="Vue 3 + TypeScript"
                subtitle="Directive-based integration."
                code={`import { createApp } from 'vue';
import { BgFollowSeasonPlugin } from 'bg-follow-season';
import App from './App.vue';

const app = createApp(App);
app.use(BgFollowSeasonPlugin);
app.mount('#app');`}
              />

              <DocCard
                title="Vue template"
                subtitle="Bind options and change seasons."
                code={`<template>
  <section v-bg-follow-season="{ season }" class="min-h-screen">
    <button @click="season = 'winter'">Winter</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const season = ref<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
</script>`}
              />
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur p-5">
              <h3 className="text-sm font-semibold mb-3">Install</h3>
              <CodeBlock
                code={`npm install bg-follow-season
# or
yarn add bg-follow-season
pnpm add bg-follow-season`}
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur p-5">
              <h3 className="text-sm font-semibold mb-2">Options</h3>
              <ul className="text-xs text-slate-200 space-y-1">
                <li>
                  <code className="text-amber-200">season</code> – <code>spring | summer | autumn |
                    winter</code>
                </li>
                <li>
                  <code className="text-amber-200">autoSeason</code> – infer from current date
                </li>
                <li>
                  <code className="text-amber-200">particleCount</code> – density of particles
                </li>
                <li>
                  <code className="text-amber-200">fps</code> – max frames per second
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur p-5">
              <h3 className="text-sm font-semibold mb-2">HTML-only quick start</h3>
              <CodeBlock
                code={`<div id="hero" style="min-height:100vh;"></div>
<script type="module">
  import { createSeasonalBackground } from 'https://esm.run/bg-follow-season';
  createSeasonalBackground('#hero');
</script>`}
              />
            </div>
          </aside>
        </div>
      </main>
    </SeasonBackground>
  );
};

interface DocCardProps {
  title: string;
  subtitle: string;
  code: string;
}

const DocCard: React.FC<DocCardProps> = ({ title, subtitle, code }) => (
  <article className="rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur p-4 flex flex-col gap-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-slate-300">{subtitle}</p>
    </div>
    <CodeBlock code={code} />
  </article>
);

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (
  <pre className="text-[11px] leading-relaxed bg-slate-900/80 text-slate-100 rounded-xl border border-white/5 p-3 overflow-x-auto font-mono">
    <code>{code}</code>
  </pre>
);

export default App;


