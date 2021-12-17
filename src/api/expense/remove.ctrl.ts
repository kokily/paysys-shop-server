import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Company from '../../entities/wedding/Company';
import Convention from '../../entities/wedding/Convention';
import Event from '../../entities/wedding/Event';
import Hanbok from '../../entities/wedding/Hanbok';
import Meal from '../../entities/wedding/Meal';
import Prepayment from '../../entities/wedding/Prepayment';
import Present from '../../entities/wedding/Present';
import Reserve from '../../entities/wedding/Reserve';
import Wedding from '../../entities/wedding/Wedding';

const removeExpense = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    await getRepository(Wedding).delete(id);
    await getRepository(Convention).delete({ weddingId: id });
    await getRepository(Company).delete({ weddingId: id });
    await getRepository(Event).delete({ weddingId: id });
    await getRepository(Hanbok).delete({ weddingId: id });
    await getRepository(Meal).delete({ weddingId: id });
    await getRepository(Present).delete({ weddingId: id });
    await getRepository(Reserve).delete({ weddingId: id });
    await getRepository(Prepayment).delete({ weddingId: id });

    ctx.status = 204;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeExpense;
