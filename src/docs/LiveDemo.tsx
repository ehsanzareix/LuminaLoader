import React from 'react';
import { LuminaLoaderReact } from '../adapters/react/LuminaLoader';

export type LiveDemoProps = {
  type?:
    | 'spinner'
    | 'dots'
    | 'bars'
    | 'pulse'
    | 'gradient-ring'
    | 'orbit'
    | 'wave'
    | 'image'
    | 'progress';
  size?: number;
  color?: string;
  speed?: number;
  theme?: 'auto' | 'light' | 'dark';
};

export const LiveDemo: React.FC<LiveDemoProps> = ({
  type = 'spinner',
  size = 48,
  color = '#4fa94d',
  speed = 1,
  theme = 'auto',
}) => {
  const style = {
    '--lumina-color': color,
    '--lumina-size': `${size}px`,
    '--lumina-spin-speed': `${speed}s`,
    display: 'inline-block',
    padding: '18px',
  } as React.CSSProperties;

  return (
    <div style={style}>
      {/* The React adapter will mount the loader into the host div when not using overlay */}
      <LuminaLoaderReact
        type={type}
        size={size}
        color={color}
        speed={speed}
        theme={theme}
        show
      />
    </div>
  );
};

export default LiveDemo;
