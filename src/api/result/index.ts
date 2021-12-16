import Router from 'koa-router';
import { authorizedAdmin } from '../../libs/middlewares/authorized';
import topTitle from './top.ctrl';

const result = new Router();

result.get('/toptitle', authorizedAdmin, topTitle);

export default result;
