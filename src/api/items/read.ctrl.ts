import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Item from '../../entities/Item';

const readItem = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const itemRepo = await getRepository(Item);
    const item = await itemRepo.findOne(id);

    if (!item) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 품목입니다.';
      return;
    }

    ctx.body = item;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default readItem;
