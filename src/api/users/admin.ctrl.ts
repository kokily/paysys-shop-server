import Joi from 'joi';
import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { validateBody } from '../../libs/utils';

const setAdmin = async (ctx: Context) => {
  type RequestType = {
    id: string;
  };

  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { id }: RequestType = ctx.request.body;

  try {
    const userRepo = await getRepository(User);
    const user = await userRepo.findOne(id);

    if (!user) {
      ctx.status = 404;
      ctx.body = '해당 사용자가 존재하지 않습니다.';
      return;
    }

    await userRepo.update(
      {
        id,
      },
      {
        admin: true,
        updated_at: new Date(),
      }
    );

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default setAdmin;
