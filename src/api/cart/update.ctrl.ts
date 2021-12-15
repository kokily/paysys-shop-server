import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Cart from '../../entities/Cart';
import loadCart from '../../libs/loadCart';

const removeOneCart = async (ctx: Context) => {
  // Params id => item.id
  const { id }: { id: string } = ctx.params;

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

    if (cart.items.length === 1) {
      // 카트 내 품목 수가 하나일 경우 카트 삭제
      let removeCart = { ...cart };
      let updateCart = {
        id: removeCart.id,
        user_id,
        deleted: true,
      };

      await cartRepo.update({ id: cart.id }, { ...updateCart });

      ctx.body = cart;
    } else {
      // 카트 내 품목 수가 두 가지 이상일 경우 품목만 삭제
      let updateCart = { ...cart };

      const idx = updateCart.items.findIndex((item) => {
        return item.id === id;
      });

      if (idx > -1) {
        updateCart.items.splice(idx, 1);
      }

      await cartRepo.update({ id: cart.id }, { ...updateCart });

      ctx.body = cart;
    }
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeOneCart;
