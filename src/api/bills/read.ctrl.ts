import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Bill from '../../entities/Bill';

const readBill = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const billRepo = await getRepository(Bill);
    const bill = await billRepo.findOne(id);

    if (!bill) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 빌지입니다.';
      return;
    }

    ctx.body = bill;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default readBill;
