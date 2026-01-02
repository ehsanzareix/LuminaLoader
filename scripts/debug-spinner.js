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
  // Try to find the spinner either in top-level page or inside the Storybook preview iframe
  let spinner =
    (await page.$('.lumina-spinner-inner')) ||
    (await page.$('.lumina-spinner'));
  let loader = null;
  if (!spinner && (await page.$('#storybook-preview-iframe')) !== null) {
    const frame = page.frame({ url: /iframe.html/ });
    if (frame) {
      spinner =
        (await frame.$('.lumina-spinner-inner')) ||
        (await frame.$('.lumina-spinner'));
      loader = spinner ? await frame.$('.lumina-loader') : null;
    }
  } else if (spinner) {
    loader = await page.$('.lumina-loader');
  }

  console.log('SPINNER ELEMENT:', !!spinner);
  if (spinner) {
    const spinnerProps = await (spinner.evaluateHandle
      ? spinner.evaluateHandle((el) => {
          const s = getComputedStyle(el);
          return {
            width: s.width,
            height: s.height,
            display: s.display,
            visibility: s.visibility,
            opacity: s.opacity,
            background: s.background,
            animation: s.animation || s['-webkit-animation'] || '',
            tokenSize: getComputedStyle(
              document.documentElement,
            ).getPropertyValue('--lumina-size'),
            tokenSpin: getComputedStyle(
              document.documentElement,
            ).getPropertyValue('--lumina-spin-speed'),
            localTokenSize:
              getComputedStyle(el).getPropertyValue('--lumina-size'),
          };
        })
      : null);

    // fallback for environments without evaluateHandle
    let spinnerPropsJson = null;
    try {
      spinnerPropsJson = spinnerProps ? await spinnerProps.jsonValue() : null;
    } catch (e) {
      // Older Playwright bindings, fallback
      spinnerPropsJson = await spinner.executionContext().evaluate((el) => {
        const s = getComputedStyle(el);
        return {
          width: s.width,
          height: s.height,
          display: s.display,
          visibility: s.visibility,
          opacity: s.opacity,
          background: s.background,
          animation: s.animation || s['-webkit-animation'] || '',
          tokenSize: getComputedStyle(
            document.documentElement,
          ).getPropertyValue('--lumina-size'),
          tokenSpin: getComputedStyle(
            document.documentElement,
          ).getPropertyValue('--lumina-spin-speed'),
          localTokenSize:
            getComputedStyle(el).getPropertyValue('--lumina-size'),
        };
      }, spinner);
    }

    console.log('SPINNER PROPS:', spinnerPropsJson);
    if (loader) {
      const loaderProps = await (loader.evaluateHandle
        ? loader.evaluateHandle((el) => {
            const s = getComputedStyle(el);
            return {
              width: s.width,
              height: s.height,
              inlineStyle: el.getAttribute('style'),
            };
          })
        : null);
      try {
        console.log(
          'LOADER PROPS:',
          loaderProps ? await loaderProps.jsonValue() : null,
        );
      } catch (e) {
        console.log('LOADER PROPS: <unavailable>');
      }
    }

    const bbox = await spinner.boundingBox();
    console.log('SPINNER BBOX:', bbox);
    if (loader) {
      const loaderBbox = await loader.boundingBox();
      console.log('LOADER BBOX:', loaderBbox);
      const rect = await (loader.evaluateHandle
        ? loader.evaluateHandle((el) => {
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
          })
        : null);
      try {
        console.log(
          'LOADER GETBOUNDINGCLIENTRECT + ANCESTORS:',
          loader ? await rect.jsonValue() : null,
        );
      } catch (e) {
        console.log('LOADER GETBOUNDINGCLIENTRECT + ANCESTORS: <unavailable>');
      }
    }
  }
  await browser.close();
})();
