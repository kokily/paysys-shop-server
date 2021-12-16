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

const readWedding = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const weddingRepo = await getRepository(Wedding);
    const conventionRepo = await getRepository(Convention);
    const companyRepo = await getRepository(Company);
    const eventRepo = await getRepository(Event);
    const hanbokRepo = await getRepository(Hanbok);
    const mealRepo = await getRepository(Meal);
    const presentRepo = await getRepository(Present);
    const reserveRepo = await getRepository(Reserve);
    const prepaymentRepo = await getRepository(Prepayment);

    const wedding = await weddingRepo.findOne(id);
    const convention = await conventionRepo.findOne({ weddingId: id });
    const company = await companyRepo.findOne({ weddingId: id });
    const event = await eventRepo.findOne({ weddingId: id });
    const hanbok = await hanbokRepo.findOne({ weddingId: id });
    const meal = await mealRepo.findOne({ weddingId: id });
    const present = await presentRepo.findOne({ weddingId: id });
    const reserve = await reserveRepo.findOne({ weddingId: id });
    const prepayment = await prepaymentRepo.findOne({ weddingId: id });

    if (
      !wedding ||
      !convention ||
      !company ||
      !event ||
      !hanbok ||
      !meal ||
      !present ||
      !reserve
    ) {
      ctx.status = 404;
      ctx.body = '존재하지 않는 빌지입니다.';
      return;
    }

    ctx.body = {
      wedding,
      convention,
      company,
      event,
      hanbok,
      meal,
      present,
      reserve,
      prepayment,
    };
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default readWedding;
