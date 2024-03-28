import { Nullable } from './util';
import { VERIFICATION_STAGE } from './verification';

export interface DFParameters {
  foo: string;
  TEST: string;
  verification_stage: VERIFICATION_STAGE;
}

export type DFTag = 'welcome' | 'verification:ani-1' | 'verification:ani-2' | 'account-balance:info';

export interface DFCustomPayload {
  verify: boolean;
  before_verification_text: string;
  LOB: string;
}

export interface DFMessageWithPayload {
  payload: Partial<DFCustomPayload>;
}

export interface DFMessageWithText {
  text: { text: string[]; allowPlaybackInterruption: boolean };
}

export type DFMessage = DFMessageWithPayload | DFMessageWithText;

// https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/WebhookRequest
export interface DFReq {
  fulfillmentInfo: { tag: DFTag };
  sessionInfo: { session: string; parameters: Partial<DFParameters> };
  messages: DFMessage[];
  intentInfo: { displayName: string; parameters: Record<string, { originalValue: string }> };
  pageInfo: { currentPage: string; displayName: string };
  payload: Record<string, unknown>;
  query: string;
}

// https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/WebhookResponse
export interface DFRes {
  fulfillmentResponse?: {
    messages: DFMessage[];
    mergeBehavior?: 'APPEND' | 'REPLACE';
  };
  sessionInfo?: { parameters?: Partial<Nullable<DFParameters>> };
  targetFlow?: string;
  targetPage?: string;
}
