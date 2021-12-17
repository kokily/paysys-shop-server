import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import { maskingName, validateBody } from '../../libs/utils';
import Wedding from '../../entities/wedding/Wedding';
import Convention from '../../entities/wedding/Convention';
import Company from '../../entities/wedding/Company';
import Event from '../../entities/wedding/Event';
import Hanbok from '../../entities/wedding/Hanbok';
import Meal from '../../entities/wedding/Meal';
import Present from '../../entities/wedding/Present';
import Reserve from '../../entities/wedding/Reserve';
import Prepayment from '../../entities/wedding/Prepayment';

const addExpense = async (ctx: Context) => {
  type RequestType = {
    husband_name: string;
    bride_name: string;
    wedding_at: string;
    event_at: string;
    company_husband: number;
    company_bride: number;
    rooftop_husband: number;
    rooftop_bride: number;
    owner_woman_husband: number;
    owner_woman_bride: number;
    owner_man_husband: number;
    owner_man_bride: number;
    select_husband: number;
    select_bride: number;
    frame_husband: number;
    frame_bride: number;
    dress_husband: number;
    dress_bride: number;
    hairpin_husband: number;
    hairpin_bride: number;
    wig_husband: number;
    wig_bride: number;
    video_husband: number;
    video_bride: number;
    etc_husband: number;
    etc_bride: number;
    rental_husband: number;
    rental_bride: number;
    sword_husband: number;
    sword_bride: number;
    glove_husband: number;
    glove_bride: number;
    bouquet_husband: number;
    bouquet_bride: number;
    ceremony_husband: number;
    ceremony_bride: number;
    play_husband: number;
    play_bride: number;
    anthem_husband: number;
    anthem_bride: number;
    moderator_husband: number;
    moderator_bride: number;
    officiate_husband: number;
    officiate_bride: number;
    hanbok_pre_husband: number;
    hanbok_pre_bride: number;
    hanbok_post_husband: number;
    hanbok_post_bride: number;
    meals: string;
    meals_price: number;
    meals_num_husband: number;
    meals_num_bride: number;
    present: string;
    present_price: number;
    present_num_husband: number;
    present_num_bride: number;
    reserve: string;
    reserve_pay: number;
    cost_husband: number;
    cost_bride: number;
    meal_husband: number;
    meal_bride: number;
    present_husband: number;
    present_bride: number;
    reserve_husband: number;
    reserve_bride: number;
    prepayment_husband: number;
    prepayment_bride: number;
  };

  const schema = Joi.object().keys({
    husband_name: Joi.string().required(),
    bride_name: Joi.string().required(),
    wedding_at: Joi.string().required(),
    event_at: Joi.string().required(),
    company_husband: Joi.number().required(),
    company_bride: Joi.number().required(),
    rooftop_husband: Joi.number().required(),
    rooftop_bride: Joi.number().required(),
    owner_woman_husband: Joi.number().required(),
    owner_woman_bride: Joi.number().required(),
    owner_man_husband: Joi.number().required(),
    owner_man_bride: Joi.number().required(),
    select_husband: Joi.number().required(),
    select_bride: Joi.number().required(),
    frame_husband: Joi.number().required(),
    frame_bride: Joi.number().required(),
    dress_husband: Joi.number().required(),
    dress_bride: Joi.number().required(),
    hairpin_husband: Joi.number().required(),
    hairpin_bride: Joi.number().required(),
    wig_husband: Joi.number().required(),
    wig_bride: Joi.number().required(),
    video_husband: Joi.number().required(),
    video_bride: Joi.number().required(),
    etc_husband: Joi.number().required(),
    etc_bride: Joi.number().required(),
    rental_husband: Joi.number().required(),
    rental_bride: Joi.number().required(),
    sword_husband: Joi.number().required(),
    sword_bride: Joi.number().required(),
    glove_husband: Joi.number().required(),
    glove_bride: Joi.number().required(),
    bouquet_husband: Joi.number().required(),
    bouquet_bride: Joi.number().required(),
    ceremony_husband: Joi.number().required(),
    ceremony_bride: Joi.number().required(),
    play_husband: Joi.number().required(),
    play_bride: Joi.number().required(),
    anthem_husband: Joi.number().required(),
    anthem_bride: Joi.number().required(),
    moderator_husband: Joi.number().required(),
    moderator_bride: Joi.number().required(),
    officiate_husband: Joi.number().required(),
    officiate_bride: Joi.number().required(),
    hanbok_pre_husband: Joi.number().required(),
    hanbok_pre_bride: Joi.number().required(),
    hanbok_post_husband: Joi.number().required(),
    hanbok_post_bride: Joi.number().required(),
    meals: Joi.string().required(),
    meals_price: Joi.number().required(),
    meals_num_husband: Joi.number().required(),
    meals_num_bride: Joi.number().required(),
    present: Joi.string().required(),
    present_price: Joi.number().required(),
    present_num_husband: Joi.number().required(),
    present_num_bride: Joi.number().required(),
    reserve: Joi.string().required(),
    reserve_pay: Joi.number().required(),
    cost_husband: Joi.number().required(),
    cost_bride: Joi.number().required(),
    meal_husband: Joi.number().required(),
    meal_bride: Joi.number().required(),
    present_husband: Joi.number().required(),
    present_bride: Joi.number().required(),
    reserve_husband: Joi.number().required(),
    reserve_bride: Joi.number().required(),
    prepayment_husband: Joi.number().required(),
    prepayment_bride: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const {
    husband_name,
    bride_name,
    wedding_at,
    event_at,
    company_husband,
    company_bride,
    rooftop_husband,
    rooftop_bride,
    owner_woman_husband,
    owner_woman_bride,
    owner_man_husband,
    owner_man_bride,
    select_husband,
    select_bride,
    frame_husband,
    frame_bride,
    dress_husband,
    dress_bride,
    hairpin_husband,
    hairpin_bride,
    wig_husband,
    wig_bride,
    video_husband,
    video_bride,
    etc_husband,
    etc_bride,
    rental_husband,
    rental_bride,
    sword_husband,
    sword_bride,
    glove_husband,
    glove_bride,
    bouquet_husband,
    bouquet_bride,
    ceremony_husband,
    ceremony_bride,
    play_husband,
    play_bride,
    anthem_husband,
    anthem_bride,
    moderator_husband,
    moderator_bride,
    officiate_husband,
    officiate_bride,
    hanbok_pre_husband,
    hanbok_pre_bride,
    hanbok_post_husband,
    hanbok_post_bride,
    meals,
    meals_price,
    meals_num_husband,
    meals_num_bride,
    present,
    present_price,
    present_num_husband,
    present_num_bride,
    reserve,
    reserve_pay,
    cost_husband,
    cost_bride,
    meal_husband,
    meal_bride,
    present_husband,
    present_bride,
    reserve_husband,
    reserve_bride,
    prepayment_husband,
    prepayment_bride,
  }: RequestType = ctx.request.body;

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

    // 웨딩 기본
    const wedding = new Wedding();

    wedding.husband_name = maskingName(husband_name);
    wedding.bride_name = maskingName(bride_name);
    wedding.wedding_at = wedding_at;
    wedding.event_at = event_at;
    wedding.cost_husband = cost_husband;
    wedding.cost_bride = cost_bride;
    wedding.meal_husband = meal_husband;
    wedding.meal_bride = meal_bride;
    wedding.present_husband = present_husband;
    wedding.present_bride = present_bride;
    wedding.reserve_husband = reserve_husband;
    wedding.reserve_bride = reserve_bride;

    await weddingRepo.save(wedding);

    // 컨벤션 내역
    const convention = new Convention();

    convention.rental_husband = rental_husband;
    convention.rental_bride = rental_bride;
    convention.sword_husband = sword_husband;
    convention.sword_bride = sword_bride;
    convention.glove_husband = glove_husband;
    convention.glove_bride = glove_bride;
    convention.bouquet_husband = bouquet_husband;
    convention.bouquet_bride = bouquet_bride;
    convention.ceremony_husband = ceremony_husband;
    convention.ceremony_bride = ceremony_bride;
    convention.weddingId = wedding.id;

    await conventionRepo.save(convention);

    // 웨딩업체 내역
    const company = new Company();

    company.company_husband = company_husband;
    company.company_bride = company_bride;
    company.rooftop_husband = rooftop_husband;
    company.rooftop_bride = rooftop_bride;
    company.owner_woman_husband = owner_woman_husband;
    company.owner_woman_bride = owner_woman_bride;
    company.owner_man_husband = owner_man_husband;
    company.owner_man_bride = owner_man_bride;
    company.select_husband = select_husband;
    company.select_bride = select_bride;
    company.frame_husband = frame_husband;
    company.frame_bride = frame_bride;
    company.dress_husband = dress_husband;
    company.dress_bride = dress_bride;
    company.hairpin_husband = hairpin_husband;
    company.hairpin_bride = hairpin_bride;
    company.wig_husband = wig_husband;
    company.wig_bride = wig_bride;
    company.video_husband = video_husband;
    company.video_bride = video_bride;
    company.etc_husband = etc_husband;
    company.etc_bride = etc_bride;
    company.weddingId = wedding.id;

    await companyRepo.save(company);

    // 이벤트 비용
    const event = new Event();

    event.play_husband = play_husband;
    event.play_bride = play_bride;
    event.anthem_husband = anthem_husband;
    event.anthem_bride = anthem_bride;
    event.moderator_husband = moderator_husband;
    event.moderator_bride = moderator_bride;
    event.officiate_husband = officiate_husband;
    event.officiate_bride = officiate_bride;
    event.weddingId = wedding.id;

    await eventRepo.save(event);

    // 한복 비용
    const hanbok = new Hanbok();

    hanbok.hanbok_pre_husband = hanbok_pre_husband;
    hanbok.hanbok_pre_bride = hanbok_pre_bride;
    hanbok.hanbok_post_husband = hanbok_post_husband;
    hanbok.hanbok_post_bride = hanbok_post_bride;
    hanbok.weddingId = wedding.id;

    await hanbokRepo.save(hanbok);

    // 식사 비용
    const meal = new Meal();

    meal.meals = meals;
    meal.meals_price = meals_price;
    meal.meals_num_husband = meals_num_husband;
    meal.meals_num_bride = meals_num_bride;
    meal.weddingId = wedding.id;

    await mealRepo.save(meal);

    // 답례품 비용
    const presents = new Present();

    presents.present = present;
    presents.present_price = present_price;
    presents.present_num_husband = present_num_husband;
    presents.present_num_bride = present_num_bride;
    presents.weddingId = wedding.id;

    await presentRepo.save(presents);

    // 예약금
    const reserves = new Reserve();

    reserves.reserve = reserve;
    reserves.reserve_pay = reserve_pay;
    reserves.weddingId = wedding.id;

    await reserveRepo.save(reserves);

    // 선입금 내역
    const prepayment = new Prepayment();

    prepayment.prepayment_husband = prepayment_husband;
    prepayment.prepayment_bride = prepayment_bride;
    prepayment.weddingId = wedding.id;

    await prepaymentRepo.save(prepayment);

    ctx.body = wedding;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default addExpense;
