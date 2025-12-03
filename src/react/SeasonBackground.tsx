import React, { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { createSeasonalBackground, type BgFollowSeasonOptions, type Season } from '../core';

export interface SeasonBackgroundOwnProps extends BgFollowSeasonOptions {
  season?: Season;
  className?: string;
  children?: React.ReactNode;
}

export type SeasonBackgroundProps<TTag extends ElementType = 'div'> = {
  as?: TTag;
} & SeasonBackgroundOwnProps &
  Omit<ComponentPropsWithoutRef<TTag>, keyof SeasonBackgroundOwnProps | 'as'>;

function SeasonBackgroundInner<TTag extends ElementType = 'div'>(
  props: SeasonBackgroundProps<TTag>
) {
  const { as, children, season, className, ...options } = props;
  const Tag = (as ?? 'div') as ElementType;

  const ref = useRef<HTMLElement | null>(null);
  const instanceRef = useRef<ReturnType<typeof createSeasonalBackground> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    instanceRef.current = createSeasonalBackground(ref.current, {
      ...options,
      season
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (season && instanceRef.current) {
      instanceRef.current.setSeason(season);
    }
  }, [season]);

  return (
    <Tag
      ref={ref as React.Ref<any>}
      className={className}
      {...(options as Record<string, unknown>)}
    >
      {children}
    </Tag>
  );
}

export const SeasonBackground = React.memo(SeasonBackgroundInner) as typeof SeasonBackgroundInner;


