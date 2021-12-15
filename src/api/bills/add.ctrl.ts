import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import aligo from 'aligoapi';
import Joi from 'joi';
import Bill from '../../entities/Bill';
import Cart from '../../entities/Cart';
import User from '../../entities/User';
import loadCart from '../../libs/loadCart';
import { validateBody } from '../../libs/utils';

const addBill = async (ctx: Context) => {
  type RequestType = {
    title: string;
    hall: string;
    etc: string;
  };

  const schema = Joi.object().keys({
    title: Joi.string().required(),
    hall: Joi.string().required(),
    etc: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { title, hall, etc }: RequestType = ctx.request.body;

  try {
    const { user_id, username } = ctx.state.user;

    if (!user_id || !username) {
      ctx.status = 401;
      ctx.body = '로그인 후 이용하세요';
      return;
    }

    const billRepo = await getRepository(Bill);
    const cartRepo = await getRepository(Cart);
    const cart = await loadCart(user_id);

    if (!cart) {
      ctx.status = 404;
      ctx.body = '카트가 존재하지 않습니다.';
      return;
    }

    let inputCart = { ...cart };
    let total = 0;

    inputCart.items.map((item) => {
      return (total += item.amount);
    });

    const bill = new Bill();

    bill.title = title;
    bill.hall = hall;
    bill.etc = etc;
    bill.username = username;
    bill.user_id = user_id;
    bill.cart_id = inputCart.id;
    bill.total_amount = total;
    bill.items = inputCart.items;

    let updateCart = { ...cart, completed: true };

    await billRepo.save(bill);
    await cartRepo.update({ id: cart.id }, { ...updateCart });

    // SMS Service
    const smsConfig = {
      key: process.env.ALIGO_KEY,
      user_id: process.env.ALIGO_USER,
    };
    const sender = process.env.ALIGO_SENDER;
    const receiver =
      process.env.NODE_ENV === 'production'
        ? `${process.env.ALIGO_RECEIVER1},${process.env.ALIGO_RECEIVER2},${process.env.ALIGO_RECEIVER3}`
        : `${process.env.ALIGO_RECEIVER1}`;

    ctx.request.body = {
      sender,
      receiver,
      msg: `[${username}]님 [${hall}]에서 [${title}] 전표전송 https://paysys.kr/fronts `,
    };

    aligo
      .send(ctx.request, smsConfig)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default addBill;
