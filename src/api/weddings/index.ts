import Router from 'koa-router';
import { authorizedAdmin } from '../../libs/middlewares/authorized';
import listWeddings from './list.ctrl';
import readWedding from './read.ctrl';

const weddings = new Router();

weddings.get('/', authorizedAdmin, listWeddings);
weddings.get('/:id', authorizedAdmin, readWedding);

export default weddings;
