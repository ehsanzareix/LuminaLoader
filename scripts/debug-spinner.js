const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const storyId =
    process.env.STORY_ID || 'adapters-react-luminaloader--spinner';
  const storyArgs = process.env.STORY_ARGS || 'size:80;speed:1';
  const url = process.env.STORYBOOK_BASE
    ? `${process.env.STORYBOOK_BASE}/iframe.html?id=${storyId}&args=${storyArgs}`
    : `http://localhost:6006/iframe.html?id=${storyId}&args=${storyArgs}`;
  page.on('console', (m) => console.log('PAGE LOG:', m.text()));
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  await page.goto(url, { waitUntil: 'networkidle' });
  console.log('URL:', url);
  const content = await page.content();
  console.log('BODY SNIPPET:', content.slice(0, 2000));
  const spinner =
    (await page.$('.lumina-spinner-inner')) ||
    (await page.$('.lumina-spinner'));
  console.log('SPINNER ELEMENT:', !!spinner);
  if (spinner) {
    const loader = await page.$('.lumina-loader');
    const spinnerProps = await page.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        width: s.width,
        height: s.height,
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        background: s.background,
        animation: s.animation || s['-webkit-animation'] || '',
        tokenSize: getComputedStyle(document.documentElement).getPropertyValue(
          '--lumina-size',
        ),
        tokenSpin: getComputedStyle(document.documentElement).getPropertyValue(
          '--lumina-spin-speed',
        ),
        localTokenSize: getComputedStyle(el).getPropertyValue('--lumina-size'),
      };
    }, spinner);
    const loaderProps = loader
      ? await page.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            width: s.width,
            height: s.height,
            inlineStyle: el.getAttribute('style'),
          };
        }, loader)
      : null;
    console.log('SPINNER PROPS:', spinnerProps);
    console.log('LOADER PROPS:', loaderProps);
    const bbox = await spinner.boundingBox();
    console.log('SPINNER BBOX:', bbox);
    if (loader) {
      const loaderBbox = await loader.boundingBox();
      console.log('LOADER BBOX:', loaderBbox);
      const rect = await page.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const ancestors = [];
        let p = el.parentElement;
        while (p) {
          const cs = getComputedStyle(p);
          ancestors.push({
            tag: p.tagName,
            display: cs.display,
            position: cs.position,
            transform: cs.transform,
          });
          p = p.parentElement;
        }
        return {
          rect: { x: r.x, y: r.y, width: r.width, height: r.height },
          ancestors,
          win: {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            scrollY: window.scrollY,
            docHeight: document.body.scrollHeight,
          },
        };
      }, loader);
      console.log('LOADER GETBOUNDINGCLIENTRECT + ANCESTORS:', rect);
    }
  }
  await browser.close();
})();
