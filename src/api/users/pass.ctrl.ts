import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../../entities/User';
import { validateBody } from '../../libs/utils';

const changePassword = async (ctx: Context) => {
  type RequestType = {
    password: string;
  };

  const schema = Joi.object().keys({
    password: Joi.string().min(4).required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { password }: RequestType = ctx.request.body;

  try {
    const { user_id } = ctx.state.user;

    if (!user_id) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용하세요';
      return;
    }

    const userRepo = await getRepository(User);
    const user = await userRepo.findOne(user_id);

    if (!user) {
      ctx.status = 404;
      ctx.body = '접속된 사용자가 없습니다.';
      return;
    }

    await userRepo.update(
      { id: user.id },
      {
        password: await bcrypt.hash(password, 10),
      }
    );

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default changePassword;
