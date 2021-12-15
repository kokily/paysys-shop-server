import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Item from '../../entities/Item';

const removeItem = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const itemRepo = await getRepository(Item);

    await itemRepo.delete(id);

    ctx.status = 204;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeItem;
