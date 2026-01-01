const { spawn } = require('child_process');

function start(cmd, args) {
  const p = spawn(cmd, args, { shell: true, stdio: 'inherit' });
  p.on('exit', (code, signal) => {
    console.log(`${cmd} ${args.join(' ')} exited with ${code ?? signal}`);
  });
  return p;
}

// Start both servers reliably
const servers = [
  start('npx', ['http-server', 'storybook-static', '-p', '6006', '-c-1']),
  start('npx', ['http-server', 'storybook-vue-static', '-p', '6007', '-c-1']),
];

process.on('SIGINT', () => {
  servers.forEach((s) => s.kill());
  process.exit(0);
});

// Prevent the process from exiting
setInterval(() => {}, 1000);
