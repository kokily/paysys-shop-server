import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../../entities/User';
import { validateBody } from '../../libs/utils';

const register = async (ctx: Context) => {
  type RequestType = {
    username: string;
    password: string;
  };

  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { username, password }: RequestType = ctx.request.body;

  try {
    const userRepo = await getRepository(User);
    const exists = await userRepo.findOne({ username });
    let admin = false;

    if (exists) {
      ctx.status = 409;
      ctx.body = '이미 사용 중인 아이디입니다.';
      return;
    }

    if (
      username === process.env.ADMIN_NAME1 ||
      username === process.env.ADMIN_NAME2 ||
      username === process.env.ADMIN_NAME3 ||
      username === process.env.ADMIN_NAME4
    ) {
      admin = true;
    }

    const user = new User();

    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.admin = admin;

    await userRepo.save(user);

    ctx.body = user.username;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default register;
