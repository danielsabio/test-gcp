import { DFReq, DFRes } from './cx';

export interface Endpoint {
  match: (req: DFReq) => boolean;
  fn: (req: DFReq) => Promise<DFRes>;
}
