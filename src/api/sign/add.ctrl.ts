import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import Wedding from '../../entities/wedding/Wedding';
import { validateBody } from '../../libs/utils';

const addSign = async (ctx: Context) => {
  type RequestType = {
    weddingId: string;
    sex: string;
    image: string;
  };

  const schema = Joi.object().keys({
    weddingId: Joi.string().required(),
    sex: Joi.string().required(),
    image: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { weddingId, sex, image }: RequestType = ctx.request.body;

  try {
    const weddingRepo = await getRepository(Wedding);

    if (sex === 'husband') {
      await weddingRepo.update({ id: weddingId }, { husband_image: image });
    } else {
      await weddingRepo.update({ id: weddingId }, { bride_image: image });
    }

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default addSign;
