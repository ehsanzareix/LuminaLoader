const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 6006;
const reactDir = path.join(__dirname, '..', 'storybook-static');
const vueDir = path.join(__dirname, '..', 'storybook-vue-static');

function sendFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    const stream = fs.createReadStream(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const types = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
    };
    res.setHeader('Content-Type', types[ext] || 'text/plain');
    stream.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  // parse full URL to separate pathname and query
  const base = `http://localhost`;
  const reqUrl = new URL(req.url || '/', base);
  const pathname = decodeURIComponent(reqUrl.pathname);

  // serve Vue under /vue/
  if (pathname.startsWith('/vue/')) {
    const rel = pathname.replace(/^\/vue\//, '') || 'index.html';
    const filePath = path.join(vueDir, rel);
    sendFile(res, filePath);
    return;
  }

  // serve React under /react/ and default to react index
  if (pathname.startsWith('/react/')) {
    const rel = pathname.replace(/^\/react\//, '') || 'index.html';
    const filePath = path.join(reactDir, rel);
    sendFile(res, filePath);
    return;
  }

  // default root: redirect to /react/
  res.statusCode = 302;
  res.setHeader('Location', '/react/');
  res.end();
});

server.listen(PORT, () => {
  console.log(
    `Combined Storybook server listening on http://localhost:${PORT}/`,
  );
  console.log(`React stories at /react/, Vue stories at /vue/`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
