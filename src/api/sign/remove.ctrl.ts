import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import Wedding from '../../entities/wedding/Wedding';
import { validateBody } from '../../libs/utils';

const removeSign = async (ctx: Context) => {
  type RequestType = {
    id: string;
  };

  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { id }: RequestType = ctx.request.body;

  try {
    const weddingRepo = await getRepository(Wedding);

    await weddingRepo.update({ id }, { husband_image: '', bride_image: '' });

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeSign;
