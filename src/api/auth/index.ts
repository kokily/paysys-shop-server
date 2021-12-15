import Router from 'koa-router';
import check from './check.ctrl';
import login from './login.ctrl';
import logout from './logout.ctrl';
import register from './register.ctrl';

const auth = new Router();

auth.get('/check', check);
auth.post('/login', login);
auth.post('/logout', logout);
auth.post('/register', register);

export default auth;
