import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Bill from '../../entities/Bill';

const removeReserve = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const billRepo = await getRepository(Bill);
    const bill = await billRepo.findOne(id);

    if (!bill) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 빌지입니다.';
      return;
    }

    if (bill.reserve) {
      let removeBill = { ...bill, reserve: 0 };

      await billRepo.update({ id }, { ...removeBill });

      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = '예약금이 없습니다.';
      return;
    }
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeReserve;
