import type { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import Wedding from '../../entities/wedding/Wedding';

const listWeddings = async (ctx: Context) => {
  type QueryType = {
    date?: string;
    cursor?: string;
  };

  const { date, cursor }: QueryType = ctx.query;

  try {
    const weddingRepo = await getRepository(Wedding);
    const query = await getManager()
      .createQueryBuilder(Wedding, 'weddings')
      .limit(20)
      .orderBy('weddings.created_at', 'DESC')
      .addOrderBy('weddings.id', 'DESC');

    if (date) {
      query.andWhere('weddings.wedding_at like :date', {
        date: `%${date}%`,
      });
    }

    if (cursor) {
      const wedding = await weddingRepo.findOne({ id: cursor });

      if (!wedding) {
        ctx.status = 404;
        ctx.body = '존재하지 않는 빌지입니다.';
        return;
      }

      query.andWhere('weddings.created_at < :date', {
        date: wedding.created_at,
      });

      query.orWhere('weddings.created_at = :date AND weddings.id < :id', {
        date: wedding.created_at,
        id: wedding.id,
      });
    }

    const weddings = await query.getMany();

    ctx.body = weddings;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default listWeddings;
