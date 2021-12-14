import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-body';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => (ctx.body = 'Hello!'));

app.use(logger());
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
