import Router from 'koa-router';
import { authorized } from '../../libs/middlewares/authorized';
import addBill from './add.ctrl';

const bills = new Router();

bills.post('/', authorized, addBill);

export default bills;
