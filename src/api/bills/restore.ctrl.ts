import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Bill from '../../entities/Bill';
import Cart from '../../entities/Cart';

const restoreBill = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const { user_id } = ctx.state.user;
    const billRepo = await getRepository(Bill);
    const cartRepo = await getRepository(Cart);
    const bill = await billRepo.findOne(id);

    if (!user_id) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용하세요';
      return;
    }

    if (!bill) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 빌지입니다.';
      return;
    }

    if (user_id === bill.user_id) {
      const cart = await cartRepo.findOne({ id: bill.cart_id });

      if (!cart) {
        ctx.status = 404;
        ctx.body = '존재하지 않는 카트입니다.';
        return;
      }

      let updateCart = { ...cart };

      updateCart.completed = false;

      await cartRepo.update({ id: cart.id }, { ...updateCart });
      await billRepo.delete(id);

      ctx.body = cart;
    } else {
      ctx.status = 403;
      ctx.body = '빌지 수정 권한이 없습니다.';
      return;
    }
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default restoreBill;
