import Router from 'koa-router';
import image from './image.ctrl';

const upload = new Router();

upload.post('/', image);

export default upload;
