import type { Context } from 'koa';
import { getManager } from 'typeorm';
import Bill from '../../entities/Bill';
import { getSortedList } from '../../libs/utils';

const topTitle = async (ctx: Context) => {
  type QueryType = {
    start_date?: string;
    end_date?: string;
  };

  const { start_date, end_date }: QueryType = ctx.query;

  try {
    const query = await getManager()
      .createQueryBuilder(Bill, 'bills')
      .where('bills.created_at >= :start_date AND bills.created_at <= :end_date', {
        start_date: start_date ? new Date(start_date) : new Date('2021-01-01'),
        end_date: end_date ? new Date(end_date) : new Date(),
      });
    const bills = await query.getMany();

    const sortData = getSortedList(bills);
    const titles = sortData.slice(0, 19);

    ctx.body = titles;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default topTitle;
