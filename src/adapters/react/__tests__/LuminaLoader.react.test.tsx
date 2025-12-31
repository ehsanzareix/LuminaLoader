import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { LuminaLoaderReact } from '../LuminaLoader';

afterEach(() => cleanup());

test('renders loader via React adapter and cleans up', () => {
  const { unmount } = render(<LuminaLoaderReact type="spinner" show={true} />);
  expect(document.querySelector('.lumina-root')).toBeTruthy();
  unmount();
  expect(document.querySelector('.lumina-root')).toBeNull();
});
