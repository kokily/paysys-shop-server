import type { Context } from 'koa';
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-body';
import sslify from 'koa-sslify';
import serve from 'koa-static';
import send from 'koa-send';
import path from 'path';
import cors from './libs/middlewares/cors';
import jwtMiddleware from './libs/middlewares/jwtMiddleware';
import api from './api';
import { isProd } from './libs/constants';

const app = new Koa();
const router = new Router();
const rootDir = path.resolve(process.cwd(), './../paysys-shop-client/out');

router.use('/api', api.routes());

app.use(cors);
isProd && app.use(sslify({ port: 443 }));
app.use(logger());
app.use(jwtMiddleware);
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(rootDir));
app.use(async (ctx: Context) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', {
      root: rootDir,
    });
  }
});

export default app;
