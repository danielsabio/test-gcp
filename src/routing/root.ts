import { Logger } from '../infra/logger';
import { DFReq, DFRes } from '../types/cx';
import { responseBuilder } from './response-builder';

export const handleRequest = async (req: DFReq): Promise<DFRes> => {
  const response = await responseBuilder(req);

  Logger.debug('HEY RESPONSE : ', response);

  return response;
};
