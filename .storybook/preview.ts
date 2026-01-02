import '../src/styles/lumina.css';

export const globalTypes = {
  luminaColor: {
    name: 'Lumina color',
    description: 'CSS token --lumina-color',
    defaultValue: '#4fa94d',
    toolbar: {
      icon: 'circle',
      items: [
        { value: '#4fa94d', title: 'Green' },
        { value: '#FF4785', title: 'Pink' },
        { value: '#1EA7FD', title: 'Blue' },
      ],
    },
  },
  luminaSize: {
    name: 'Lumina size',
    description: 'CSS token --lumina-size',
    defaultValue: '48px',
    toolbar: {
      icon: 'zoom',
      items: [
        { value: '24px', title: '24' },
        { value: '48px', title: '48' },
        { value: '80px', title: '80' },
      ],
    },
  },
  luminaSpinSpeed: {
    name: 'Spin speed',
    description: 'CSS token --lumina-spin-speed',
    defaultValue: '1s',
    toolbar: {
      icon: 'clock',
      items: [
        { value: '0.5s', title: 'Fast' },
        { value: '1s', title: 'Normal' },
        { value: '2s', title: 'Slow' },
      ],
    },
  },
};

export const decorators = [
  (Story: any, context: any) => {
    const id = 'lumina-tokens-style';
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    const { luminaColor, luminaSize, luminaSpinSpeed } = context.globals as any;
    el.textContent = `:root { --lumina-color: ${luminaColor}; --lumina-size: ${luminaSize}; --lumina-spin-speed: ${luminaSpinSpeed}; }`;
    return Story();
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
};
