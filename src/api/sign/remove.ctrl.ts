import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Joi from 'joi';
import Wedding from '../../entities/wedding/Wedding';
import { validateBody } from '../../libs/utils';

const removeSign = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  type RequestType = {
    sex: string;
  };

  const schema = Joi.object().keys({
    sex: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { sex }: RequestType = ctx.request.body;

  try {
    const weddingRepo = await getRepository(Wedding);

    if (sex === 'husband') {
      await weddingRepo.update({ id }, { husband_image: '' });
    } else {
      await weddingRepo.update({ id }, { bride_image: '' });
    }

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeSign;
