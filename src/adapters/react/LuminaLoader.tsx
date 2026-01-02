import React, { useEffect } from 'react';
import type { FC } from 'react';
import { createLoader } from '../../api';
import type { LoaderOptions } from '../../core/LuminaLoader';

export type LuminaReactProps = Omit<LoaderOptions, 'target'> & {
  show?: boolean;
  container?: HTMLElement | string; // optional override for where overlay inline should attach
};

export const LuminaLoaderReact: FC<LuminaReactProps> = ({
  show = true,
  container,
  ...opts
}) => {
  const hostRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targetEl = container
      ? (container as HTMLElement)
      : (hostRef.current ?? document.body);

    const finalTarget = opts.overlay && !container ? document.body : targetEl;

    const loader = createLoader({
      ...(opts as LoaderOptions),
      target: finalTarget,
    });
    if (show) loader.show();
    return () => loader.destroy();
  }, [show, container, JSON.stringify(opts)]);

  return <span ref={hostRef as any} />;
};

export default LuminaLoaderReact;
