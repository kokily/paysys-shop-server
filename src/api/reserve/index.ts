import Router from 'koa-router';
import { authorizedAdmin } from '../../libs/middlewares/authorized';
import addReserve from './add.ctrl';
import removeReserve from './remove.ctrl';

const reserve = new Router();

reserve.post('/', authorizedAdmin, addReserve);
reserve.delete('/:id', authorizedAdmin, removeReserve);

export default reserve;
