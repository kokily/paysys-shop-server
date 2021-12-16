import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import User from '../../entities/User';

const setEmployee = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

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
        admin: false,
        updated_at: new Date(),
      }
    );

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default setEmployee;
