import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import Bill from '../../entities/Bill';
import { validateBody } from '../../libs/utils';

const addReserve = async (ctx: Context) => {
  type RequestType = {
    bill_id: string;
    reserve: number;
  };

  const schema = Joi.object().keys({
    bill_id: Joi.string().required(),
    reserve: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { bill_id, reserve }: RequestType = ctx.request.body;

  try {
    const billRepo = await getRepository(Bill);
    const bill = await billRepo.findOne({ id: bill_id });

    if (!bill) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 빌지입니다.';
      return;
    }

    let updateBill = { ...bill, reserve };

    await billRepo.update({ id: bill_id }, { ...updateBill });

    ctx.body = bill;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default addReserve;
