import type { App, Plugin } from 'vue';
import { createSeasonalBackground, BgFollowSeasonOptions } from '../core';

export const BgFollowSeasonDirective = {
  mounted(el: HTMLElement, binding: { value?: BgFollowSeasonOptions }) {
    const instance = createSeasonalBackground(el, binding.value);
    // @ts-expect-error: non-standard property
    el.__bgFollowSeason__ = instance;
  },
  updated(el: HTMLElement, binding: { value?: BgFollowSeasonOptions }) {
    // @ts-expect-error: non-standard property
    const instance = el.__bgFollowSeason__;
    if (instance && binding.value?.season) {
      instance.setSeason(binding.value.season);
    }
  },
  unmounted(el: HTMLElement) {
    // @ts-expect-error: non-standard property
    const instance = el.__bgFollowSeason__;
    if (instance) {
      instance.destroy();
    }
  }
};

export const BgFollowSeasonPlugin: Plugin = {
  install(app: App) {
    app.directive('bg-follow-season', BgFollowSeasonDirective);
  }
};


