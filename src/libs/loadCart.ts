import { getManager } from 'typeorm';
import Cart from '../entities/Cart';

const loadCart = async (user_id: string) => {
  const cart = await getManager()
    .createQueryBuilder(Cart, 'cart')
    .where('cart.user_id = :user_id', { user_id })
    .andWhere('cart.completed = false')
    .andWhere('cart.deleted = false')
    .getOne();

  return cart;
};

export default loadCart;
