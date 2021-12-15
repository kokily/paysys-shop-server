import Router from 'koa-router';
import { authorized } from '../../libs/middlewares/authorized';
import addBill from './add.ctrl';
import listBills from './list.ctrl';
import readBill from './read.ctrl';
import removeBill from './remove.ctrl';
import restoreBill from './restore.ctrl';

const bills = new Router();

bills.post('/', authorized, addBill);
bills.get('/', authorized, listBills);
bills.get('/:id', authorized, readBill);
bills.delete('/:id', authorized, removeBill);
bills.patch('/:id', authorized, restoreBill);

export default bills;
