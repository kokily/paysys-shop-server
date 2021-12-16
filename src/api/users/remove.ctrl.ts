import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import User from '../../entities/User';

const removeUser = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const userRepo = await getRepository(User);

    await userRepo.delete(id);

    ctx.status = 204;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeUser;
