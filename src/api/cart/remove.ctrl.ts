import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Cart from '../../entities/Cart';
import loadCart from '../../libs/loadCart';

const removeCart = async (ctx: Context) => {
  try {
    const { user_id } = ctx.state.user;

    if (!user_id) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용하세요';
      return;
    }

    const cartRepo = await getRepository(Cart);
    const cart = await loadCart(user_id);

    if (!cart) {
      ctx.status = 404;
      ctx.body = '카트가 존재하지 않습니다.';
      return;
    }

    let removeCart = { ...cart };
    let updateCart = {
      id: removeCart.id,
      user_id,
      deleted: true,
    };

    await cartRepo.update({ id: cart.id }, { ...updateCart });

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeCart;
