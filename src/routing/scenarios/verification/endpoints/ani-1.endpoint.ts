import { Endpoint } from '../../../../types/routing';
import { aniHandler } from '../handlers/ani.handler';

export const ani1Endpoint: Endpoint = {
  match: (req) => {
    return req.fulfillmentInfo.tag === 'verification:ani-1';
  },
  fn: async (req) => {
    const ani1 = 'ani:123';
    return aniHandler(req, ani1);
  },
};
