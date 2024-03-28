import { Endpoint } from '../../../../types/routing';

export const welcomeEndpoint: Endpoint = {
  match: (req) => {
    return req.fulfillmentInfo.tag === 'welcome';
  },
  fn: async (req) => {
    return { sessionInfo: { parameters: { TEST: 'TEST' } } };
  },
};
