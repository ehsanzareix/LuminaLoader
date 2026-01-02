import { useEffect, useRef, useMemo } from 'react';
import type { FC } from 'react';
import { createLoader } from '../../api';
import type { LoaderOptions } from '../../core/LuminaLoader';

export type LuminaReactProps = Omit<LoaderOptions, 'target'> & {
  show?: boolean;
  container?: HTMLElement | string;
  onShow?: () => void;
  onHide?: () => void;
};

export const LuminaLoaderReact: FC<LuminaReactProps> = ({
  show = true,
  container,
  onShow,
  onHide,
  ...opts
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<ReturnType<typeof createLoader> | null>(null);

  // Memoize options to prevent unnecessary recreations
  const optionsKey = useMemo(() => JSON.stringify(opts), [opts]);

  useEffect(() => {
    let targetEl: HTMLElement | null = null;
    if (container) {
      if (typeof container === 'string') {
        const q = document.querySelector(container);
        targetEl = q instanceof HTMLElement ? q : null;
      } else {
        targetEl = container as HTMLElement;
      }
    } else {
      targetEl = hostRef.current;
    }

    const finalTarget: HTMLElement | string =
      opts.overlay && !container ? document.body : (targetEl ?? document.body);

    loaderRef.current = createLoader({
      ...(opts as LoaderOptions),
      target: finalTarget,
    });

    if (show) {
      loaderRef.current.show();
      onShow?.();
    }

    return () => {
      loaderRef.current?.destroy();
      loaderRef.current = null;
    };
  }, [container, optionsKey]);

  useEffect(() => {
    if (!loaderRef.current) return;

    if (show) {
      loaderRef.current.show();
      onShow?.();
    } else {
      loaderRef.current.hide();
      onHide?.();
    }
  }, [show, onShow, onHide]);

  if (opts.overlay) {
    return null;
  }

  return <div ref={hostRef} className="lumina-loader-host" />;
};

export default LuminaLoaderReact;
