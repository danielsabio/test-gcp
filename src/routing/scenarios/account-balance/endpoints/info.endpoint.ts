import { Endpoint } from '../../../../types/routing';

export const infoEndpoint: Endpoint = {
  match: (req) => {
    return req.fulfillmentInfo.tag === 'account-balance:info';
  },
  fn: async (req) => {
    return {};
  },
};
