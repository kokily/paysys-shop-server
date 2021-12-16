import type { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import User from '../../entities/User';
import { serialize } from '../../libs/utils';

const listUsers = async (ctx: Context) => {
  type QueryType = {
    username?: string;
    cursor?: string;
  };

  const { username, cursor }: QueryType = ctx.query;

  try {
    const userRepo = await getRepository(User);
    const query = await getManager()
      .createQueryBuilder(User, 'users')
      .limit(20)
      .orderBy('users.created_at', 'DESC')
      .addOrderBy('users.id', 'DESC');

    if (username) {
      query.andWhere('users.username like :username', {
        username: `%${username}%`,
      });
    }

    if (cursor) {
      const user = await userRepo.findOne({ id: cursor });

      if (!user) {
        ctx.status = 404;
        ctx.body = '존재';
        return;
      }

      query.andWhere('users.created_at < :date', {
        date: user.created_at,
      });

      query.orWhere('users.created_at = :date AND users.id = :id', {
        date: user.created_at,
        id: user.id,
      });
    }

    const users = await query.getMany();

    ctx.body = users.map((user) => ({
      ...serialize(user),
    }));
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default listUsers;
