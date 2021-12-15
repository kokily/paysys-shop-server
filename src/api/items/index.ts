import Router from 'koa-router';
import { authorized, authorizedAdmin } from '../../libs/middlewares/authorized';
import addItem from './add.ctrl';
import listItems from './list.ctrl';
import readItem from './read.ctrl';
import removeItem from './remove.ctrl';
import updateItem from './update.ctrl';

const items = new Router();

items.post('/', authorizedAdmin, addItem);
items.get('/', authorized, listItems);
items.get('/:id', authorized, readItem);
items.delete('/:id', authorizedAdmin, removeItem);
items.put('/:id', authorizedAdmin, updateItem);

export default items;
