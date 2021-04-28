import mockjs from 'mockjs';
import { randomSleep } from '../src/utils/sleep';

// req, res参考express@4
export default {
  'GET /api/user/list': async (req: any, res: any) => {
    await randomSleep(1, 6);
    const len = Math.min(req.query.page_size, 501);
    const key = `items|${len}`;
    const mockData = mockjs.mock({
      [key]: [
        {
          name: '@name',
          id: '@integer(1, 10000000000)',
          groupId: req.query.groupId || '@integer(1, 10000000000)',
        },
      ],
    });
    res.send({
      result: true,
      msg: '',
      data: { items: mockData.items, total: 501, page: req.query.page },
    });
    // res.end('ok')
  },

  'GET /api/user/groups': async (req: any, res: any) => {
    await randomSleep(1, 3);
    const mockData = mockjs.mock({
      'groups|100': [{ name: '@last', id: '@integer(1, 10000000000)' }],
    });
    res.send({
      result: true,
      msg: '',
      data: mockData.groups,
    });
  },
};
