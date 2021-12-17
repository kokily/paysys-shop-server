import Router from 'koa-router';
import { authorizedAdmin } from '../../libs/middlewares/authorized';
import addSign from './add.ctrl';
import removeSign from './remove.ctrl';

const sign = new Router();

sign.post('/', authorizedAdmin, addSign);
sign.patch('/', authorizedAdmin, removeSign);

export default sign;
