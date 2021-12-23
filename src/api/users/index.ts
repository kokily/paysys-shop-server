import Router from 'koa-router';
import { authorized, authorizedAdmin } from '../../libs/middlewares/authorized';
import setAdmin from './admin.ctrl';
import setEmployee from './employee.ctrl';
import listUsers from './list.ctrl';
import changePassword from './pass.ctrl';
import readUser from './read.ctrl';
import removeUser from './remove.ctrl';

const users = new Router();

users.post('/admin', authorizedAdmin, setAdmin);
users.post('/employee', authorizedAdmin, setEmployee);
users.get('/', authorizedAdmin, listUsers);
users.patch('/password', authorized, changePassword);
users.get('/:id', authorizedAdmin, readUser);
users.delete('/:id', authorizedAdmin, removeUser);

export default users;
