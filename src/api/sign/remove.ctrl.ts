import type { Context } from 'koa';
import { getRepository } from 'typeorm';
import Wedding from '../../entities/wedding/Wedding';

const removeSign = async (ctx: Context) => {
  const { id }: { id: string } = ctx.params;

  try {
    const weddingRepo = await getRepository(Wedding);

    await weddingRepo.update({ id }, { husband_image: '', bride_image: '' });

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
};

export default removeSign;
