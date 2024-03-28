import { DFCustomPayload, DFMessage, DFMessageWithPayload, DFReq } from '../types/cx';

const isMessageWithPayload = (message: DFMessage): message is DFMessageWithPayload => {
  return message['payload'];
};

export const getCustomPayload = (req: DFReq): Partial<DFCustomPayload> => {
  return req.messages.reduce<Partial<DFCustomPayload>>((result, message) => {
    if (isMessageWithPayload(message)) {
      return { ...result, ...message.payload };
    }

    return result;
  }, {});
};
