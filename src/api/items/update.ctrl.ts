import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import { validateBody } from '../../libs/utils';
import Item from '../../entities/Item';

const updateItem = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  type RequestType = {
    name: string;
    divide: string;
    native: string;
    unit: string;
    price: number;
  };

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    divide: Joi.string().required(),
    native: Joi.string().required(),
    unit: Joi.string().required(),
    price: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { name, divide, native, unit, price }: RequestType = ctx.request.body;

  try {
    const itemRepo = await getRepository(Item);

    await itemRepo.update(
      { id },
      { name, divide, native, unit, price, updated_at: new Date() }
    );

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default updateItem;
