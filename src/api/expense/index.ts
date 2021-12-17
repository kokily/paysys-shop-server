import Router from 'koa-router';
import { authorizedAdmin } from '../../libs/middlewares/authorized';
import addExpense from './add.ctrl';
import removeExpense from './remove.ctrl';
import updateExpense from './update.ctrl';

const expense = new Router();

expense.post('/', authorizedAdmin, addExpense);
expense.delete('/:id', authorizedAdmin, removeExpense);
expense.put('/', authorizedAdmin, updateExpense);

export default expense;
