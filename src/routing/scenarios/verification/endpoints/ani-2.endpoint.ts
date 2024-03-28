import { Endpoint } from '../../../../types/routing';
import { aniHandler } from '../handlers/ani.handler';

export const ani2Endpoint: Endpoint = {
  match: (req) => {
    return req.fulfillmentInfo.tag === 'verification:ani-2';
  },
  fn: async (req) => {
    const ani2 = 'ani:123';
    return aniHandler(req, ani2);
  },
};
