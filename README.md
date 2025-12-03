## bg-follow-season

Season-aware background animations for **HTML/JS**, **React (TypeScript)**, and **Vue 3 (TypeScript)**.

### Install

```bash
npm install bg-follow-season
# or
yarn add bg-follow-season
pnpm add bg-follow-season
```

### Core HTML / JavaScript

```ts
import { createSeasonalBackground } from 'bg-follow-season';

const container = document.getElementById('hero');

const bg = createSeasonalBackground(container!, {
  autoSeason: true,      // detect season from current date
  particleCount: 40,     // tune density
  fps: 30                // animation frame rate cap
});

// Change season manually
bg.setSeason('winter');
```

Or directly in a static page:

```html
<div id="hero" style="min-height: 100vh;"></div>
<script type="module">
  import { createSeasonalBackground } from 'https://esm.run/bg-follow-season';
  createSeasonalBackground('#hero');
</script>
```

### React + TypeScript

```tsx
import { SeasonBackground } from 'bg-follow-season';

export function Hero() {
  return (
    <SeasonBackground season="autumn" className="min-h-screen flex items-center justify-center">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold">Hello, Autumn</h1>
        <p className="text-sm text-white/80">React + TS, zero config.</p>
      </div>
    </SeasonBackground>
  );
}
```

### Vue 3 + TypeScript

```ts
// main.ts
import { createApp } from 'vue';
import { BgFollowSeasonPlugin } from 'bg-follow-season';
import App from './App.vue';

const app = createApp(App);
app.use(BgFollowSeasonPlugin);
app.mount('#app');
```

```vue
<template>
  <section v-bg-follow-season="{ season }" class="min-h-screen">
    <button @click="season = 'winter'">Winter</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const season = ref<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
</script>
```

### Options

- **`season`**: `'spring' | 'summer' | 'autumn' | 'winter'`
- **`autoSeason`**: infer season from current date (default `true`)
- **`particleCount`**: number of particles (default `40`)
- **`fps`**: max frames per second (default `30`)

### Scripts

- **`npm run build`** – build the library with `tsup`
- **`npm run dev`** – run the docs/demo site (Vite + React)
- **`npm run preview`** – preview the built docs


