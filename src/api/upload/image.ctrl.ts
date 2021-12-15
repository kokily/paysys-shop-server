import type { Context, Next } from 'koa';
import uploadImage, { FileType } from '../../libs/s3upload';

const image = async (ctx: Context, next: Next) => {
  if (ctx.request.files) {
    const file = ctx.request.files.file;
    const { key, url } = await uploadImage(file as FileType);

    ctx.body = { key, url };
  } else {
    return next();
  }
};

export default image;
