import type { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import Item from '../../entities/Item';

const listItems = async (ctx: Context) => {
  type QueryType = {
    name?: string;
    divide?: string;
    native?: string;
    cursor?: string;
  };

  const { name, divide, native, cursor }: QueryType = ctx.query;

  try {
    const itemRepo = await getRepository(Item);
    const query = await getManager()
      .createQueryBuilder(Item, 'items')
      .limit(30)
      .orderBy('items.num', 'DESC');

    if (name) {
      query.andWhere('items.name like :name', {
        name: `%${name}%`,
      });
    }

    if (divide) {
      query.andWhere('items.divide like :divide', {
        divide: `%${divide}%`,
      });
    }

    if (native) {
      query.andWhere('items.native like :native', {
        native: `%${native}%`,
      });
    }

    if (cursor) {
      const item = await itemRepo.findOne({ id: cursor });

      if (!item) {
        ctx.status = 404;
        ctx.body = '존재하지 않는 품목입니다.';
        return;
      }

      query.andWhere('items.num < :num', { num: item.num });
    }

    const items = await query.getMany();

    ctx.body = items;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default listItems;
