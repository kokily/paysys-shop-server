import type { Context } from 'koa';
import loadCart from '../../libs/loadCart';

const viewCart = async (ctx: Context) => {
  try {
    const { user_id } = ctx.state.user;

    if (!user_id) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용하세요';
    }

    const cart = await loadCart(user_id);

    if (!cart) {
      ctx.status = 404;
      ctx.body = '카트가 존재하지 않습니다';
      return;
    }

    ctx.body = cart;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default viewCart;
