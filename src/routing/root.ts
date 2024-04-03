import { Logger } from '../infra/logger';
import { DFReq, DFRes } from '../types/cx';
import { responseBuilder } from './response-builder';

export const handleRequest = async (req: DFReq): Promise<DFRes> => {
  try {
    Logger.debug('FF CX request: ', req);

    const res = await responseBuilder(req);

    Logger.debug('FF CX response: ', res);

    return res;
  } catch (error) {
    Logger.error('Failed to build the response: ', error);
    return {};
  }
};
