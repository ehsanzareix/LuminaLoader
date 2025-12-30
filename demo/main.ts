import { createLoader } from '../src/index';
const loader = createLoader({ target: '#app', size: 80 });
loader.show();
setTimeout(()=> loader.hide(), 3000);
