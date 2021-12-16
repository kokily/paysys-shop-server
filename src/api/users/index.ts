import Router from 'koa-router';
import { authorized } from '../../libs/middlewares/authorized';
import changePassword from './pass.ctrl';

const users = new Router();

users.patch('/password', authorized, changePassword);

export default users;

/*
users.get('/', authorizedAdmin, listUsers);
users.post('/admin/:id', authorizedAdmin, setAdmin);
users.post('/employee/:id', authorizedAdmin, setEmployee);

users.get('/:id', authorizedAdmin, readUser);
users.delete('/:id', authorizedAdmin, removeUser);
*/
