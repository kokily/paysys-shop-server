import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { serialize } from '../../libs/utils';

const readUser = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const userRepo = await getRepository(User);
    const user = await userRepo.findOne(id);

    if (!user) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 사용자입니다.';
      return;
    }

    ctx.body = serialize(user);
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default readUser;
