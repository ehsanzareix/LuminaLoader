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
  useEffect(() => {
    const loader = createLoader({
      ...(opts as LoaderOptions),
      target: container ?? document.body,
    });
    if (show) loader.show();
    return () => loader.destroy();
  }, [show, container, JSON.stringify(opts)]);

  return null;
};

export default LuminaLoaderReact;
