import type { Context } from 'koa';
import Joi from 'joi';
import { validateBody } from '../../libs/utils';
import { getManager, getRepository } from 'typeorm';
import Item from '../../entities/Item';
import Cart from '../../entities/Cart';
import loadCart from '../../libs/loadCart';

const addCart = async (ctx: Context) => {
  type RequestType = {
    item_id: string;
    count: number;
    price: number;
  };

  const schema = Joi.object().keys({
    item_id: Joi.string().required(),
    count: Joi.number().required(),
    price: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { item_id, count, price }: RequestType = ctx.request.body;

  try {
    const { user_id } = ctx.state.user;

    if (!user_id) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용해주세요';
      return;
    }

    const itemRepo = await getRepository(Item);
    const cartRepo = await getRepository(Cart);
    const prevCart = await loadCart(user_id);
    const item = await itemRepo.findOne({ id: item_id });

    if (!item) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 품목입니다.';
      return;
    }

    const addItem = {
      ...item,
      count,
      price,
      amount: count * price,
    };

    if (!prevCart) {
      // 기존 카트가 존재하지 않을 때
      const cart = new Cart();

      cart.items = [addItem];
      cart.user_id = user_id;
      cart.completed = false;
      cart.deleted = false;

      await cartRepo.save(cart);

      ctx.body = cart;
    } else {
      // 기존 카트가 있을 경우 기존 카트에 품목 추가
      await cartRepo.update(
        { id: prevCart.id },
        { ...prevCart, items: [...prevCart.items, addItem] }
      );

      const cart = await cartRepo.findOne({ id: prevCart.id });

      if (!cart) {
        ctx.status = 404;
        ctx.body = '카트가 존재하지 않습니다.';
        return;
      }

      ctx.body = cart;
    }
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default addCart;
