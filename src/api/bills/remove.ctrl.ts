import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Bill from '../../entities/Bill';
import User from '../../entities/User';

const removeBill = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const { user_id, admin } = ctx.state.user;
    const billRepo = await getRepository(Bill);
    const bill = await billRepo.findOne(id);

    if (!user_id || !admin) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용해 주세요';
      return;
    }

    if (!bill) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 빌지입니다.';
      return;
    }

    if (user_id === bill.user_id || admin) {
      await billRepo.delete(id);

      ctx.status = 204;
    } else {
      ctx.status = 403;
      ctx.body = '삭제 권한이 없습니다.';
      return;
    }
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeBill;
