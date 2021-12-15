import type { Context } from 'koa';
import type { ObjectSchema } from 'joi';
import Bill from '../entities/Bill';

export function validateBody(ctx: Context, schema: ObjectSchema<any>): boolean {
  const { error } = schema.validate(ctx.request.body);

  if (error?.details) {
    ctx.status = 400;
    ctx.body = error.details[0].message;
    return false;
  }

  return true;
}

export function serialize(data: any): object {
  delete data.password;
  return data;
}

export function maskingName(name: string): string {
  if (name.length > 2) {
    let originalName = name.split('');

    originalName.map((_, i) => {
      if (i === 0 || i === originalName.length - 1) return;

      originalName[i] = '*';
    });

    let combineName = originalName.join();

    return combineName.replace(/,/g, '');
  } else {
    return name.replace(/.$/, '*');
  }
}

type SortedDataType = {
  name: string;
  count: number;
};

type ResultType = [string, number];

function getSortedCount(array: string[]): ResultType[] {
  const counts = array.reduce((pv: any, cv: any) => {
    pv[cv] = (pv[cv] || 0) + 1;

    return pv;
  }, []);

  const results: ResultType[] = [];

  for (let key in counts) {
    results.push([key, counts[key]]);
  }

  results.sort((fst, sec) => {
    return sec[1] - fst[1];
  });

  return results;
}

export function getSortedList(bills: Bill[]): SortedDataType[] {
  let prevList: string[] = [];
  let sortedData: SortedDataType[] = [];

  bills.map((bill) => {
    prevList.push(bill.title);
  });

  const list = getSortedCount(prevList);

  sortedData = list.map((item) => ({
    name: item[0],
    count: item[1],
  }));

  return sortedData;
}
