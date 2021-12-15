import type { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import Bill from '../../entities/Bill';

const listBills = async (ctx: Context) => {
  type QueryType = {
    user_id?: string;
    title?: string;
    hall?: string;
    cursor?: string;
  };

  const { user_id, title, hall, cursor }: QueryType = ctx.query;

  try {
    const billRepo = await getRepository(Bill);
    const query = await getManager()
      .createQueryBuilder(Bill, 'bills')
      .limit(20)
      .orderBy('bills.created_at', 'DESC')
      .addOrderBy('bills.id', 'DESC');

    if (user_id) {
      query.andWhere('bills.user_id = :user_id', { user_id });
    }

    if (title) {
      query.andWhere('bills.title like :title', {
        title: `%${title}%`,
      });
    }

    if (hall) {
      query.andWhere('bills.hall like :hall', {
        hall: `%${hall}%`,
      });
    }

    if (cursor) {
      const bill = await billRepo.findOne({ id: cursor });

      if (!bill) {
        ctx.status = 404;
        ctx.body = '해당 빌지가 존재하지 않습니다.';
        return;
      }

      query.andWhere('bills.created_at < :date', {
        date: bill.created_at,
      });

      query.orWhere('bills.created_at = :date AND bills.id < :id', {
        date: bill.created_at,
        id: bill.id,
      });
    }

    const bills = await query.getMany();

    ctx.body = bills;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default listBills;
