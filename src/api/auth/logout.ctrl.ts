import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import { setCookies } from '../../libs/token';
import Token from '../../entities/Token';
import User from '../../entities/User';

const logout = async (ctx: Context) => {
  try {
    const { user_id } = ctx.state.user;
    const userRepo = await getRepository(User);
    const tokenRepo = await getRepository(Token);
    const user = await userRepo.findOne(user_id);

    if (!user) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용하세요';
      return;
    }

    const token = await tokenRepo.findOne({ fk_user_id: user.id });

    if (!token) {
      ctx.status = 401;
      ctx.body = '토큰이 존재하지 않습니다.';
      return;
    }

    setCookies(ctx);

    ctx.state.user = undefined;

    await tokenRepo.delete(token.id);

    ctx.status = 204;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default logout;
