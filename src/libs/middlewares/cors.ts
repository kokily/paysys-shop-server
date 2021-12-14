import type { Middleware } from 'koa';
import { isProd } from '../constants';

const cors: Middleware = (ctx, next) => {
  const allowedHosts = [/^https:\/\/paysys.kr$/, /^https:\/\/image.paysys.kr$/];

  if (!isProd) {
    allowedHosts.push(/^http:\/\/localhost/);
  }

  const { origin } = ctx.headers;

  if (origin) {
    const valid = allowedHosts.some((regex) => regex.test(origin));

    if (!valid) return next();

    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Credentials', 'true');

    if (ctx.method === 'OPTIONS') {
      ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Cookie'
      );
      ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
    }

    return next();
  } else {
    return next();
  }
};

export default cors;
