import type { Middleware } from 'koa';
import { getRepository } from 'typeorm';
import User from '../../entities/User';

export const authorized: Middleware = async (ctx, next) => {
  const userRepo = getRepository(User);
  const user = await userRepo.findOne(ctx.state.user_id);

  if (!user) {
    ctx.status = 401;
    ctx.body = '로그인 후 이용해 주세요';
    return;
  }

  return next();
};

export const authorizedAdmin: Middleware = async (ctx, next) => {
  const userRepo = getRepository(User);
  const user = await userRepo.findOne(ctx.state.user_id);

  if (!user) {
    ctx.status = 401;
    ctx.body = '로그인 후 이용해 주세요';
    return;
  }

  if (!user.admin) {
    ctx.status = 401;
    ctx.body = '관리자 로그인이 필요합니다.';
  }

  return next();
};
