import Router from 'koa-router';
import { authorized } from '../../libs/middlewares/authorized';
import addCart from './add.ctrl';
import removeCart from './remove.ctrl';
import removeOneCart from './update.ctrl';
import viewCart from './view.ctrl';

const cart = new Router();

cart.post('/', authorized, addCart);
cart.delete('/', authorized, removeCart);
cart.patch('/:id', authorized, removeOneCart);
cart.get('/', authorized, viewCart);

export default cart;
