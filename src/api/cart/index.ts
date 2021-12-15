import Router from 'koa-router';
import { authorized } from '../../libs/middlewares/authorized';
import addCart from './add.ctrl';

const cart = new Router();

cart.post('/', authorized, addCart);

export default cart;
