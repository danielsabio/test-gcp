import { ensureSession } from '../features/session';
import { DFReq, DFRes } from '../types/cx';
import { getCustomPayload } from '../util/cx';
import { endpoints } from './endpoints';
import { flows } from './flows';

export const responseBuilder = async (req: DFReq): Promise<DFRes> => {
  const sessionId = req.sessionInfo.session;
  const session = await ensureSession(sessionId, { verified: false });

  const payload = getCustomPayload(req);

  if (!session.verified && payload.verify) {
    return {
      targetFlow: flows.verification,
      fulfillmentResponse: {
        messages: payload.before_verification_text
          ? [{ text: { text: [payload.before_verification_text], allowPlaybackInterruption: false } }]
          : [],
        mergeBehavior: 'REPLACE',
      },
    };
  }

  const endpoint = endpoints.find((endpoint) => endpoint.match(req));

  return endpoint ? await endpoint.fn(req) : {};
};
