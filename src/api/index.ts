import Router from 'koa-router';
import auth from './auth';
import items from './items';
import upload from './upload';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/items', items.routes());
api.use('/upload', upload.routes());

export default api;
